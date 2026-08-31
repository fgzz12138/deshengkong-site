# M1 width adjustment — 2026-08-31

Historical snapshot: the later [M1 completion checks](../m1-completion-2026-08-31/README.md) supersede this document's browser-URL blocker and pending-screenshot state. This record still describes its original build and must not be relabelled as evidence for the later build.

The user requested less empty space at the sides and more room for the content. The revision is implemented and built; **fresh rendered visual acceptance is still pending**.

## Build and scope

- Project: `deshengkong-site` (Personal).
- Worktree: `E:/gitclone/deshengkong-site-m1`.
- Branch: `codex/personal-site-m1`; previous code commit: `22da29a`.
- New build ID: `KTaQdTVINCQ_6pEiYJpzr`.
- Contract: [M1 v3](../../workflows/m1-portfolio-workflow-v3.md).
- Local preview: `http://127.0.0.1:3180/`; the isolated Next process is listening only on loopback and reports ready. Its current PID is recorded in `.next/m1-preview-process.json`.
- No production deployment, remote push, dependency change or modification to the original checkout.

The shared shell now expands to 1600px with fluid desktop gutters. Homepage and collection cards have larger desktop copy/padding. About columns and restrictive paragraph caps are adjusted. Hero and case illustrations have size limits. Three historical pages now align with the shared header/footer. Colors, content, image assets, disclosures, routes and contact behavior are unchanged.

## Expected dimensions from CSS

These are formula calculations, **not browser measurements**. They exclude scrollbar-width differences.

| Viewport width | Earlier shell | Revised shell | Revised side space |
| --- | --- | --- | --- |
| 1920px | 944px | 1600px | 160px |
| 1440px | 944px | 1324.8px | 57.6px |
| 1024px | 944px | 942.08px | 40.96px |
| 768px | 688px | 688px | 40px |
| 390px | 346px | 346px | 22px |
| 320px | 276px | 276px | 22px |

## Verification evidence

- `npm run lint`: exit 0 — [output](lint.txt).
- `node node_modules/typescript/bin/tsc --noEmit --incremental false`: exit 0 — [output](typecheck.txt); successful command has no diagnostic output.
- `npm run build`: exit 0, all 24 static outputs generated — [output](build.txt).
- `git diff --check`: passed.
- An independent read-only source review checked mobile overrides, the intermediate hero grid and the historical-page containers. Its suggested `minmax(0, ...)` safeguard was included before the final build.
- [Artifact manifest](artifact.json) records source and compiled CSS SHA-256 hashes for the final build. Log content preserves command output except trailing whitespace normalization.

The browser tool rejected navigation to the local preview under its URL security policy. No alternate browser, raw protocol or indirect page-access workaround was used. This revision has no new screenshots or rendered overflow/interaction results. The earlier [20 screenshots and 93 HTTP checks](../m1-2026-08-31/README.md) apply to the previous build `hZqpohBpUeWN8UoSwhLrU`, not this build.

Next visual check: refresh the user's existing local preview, inspect home, About, contact, project collection and a case at wide desktop and mobile widths. Remaining M1 keyboard/error-state checks and stable remote Preview are still open. Do not mark M1 accepted based on this build alone.

## Worker return

Application files changed:

- `app/globals.css`
- `app/styles/about-contact.css`
- `app/styles/projects.css`
- `app/projects/company-website/page.tsx`
- `app/projects/ezisight-ecommerce/page.tsx`
- `app/projects/portfolio-v1/page.tsx`

Supporting files changed or added: `README.md`, `docs/workflows/m1-portfolio-workflow-v2.md`, `docs/workflows/m1-portfolio-workflow-v3.md`, and this QA directory (`README.md`, `artifact.json`, `lint.txt`, `typecheck.txt`, `build.txt`).

Suggested Integrator technical record: v3 supersedes the 944px width constraint; record this build and QA path, retaining the original M0 masters and prior evidence. Suggested progress record: width feedback implemented and preview restarted; fresh visual review remains pending because browser tooling was blocked. Keep M1 in progress and production unchanged.

Worker-phase declaration: **本 Worker 没有修改 CLAUDE、AGENTS、MEMORY、progress、项目索引或治理文件。** Central progress updates, if performed afterward, belong to the separate Integrator phase on the iClaude main workspace.
