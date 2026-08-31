"""Verify this portfolio build on fixed loopback port 3180, without redirects.

Usage: python verify_http.py --output path/to/http-evidence.json
Only Python's standard library is required. No external URLs are requested.
"""

from __future__ import annotations

import argparse
import hashlib
import http.client
import json
import re
import sys
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[3]
HOST, PORT = "127.0.0.1", 3180
BASE_URL = f"http://{HOST}:{PORT}"
VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "param", "source", "track", "wbr",
}
EXPECTED_NAV = {"/#projects", "/projects", "/about", "/contact"}


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def local_path(value: str) -> str | None:
    """Accept origin-relative paths only; never follow external references."""
    if not value.startswith("/") or value.startswith("//"):
        return None
    if any(char in value for char in ("\\", "\r", "\n", "\x00")):
        return None
    parts = urlsplit(value)
    if parts.scheme or parts.netloc:
        return None
    return parts.path + (f"?{parts.query}" if parts.query else "")


class PageParser(HTMLParser):
    """Inspect literal HTML, excluding scripts, styles and hidden streams.

    In particular, Next's serialized React scripts must not count as visible
    404 recovery content. A hidden streamed subtree also does not prove a
    usable no-JavaScript page.
    """

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[tuple[str, bool]] = []
        self.links: list[dict] = []
        self.active_link: dict | None = None
        self.h1: list[str] = []
        self.active_h1: list[str] | None = None
        self.main_count = 0
        self.resources: set[str] = set()
        self.body_text: list[str] = []

    def ignored(self) -> bool:
        return any(hidden or tag in {"script", "style", "template", "head"}
                   for tag, hidden in self.stack)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        hidden = "hidden" in values
        if tag not in VOID_TAGS:
            self.stack.append((tag, hidden))
        if tag in {"script", "img", "source"} and values.get("src"):
            path = local_path(values["src"] or "")
            if path:
                self.resources.add(path)
        if tag == "link" and values.get("href"):
            rel = set((values.get("rel") or "").split())
            if rel & {"stylesheet", "preload", "modulepreload", "icon"}:
                path = local_path(values["href"] or "")
                if path:
                    self.resources.add(path)
        if self.ignored() or hidden:
            return
        if tag == "main":
            self.main_count += 1
        if tag == "h1":
            self.active_h1 = []
        if tag == "a":
            tags = {item[0] for item in self.stack}
            self.active_link = {
                "href": values.get("href") or "",
                "text": [],
                "noscriptNav": "noscript" in tags and "nav" in tags,
            }

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag: str) -> None:
        if tag == "a" and self.active_link is not None:
            self.active_link["text"] = " ".join(" ".join(self.active_link["text"]).split())
            self.links.append(self.active_link)
            self.active_link = None
        if tag == "h1" and self.active_h1 is not None:
            self.h1.append(" ".join(" ".join(self.active_h1).split()))
            self.active_h1 = None
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data: str) -> None:
        if self.ignored():
            return
        self.body_text.append(data)
        if self.active_h1 is not None:
            self.active_h1.append(data)
        if self.active_link is not None:
            self.active_link["text"].append(data)


def request(path: str) -> tuple[dict, bytes]:
    if local_path(path) != path:
        raise ValueError(f"Refusing a non-local request path: {path!r}")
    connection = http.client.HTTPConnection(HOST, PORT, timeout=15)
    try:
        connection.request("GET", path, headers={
            "Accept-Encoding": "identity", "Connection": "close",
            "User-Agent": "portfolio-local-qa/1",
        })
        response = connection.getresponse()
        data = response.read()
        return {
            "path": path,
            "status": response.status,
            "contentType": response.getheader("Content-Type", ""),
            "bytes": len(data),
            "sha256": sha256(data),
            "location": response.getheader("Location"),
        }, data
    except (OSError, http.client.HTTPException) as error:
        return {"path": path, "status": None, "error": type(error).__name__}, b""
    finally:
        connection.close()


def inspect_html(data: bytes) -> PageParser:
    parser = PageParser()
    parser.feed(data.decode("utf-8", errors="replace"))
    parser.close()
    return parser


def finish(row: dict, checks: dict[str, bool]) -> dict:
    row["checks"] = checks
    row["pass"] = all(checks.values())
    if row.get("location") is None:
        row.pop("location", None)
    return row


def disk_asset(path: str) -> Path | None:
    decoded = unquote(urlsplit(path).path)
    if "\\" in decoded or ".." in decoded.split("/"):
        return None
    if decoded.startswith("/_next/static/"):
        candidate = ROOT / ".next" / decoded.removeprefix("/_next/")
        boundary = ROOT / ".next" / "static"
    else:
        candidate = ROOT / "public" / decoded.lstrip("/")
        boundary = ROOT / "public"
    if not candidate.resolve().is_relative_to(boundary.resolve()):
        return None
    if candidate.is_file():
        return candidate
    if decoded == "/favicon.ico":
        candidate = ROOT / ".next" / "server" / "app" / "favicon.ico.body"
        return candidate if candidate.is_file() else None
    return None


