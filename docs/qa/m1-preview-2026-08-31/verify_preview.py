"""Compare an explicitly selected preview with the fixed Ubuntu build artifact.

Python standard library only. Run from Windows, for example:
  python verify_preview.py --base-url http://127.0.0.1:3180 --output local-http.json
  python verify_preview.py --base-url https://deshengkong-site-EXPLICIT.vercel.app --output remote-http.json

Only the exact loopback origin or a deshengkong-site-*.vercel.app HTTPS origin
is accepted. Requests are unauthenticated GETs and never follow redirects.
HTTP 401/403 stops the run; this script does not bypass preview protection.
"""

from __future__ import annotations

import argparse
import hashlib
import http.client
import json
import re
import sys
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


REPO = Path("E:/gitclone/deshengkong-site-m1")
BUILD = REPO / ".vercel/linux-build"
OUTPUT_STATIC = BUILD / ".vercel/output/static"
QA = REPO / "docs/qa/m1-preview-2026-08-31"
FIXTURE = REPO / "docs/qa/m1-completion-2026-08-31/http-evidence.json"
PRODUCTION_ORIGIN = "https://www.deshengkong.com"
EXPECTED_NAV = {"/#projects", "/projects", "/about", "/contact"}
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input",
             "link", "meta", "param", "source", "track", "wbr"}
SOURCE_ROOT_FILES = {
    "package.json", "package-lock.json", "next.config.ts", "next.config.js",
    "next.config.mjs", "tsconfig.json", "postcss.config.mjs", "postcss.config.js",
    "eslint.config.mjs", "eslint.config.js", "tailwind.config.ts",
    "tailwind.config.js", "vercel.json",
}


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def base_origin(value: str) -> str:
    """Validate before any network request; never accept credentials or paths."""
    parts = urlsplit(value)
    if parts.username or parts.password or parts.query or parts.fragment:
        raise argparse.ArgumentTypeError("Base URL must be an origin without credentials, query or fragment")
    if parts.path not in {"", "/"}:
        raise argparse.ArgumentTypeError("Base URL cannot contain a page path")
    if value.rstrip("/") == "http://127.0.0.1:3180":
        return "http://127.0.0.1:3180"
    if (parts.scheme == "https" and parts.port in {None, 443}
            and re.fullmatch(r"deshengkong-site-[a-z0-9-]+\.vercel\.app", parts.hostname or "")
            and parts.netloc == (parts.hostname or "") + (":443" if parts.port else "")):
        return "https://" + parts.hostname
    raise argparse.ArgumentTypeError("Only http://127.0.0.1:3180 or an explicit https://deshengkong-site-*.vercel.app origin is allowed")


def output_file(value: str) -> Path:
    candidate = Path(value)
    if not candidate.is_absolute():
        candidate = QA / candidate
    if candidate.resolve().parent != QA.resolve() or candidate.suffix.lower() != ".json":
        raise argparse.ArgumentTypeError("Output must be a JSON file directly inside this QA directory")
    return candidate


def local_path(value: str) -> str | None:
    if not value.startswith("/") or value.startswith("//"):
        return None
    if any(char in value for char in ("\\", "\r", "\n", "\x00")):
        return None
    parts = urlsplit(value)
    decoded = unquote(parts.path)
    if parts.scheme or parts.netloc or "\\" in decoded or ".." in decoded.split("/"):
        return None
    if any(char in decoded for char in ("\r", "\n", "\x00")):
        return None
    return parts.path + ("?" + parts.query if parts.query else "")


def safe_location(value: str | None) -> str | None:
    """Do not retain potential authentication query strings in evidence."""
    if value is None:
        return None
    parts = urlsplit(value)
    origin = f"{parts.scheme}://{parts.hostname or ''}" if parts.netloc else ""
    return origin + parts.path + ("?<REDACTED>" if parts.query else "")


