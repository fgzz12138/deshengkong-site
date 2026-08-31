"""Temporary loopback-only image-failure fixture for the portfolio preview.

Only GET/HEAD requests in origin form are accepted. The upstream is fixed to
127.0.0.1:3180; this cannot proxy arbitrary hosts or forward writes. No assets
are changed on disk. Stop with Ctrl+C after browser verification.
"""

from __future__ import annotations

import http.client
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit


BIND = ("127.0.0.1", 3181)
UPSTREAM = ("127.0.0.1", 3180)
FAILED_IMAGES = frozenset(f"/portfolio/{name}.png" for name in ("concierge", "portal", "media", "workbench"))
HOP_HEADERS = frozenset({
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailer", "transfer-encoding", "upgrade",
})


class FaultProxy(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, _format: str, *args: object) -> None:
        # Intentionally no per-request logging, headers, cookies or query data.
        pass

    def respond(self, status: int, body: bytes, content_type: str = "text/plain; charset=utf-8") -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("Connection", "close")
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)
        self.close_connection = True

    def forward(self) -> None:
        if (not self.path.startswith("/") or self.path.startswith("//")
                or any(char in self.path for char in ("\\", "\r", "\n", "\x00"))):
            self.respond(400, b"Only local origin-form paths are supported.\n")
            return
        parsed = urlsplit(self.path)
        if parsed.scheme or parsed.netloc or parsed.fragment:
            self.respond(400, b"Invalid local request path.\n")
            return
        if parsed.path in FAILED_IMAGES:
            self.respond(404, b"Intentional portfolio-image failure for local QA.\n")
            return

        connection = http.client.HTTPConnection(*UPSTREAM, timeout=20)
        try:
            # Host is fixed. Preserve ordinary request semantics but never
            # forward connection/proxy headers or a request body.
            connection_tokens = {part.strip().lower() for part in self.headers.get("Connection", "").split(",")}
            excluded = HOP_HEADERS | connection_tokens | {"host", "content-length"}
            headers = {key: value for key, value in self.headers.items() if key.lower() not in excluded}
            headers["Host"] = f"{UPSTREAM[0]}:{UPSTREAM[1]}"
            headers["Connection"] = "close"
            connection.request(self.command, self.path, headers=headers)
            upstream = connection.getresponse()
            body = upstream.read()
            response_tokens = {part.strip().lower() for part in (upstream.getheader("Connection") or "").split(",")}
            excluded_response = HOP_HEADERS | response_tokens | {"content-length"}
            self.send_response_only(upstream.status, upstream.reason)
            for key, value in upstream.getheaders():
                if key.lower() not in excluded_response:
                    self.send_header(key, value)
            # HEAD has no body, but retain the upstream representation length.
            length = upstream.getheader("Content-Length") if self.command == "HEAD" else str(len(body))
            if length is not None:
                self.send_header("Content-Length", length)
            self.send_header("Connection", "close")
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(body)
            self.close_connection = True
        except (OSError, http.client.HTTPException):
            # Avoid leaking upstream headers or exception details in responses.
            self.respond(502, b"Local portfolio preview is unavailable.\n")
        finally:
            connection.close()

    def do_GET(self) -> None:
        self.forward()

    def do_HEAD(self) -> None:
        self.forward()

    def reject_write(self) -> None:
        self.respond(405, b"This local QA fixture only accepts GET and HEAD.\n")

    do_POST = do_PUT = do_PATCH = do_DELETE = do_CONNECT = do_OPTIONS = do_TRACE = reject_write


def main() -> None:
    server = ThreadingHTTPServer(BIND, FaultProxy)
    server.daemon_threads = True
    print("Temporary portfolio image-failure fixture: http://127.0.0.1:3181/", flush=True)
    print("Fixed upstream: http://127.0.0.1:3180/. Stop with Ctrl+C.", flush=True)
    try:
        server.serve_forever(poll_interval=0.2)
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
        print("Portfolio image-failure fixture stopped.", flush=True)


if __name__ == "__main__":
    main()