def fixture_paths() -> tuple[list[str], set[str], dict[str, str], set[str]]:
    prior = json.loads((ROOT / "docs/qa/m1-2026-08-31/route-http-evidence.json").read_text(encoding="utf-8-sig"))["runs"][-1]
    projects = sorted({row["path"] for row in prior["routes"] if re.fullmatch(r"/projects/[a-z0-9-]+", row["path"])})
    if len(projects) != 15:
        raise ValueError(f"Expected exactly 15 known project routes, got {len(projects)}")
    routes = ["/", "/about", "/contact", "/projects", *projects]
    assets = {row["path"] for row in prior["assets"]}
    redirects = {row["path"]: row["location"] for row in prior["redirects"]}
    prerender = json.loads((ROOT / ".next/prerender-manifest.json").read_text(encoding="utf-8-sig"))
    return routes, assets, redirects, set(prerender["routes"])


def main() -> int:
    arguments = argparse.ArgumentParser(description=__doc__)
    arguments.add_argument("--output", required=True, type=Path)
    args = arguments.parse_args()
    started = now()
    build_id = (ROOT / ".next/BUILD_ID").read_text(encoding="utf-8").strip()
    routes, assets, redirects, prerendered = fixture_paths()
    groups: dict[str, list[dict]] = {name: [] for name in ("routes", "assets", "chunks", "notFound", "redirects", "metadata")}
    resources: set[str] = set()
    for path in routes:
        row, data = request(path)
        page = inspect_html(data)
        checks = {
            "status200": row["status"] == 200,
            "htmlContent": "text/html" in row.get("contentType", ""),
            "oneVisibleMain": page.main_count == 1,
            "oneVisibleH1": len(page.h1) == 1,
            "listedInCurrentPrerenderManifest": path in prerendered,
        }
        row["h1"] = page.h1
        if path in {"/", "/about", "/contact"}:
            noscript_links = {link["href"] for link in page.links if link["noscriptNav"]}
            checks["nativeNoscriptNavigation"] = EXPECTED_NAV <= noscript_links
            row["noscriptNavigation"] = sorted(noscript_links)
        groups["routes"].append(finish(row, checks))
        resources.update(page.resources)

    assets.update(path for path in resources if not path.startswith("/_next/") and disk_asset(path))
    # Use this build's chunks, never filenames from the previous build's report.
    chunks = {"/_next/" + path.relative_to(ROOT / ".next").as_posix()
              for path in (ROOT / ".next/static").rglob("*")
              if path.is_file() and path.suffix in {".js", ".css"}}
    chunks.update(path for path in resources if path.startswith("/_next/static/"))
    for group, paths in (("assets", assets), ("chunks", chunks)):
        for path in sorted(paths):
            row, data = request(path)
            local_file = disk_asset(path)
            local_bytes = local_file.read_bytes() if local_file else None
            checks = {
                "status200": row["status"] == 200,
                "nonempty": bool(data),
                "localFileExists": local_file is not None,
                "sameLocalBytes": local_bytes is not None and data == local_bytes,
            }
            if path == "/Desheng_Kong_CV.pdf":
                checks["pdfContent"] = data.startswith(b"%PDF-") and "application/pdf" in row.get("contentType", "")
            if local_file:
                row["localPath"] = local_file.relative_to(ROOT).as_posix()
            groups[group].append(finish(row, checks))

    for path in ("/__m1-route-check-not-found", "/projects/__m1-route-check-not-found", "/portfolio/__m1-missing-asset.png"):
        row, data = request(path)
        checks = {"status404": row["status"] == 404}
        if not path.endswith(".png"):
            page = inspect_html(data)
            checks.update({
                "literalVisible404Heading": any(text.replace("’", "'") == "This page isn't here." for text in page.h1),
                "literalExploreProjectsLink": any(link["href"] == "/projects" and link["text"] == "Explore projects" for link in page.links),
                "oneVisibleMain": page.main_count == 1,
            })
            row["h1"] = page.h1
            row["htmlInspection"] = "Literal HTMLParser output; script/style/template/head/hidden subtrees excluded; no JavaScript executed."
        groups["notFound"].append(finish(row, checks))

    for path, expected in sorted(redirects.items()):
        row, _ = request(path)
        groups["redirects"].append(finish(row, {
            "redirectStatus": row["status"] in {301, 302, 307, 308},
            "expectedLocalLocation": row.get("location") == expected,
        }))
    for path in ("/robots.txt", "/sitemap.xml"):
        row, data = request(path)
        groups["metadata"].append(finish(row, {"status200": row["status"] == 200, "nonempty": bool(data)}))

    unchanged_build = build_id == (ROOT / ".next/BUILD_ID").read_text(encoding="utf-8").strip()
    failures = [{"group": group, "path": row["path"], "checks": [key for key, passed in row["checks"].items() if not passed]}
                for group, rows in groups.items() for row in rows if not row["pass"]]
    report = {
        "schemaVersion": 1, "project": "deshengkong-site", "baseUrl": BASE_URL,
        "startedAt": started, "completedAt": now(), "buildId": build_id,
        "scope": "Fixed loopback-only GET requests; no redirects followed, external URLs, credentials, or message sending.",
        "routeFixture": "docs/qa/m1-2026-08-31/route-http-evidence.json:last run + current prerender-manifest.json",
        "checks": {"unchangedBuildDuringRun": unchanged_build, "fifteenProjectRoutes": len(routes) - 4 == 15},
        "counts": {group: len(rows) for group, rows in groups.items()},
        "passed": unchanged_build and not failures,
        "failures": failures, **groups,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"passed": report["passed"], "buildId": build_id, "counts": report["counts"], "failures": failures}, ensure_ascii=False))
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    sys.exit(main())