class PageParser(HTMLParser):
    """Parse literal HTML; React scripts/hidden streams cannot satisfy 404 QA."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.stack: list[tuple[str, bool]] = []
        self.main_count = 0
        self.h1: list[str] = []
        self.active_h1: list[str] | None = None
        self.links: list[dict] = []
        self.active_link: dict | None = None
        self.resources: set[str] = set()
        self.title_parts: list[str] = []
        self.meta: dict[str, str] = {}
        self.canonical: list[str] = []

    def ignored(self) -> bool:
        return any(hidden or tag in {"script", "style", "template", "head"}
                   for tag, hidden in self.stack)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        hidden = "hidden" in values or (tag == "dialog" and "open" not in values)
        if tag not in VOID_TAGS:
            self.stack.append((tag, hidden))
        if tag == "meta":
            key = values.get("property") or values.get("name")
            if key:
                self.meta[key.lower()] = values.get("content") or ""
        if tag in {"script", "img", "source"} and values.get("src"):
            path = local_path(values["src"] or "")
            if path:
                self.resources.add(path)
        if tag == "link" and values.get("href"):
            rel = set((values.get("rel") or "").lower().split())
            if "canonical" in rel:
                self.canonical.append(values["href"] or "")
            if rel & {"stylesheet", "preload", "modulepreload", "icon"}:
                path = local_path(values["href"] or "")
                if path:
                    self.resources.add(path)
        if self.ignored():
            return
        if tag == "main":
            self.main_count += 1
        if tag == "h1":
            self.active_h1 = []
        if tag == "a":
            tags = {item[0] for item in self.stack}
            self.active_link = {"href": values.get("href") or "", "text": [],
                                "noscriptNav": "noscript" in tags and "nav" in tags}

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
        if any(tag == "title" for tag, _ in self.stack):
            self.title_parts.append(data)
        if self.ignored():
            return
        if self.active_h1 is not None:
            self.active_h1.append(data)
        if self.active_link is not None:
            self.active_link["text"].append(data)

    @property
    def title(self) -> str:
        return " ".join("".join(self.title_parts).split())


def parse_html(data: bytes) -> PageParser:
    page = PageParser()
    page.feed(data.decode("utf-8", errors="replace"))
    page.close()
    return page


class PreviewClient:
    def __init__(self, origin: str, timeout: float) -> None:
        self.origin = origin
        self.parts = urlsplit(origin)
        self.timeout = timeout
        self.remote = self.parts.scheme == "https"
        self.stopped: dict | None = None

    def get(self, path: str) -> tuple[dict, bytes]:
        if self.stopped:
            raise RuntimeError("Requests stopped after access protection or transport failure")
        if local_path(path) != path:
            raise ValueError(f"Refusing non-origin-relative request path: {path!r}")
        cls = http.client.HTTPSConnection if self.remote else http.client.HTTPConnection
        connection = cls(self.parts.hostname, self.parts.port, timeout=self.timeout)
        try:
            connection.request("GET", path, headers={
                "Accept-Encoding": "identity", "Connection": "close",
                "User-Agent": "portfolio-preview-artifact-qa/1",
            })
            response = connection.getresponse()
            data = response.read(64 * 1024 * 1024 + 1)
            if len(data) > 64 * 1024 * 1024:
                raise ValueError("Response exceeds the 64 MiB QA limit")
            row = {"path": path, "status": response.status,
                   "contentType": response.getheader("Content-Type", ""),
                   "contentEncoding": response.getheader("Content-Encoding", "identity"),
                   "bytes": len(data), "sha256": digest(data),
                   "location": safe_location(response.getheader("Location")),
                   "xRobotsTag": response.getheader("X-Robots-Tag", "")}
            redirect = urlsplit(response.getheader("Location", ""))
            protected_redirect = (response.status in {301, 302, 303, 307, 308}
                                  and redirect.hostname == "vercel.com"
                                  and redirect.path in {"/sso-api", "/login"})
            if response.status in {401, 403} or protected_redirect:
                self.stopped = {"reason": "access-protected", "path": path, "status": response.status,
                                "action": "Stopped; no credentials or bypass attempted"}
            return row, data
        except (OSError, http.client.HTTPException, ValueError) as error:
            self.stopped = {"reason": "transport-failure", "path": path, "error": type(error).__name__}
            return {"path": path, "status": None, "error": type(error).__name__}, b""
        finally:
            connection.close()


def finish(row: dict, checks: dict[str, bool]) -> dict:
    row["checks"] = checks
    row["pass"] = all(checks.values())
    if row.get("location") is None:
        row.pop("location", None)
    return row


def contained_file(path: Path) -> Path | None:
    if path.resolve().is_relative_to(BUILD.resolve()) and path.is_file():
        return path
    return None


def next_asset(path: str) -> Path | None:
    decoded = unquote(urlsplit(path).path)
    if local_path(path) is None:
        return None
    if decoded.startswith("/_next/static/"):
        return contained_file(BUILD / ".next" / decoded.removeprefix("/_next/"))
    public = contained_file(BUILD / "public" / decoded.lstrip("/"))
    if public:
        return public
    if decoded in {"/favicon.ico", "/robots.txt", "/sitemap.xml"}:
        return contained_file(BUILD / ".next/server/app" / (decoded.lstrip("/") + ".body"))
    return None


def next_html(path: str) -> Path | None:
    name = path.strip("/") or "index"
    return contained_file(BUILD / ".next/server/app" / (name + ".html"))


def output_static(path: str, html: bool = False) -> Path | None:
    decoded = unquote(urlsplit(path).path).lstrip("/")
    names = [decoded]
    if html:
        names = [decoded + ".html", decoded + "/index.html"] if decoded else ["index.html"]
    for name in names:
        candidate = contained_file(OUTPUT_STATIC / name)
        if candidate:
            return candidate
    return None


def compare_artifacts(row: dict, data: bytes, primary: Path | None,
                      packaged: Path | None, require_packaged: bool) -> dict[str, bool]:
    checks = {"nextArtifactExists": primary is not None}
    row["localArtifacts"] = {}
    for name, path in (("nextOrPublic", primary), ("vercelStatic", packaged)):
        if path is None:
            row["localArtifacts"][name] = None
            continue
        content = path.read_bytes()
        row["localArtifacts"][name] = {"path": path.relative_to(BUILD).as_posix(),
                                         "bytes": len(content), "sha256": digest(content)}
        checks["sameNextArtifactBytes" if name == "nextOrPublic" else "sameVercelStaticBytes"] = content == data
    if require_packaged:
        checks["vercelStaticArtifactExists"] = packaged is not None
    return checks


def manifest(files: list[Path]) -> dict:
    rows = []
    for path in sorted(set(files), key=lambda item: item.relative_to(BUILD).as_posix()):
        if not path.is_file():
            continue
        if not path.resolve().is_relative_to(BUILD.resolve()):
            raise ValueError("Artifact path escapes the fixed build root")
        data = path.read_bytes()
        rows.append({"path": path.relative_to(BUILD).as_posix(), "bytes": len(data), "sha256": digest(data)})
    canonical = "".join(f"{row['path']}\t{row['bytes']}\t{row['sha256']}\n" for row in rows).encode("utf-8")
    return {"sha256": digest(canonical), "fileCount": len(rows),
            "totalBytes": sum(row["bytes"] for row in rows), "files": rows}


def local_manifests() -> dict:
    source = [path for folder in (BUILD / "app", BUILD / "public") for path in folder.rglob("*") if path.is_file()]
    source.extend(BUILD / name for name in SOURCE_ROOT_FILES if (BUILD / name).is_file())
    artifacts = [path for path in (BUILD / ".next/static").rglob("*") if path.is_file()]
    artifacts.extend(path for path in (BUILD / ".next/server/app").rglob("*")
                     if path.is_file() and path.suffix in {".html", ".rsc", ".meta", ".body"})
    artifacts.extend(BUILD / name for name in (
        ".next/BUILD_ID", ".next/prerender-manifest.json", ".next/routes-manifest.json",
        ".next/app-path-routes-manifest.json", ".next/server/app-paths-manifest.json",
        ".vercel/output/config.json") if (BUILD / name).is_file())
    packaged = [path for path in OUTPUT_STATIC.rglob("*") if path.is_file()]
    return {"source": manifest(source), "nextAndPackagingMetadata": manifest(artifacts),
            "vercelStatic": manifest(packaged)}


def fixture_paths() -> tuple[list[str], set[str], dict[str, str]]:
    prior = json.loads(FIXTURE.read_text(encoding="utf-8-sig"))
    projects = sorted({row["path"] for row in prior["routes"]
                       if re.fullmatch(r"/projects/[a-z0-9-]+", row["path"])})
    assets = {row["path"] for row in prior["assets"]}
    if len(projects) != 15 or len(assets) != 55:
        raise ValueError("Expected the approved fixture to contain 15 projects and 55 assets")
    redirects = {row["path"]: row["location"] for row in prior["redirects"]}
    if any(local_path(path) != path for path in [*projects, *assets, *redirects, *redirects.values()]):
        raise ValueError("Fixture contains a non-local path")
    return ["/", "/about", "/contact", "/projects", *projects], assets, redirects


def noindex(value: str) -> bool:
    return "noindex" in re.split(r"[\s,:;]+", value.lower())


def page_metadata_checks(page: PageParser, path: str) -> dict[str, bool]:
    canonical = PRODUCTION_ORIGIN + (path if path != "/" else "/")
    # URL serialisers may omit the root slash; both identify the same page.
    canonical_values = {canonical, PRODUCTION_ORIGIN} if path == "/" else {canonical}
    return {
        "titlePresent": bool(page.title), "descriptionPresent": bool(page.meta.get("description")),
        "canonicalProductionUrl": len(page.canonical) == 1 and page.canonical[0] in canonical_values,
        "openGraphTitleMatchesTitle": page.meta.get("og:title") == page.title and bool(page.title),
        "openGraphDescriptionMatches": page.meta.get("og:description") == page.meta.get("description") and bool(page.meta.get("description")),
        "openGraphCanonicalUrl": page.meta.get("og:url") in canonical_values,
        "openGraphImagePresent": bool(page.meta.get("og:image")),
        "twitterLargeImageCard": page.meta.get("twitter:card") == "summary_large_image",
    }


def write_report(path: Path, report: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", required=True, type=base_origin)
    parser.add_argument("--output", required=True, type=output_file)
    parser.add_argument("--timeout", type=float, default=20.0)
    args = parser.parse_args()
    if not 1 <= args.timeout <= 60:
        parser.error("--timeout must be between 1 and 60 seconds")
    started = now()
    groups: dict[str, list[dict]] = {name: [] for name in ("routes", "assets", "chunks", "notFound", "redirects", "metadata")}
    planned: dict[str, list[str]] = {}
    client = PreviewClient(args.base_url, args.timeout)
    report = {
        "schemaVersion": 1, "project": "deshengkong-site", "scope": "Personal",
        "baseUrl": args.base_url, "buildRoot": BUILD.as_posix(), "startedAt": started,
        "requestPolicy": "Unauthenticated GET only; no redirects followed; stop on 401/403 or transport failure; no cookies, credentials or protection bypass",
        "sourceArchiveRevisionReportedByExecutor": "97254f6",
        "sourceRevisionNote": "Revision supplied by the archive executor; file hashes below independently identify the copied source",
        "fixture": FIXTURE.relative_to(REPO).as_posix(),
        "noindexPolicy": "Required in X-Robots-Tag on successful HTML pages and HTML 404 responses for remote Preview; not required on loopback",
        "artifactPolicy": "Byte-compare every page with its current Next prerender HTML; public and _next/static files must also exist and match in Vercel output/static; generated metadata routes compare with Next .body and Vercel static when present",
    }
    try:
        required = [BUILD / ".next/BUILD_ID", BUILD / ".next/prerender-manifest.json",
                    BUILD / ".next/server/app", BUILD / "public", OUTPUT_STATIC,
                    BUILD / ".vercel/output/config.json"]
        if any(not path.exists() for path in required):
            raise ValueError("The fixed Linux build or Vercel output is incomplete; no requests were made")
        build_id = (BUILD / ".next/BUILD_ID").read_text(encoding="utf-8").strip()
        report["buildId"] = build_id
        routes, assets, redirects = fixture_paths()
        required_assets = set(assets)
        planned = {"routes": routes, "assets": sorted(assets), "chunks": [],
                   "notFound": ["/__m1-preview-not-found", "/projects/__m1-preview-not-found", "/portfolio/__m1-preview-missing.png"],
                   "redirects": sorted(redirects), "metadata": ["/robots.txt", "/sitemap.xml"]}
        prerender = json.loads((BUILD / ".next/prerender-manifest.json").read_text(encoding="utf-8-sig"))
        before = local_manifests()
        report["localManifests"] = before
        resources: set[str] = set()

        for path in routes:
            if client.stopped:
                break
            row, data = client.get(path)
            page = parse_html(data)
            checks = {"status200": row["status"] == 200,
                      "htmlContent": "text/html" in row.get("contentType", ""),
                      "oneLiteralMain": page.main_count == 1, "oneLiteralH1": len(page.h1) == 1,
                      "listedInCurrentPrerenderManifest": path in prerender["routes"]}
            checks.update(page_metadata_checks(page, path))
            checks.update(compare_artifacts(row, data, next_html(path), output_static(path, html=True), False))
            if client.remote:
                checks["previewNoindexHeader"] = noindex(row.get("xRobotsTag", ""))
            if path in {"/", "/about", "/contact"}:
                nav = {link["href"] for link in page.links if link["noscriptNav"]}
                row["noscriptNavigation"] = sorted(nav)
                checks["nativeNoscriptNavigation"] = EXPECTED_NAV <= nav
            row.update({"h1": page.h1, "title": page.title, "canonical": page.canonical,
                        "metadata": page.meta})
            groups["routes"].append(finish(row, checks))
            resources.update(page.resources)

        assets.update(path for path in resources if not path.startswith("/_next/") and next_asset(path))
        chunks = {"/_next/" + path.relative_to(BUILD / ".next").as_posix()
                  for path in (BUILD / ".next/static").rglob("*")
                  if path.is_file() and path.suffix in {".js", ".css"}}
        chunks.update(path for path in resources if path.startswith("/_next/static/"))
        planned["assets"], planned["chunks"] = sorted(assets), sorted(chunks)
        for group, paths in (("assets", assets), ("chunks", chunks)):
            for path in sorted(paths):
                if client.stopped:
                    break
                row, data = client.get(path)
                primary = next_asset(path)
                require_packaged = bool(primary and (primary.is_relative_to(BUILD / "public")
                                                     or path.startswith("/_next/static/")))
                checks = {"status200": row["status"] == 200, "nonempty": bool(data)}
                checks.update(compare_artifacts(row, data, primary, output_static(path), require_packaged))
                if urlsplit(path).path == "/Desheng_Kong_CV.pdf":
                    checks["pdfContent"] = data.startswith(b"%PDF-") and "application/pdf" in row.get("contentType", "")
                groups[group].append(finish(row, checks))

        for path in ("/__m1-preview-not-found", "/projects/__m1-preview-not-found", "/portfolio/__m1-preview-missing.png"):
            if client.stopped:
                break
            row, data = client.get(path)
            checks = {"status404": row["status"] == 404}
            if not path.endswith(".png"):
                page = parse_html(data)
                checks.update({"literalVisible404Heading": any(text.replace("’", "'") == "This page isn't here." for text in page.h1),
                               "literalExploreProjectsLink": any(link["href"] == "/projects" and link["text"] == "Explore projects" for link in page.links),
                               "oneLiteralMain": page.main_count == 1})
                if client.remote:
                    checks["previewNoindexHeader"] = noindex(row.get("xRobotsTag", ""))
                row["h1"] = page.h1
                row["htmlInspection"] = "Literal HTML only; script/style/template/head/hidden subtrees excluded; JavaScript not executed"
            groups["notFound"].append(finish(row, checks))

        for path, expected in sorted(redirects.items()):
            if client.stopped:
                break
            row, _ = client.get(path)
            location = row.get("location") or ""
            parsed_location = urlsplit(location)
            same_origin = not parsed_location.netloc or (
                parsed_location.scheme + "://" + parsed_location.netloc == args.base_url)
            groups["redirects"].append(finish(row, {
                "redirectStatus": row["status"] in {301, 302, 307, 308},
                "expectedSameOriginLocation": same_origin and parsed_location.path == expected
                                               and not parsed_location.query and not parsed_location.fragment,
            }))

        for path in ("/robots.txt", "/sitemap.xml"):
            if client.stopped:
                break
            row, data = client.get(path)
            checks = {"status200": row["status"] == 200, "nonempty": bool(data)}
            checks.update(compare_artifacts(row, data, next_asset(path), output_static(path), False))
            if path == "/robots.txt":
                checks["productionSitemapDeclared"] = (PRODUCTION_ORIGIN + "/sitemap.xml").encode() in data
            else:
                try:
                    locations = {node.text for node in ET.fromstring(data).iter() if node.tag.endswith("}loc") or node.tag == "loc"}
                except ET.ParseError:
                    locations = set()
                expected = {PRODUCTION_ORIGIN + (path if path != "/" else "") for path in routes}
                checks["sitemapContainsAllNineteenPages"] = {item.rstrip("/") for item in locations if item} == expected
            groups["metadata"].append(finish(row, checks))

        after = local_manifests()
        checks = {
            "unchangedBuildIdDuringRun": build_id == (BUILD / ".next/BUILD_ID").read_text(encoding="utf-8").strip(),
            "unchangedSourceDuringRun": before["source"]["sha256"] == after["source"]["sha256"],
            "unchangedNextArtifactsDuringRun": before["nextAndPackagingMetadata"]["sha256"] == after["nextAndPackagingMetadata"]["sha256"],
            "unchangedVercelStaticDuringRun": before["vercelStatic"]["sha256"] == after["vercelStatic"]["sha256"],
            "nineteenPagesChecked": len(groups["routes"]) == 19,
            "fifteenProjectsChecked": sum(bool(re.fullmatch(r"/projects/[a-z0-9-]+", row["path"])) for row in groups["routes"]) == 15,
            "allFiftyFiveApprovedAssetsChecked": required_assets <= {row["path"] for row in groups["assets"]},
            "allCurrentChunksChecked": bool(chunks) and chunks == {row["path"] for row in groups["chunks"]},
            "three404ChecksCompleted": len(groups["notFound"]) == 3,
            "twoRedirectChecksCompleted": len(groups["redirects"]) == 2,
            "robotsAndSitemapChecked": len(groups["metadata"]) == 2,
            "notStoppedByAccessProtectionOrTransport": client.stopped is None,
        }
        report["checks"] = checks
        report["afterManifestHashes"] = {name: item["sha256"] for name, item in after.items()}
        failures = [{"group": group, "path": row["path"], "checks": [key for key, value in row["checks"].items() if not value]}
                    for group, rows in groups.items() for row in rows if not row["pass"]]
        failures.extend({"group": "run", "check": key} for key, value in checks.items() if not value)
        report["failures"] = failures
        report["passed"] = not failures
    except (OSError, ValueError, KeyError, TypeError) as error:
        report["passed"] = False
        report["failures"] = [{"group": "run", "error": type(error).__name__, "detail": str(error)}]
    report.update({"completedAt": now(), "stopped": client.stopped,
                   "counts": {name: len(rows) for name, rows in groups.items()},
                   "notRun": {name: sorted(set(paths) - {row["path"] for row in groups[name]})
                              for name, paths in planned.items()}, **groups})
    write_report(args.output, report)
    print(json.dumps({"passed": report["passed"], "buildId": report.get("buildId"),
                      "output": args.output.as_posix(), "counts": report["counts"],
                      "stopped": client.stopped, "failures": report["failures"]}, ensure_ascii=False))
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    sys.exit(main())
