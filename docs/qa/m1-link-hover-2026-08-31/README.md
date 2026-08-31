# Single-line link hover correction

Started 2026-08-31; built and deployed 2026-09-01 (Australia/Sydney). Scope: Personal M1.

**Preview:** https://deshengkong-site-8x2pu57c6-fgzz12138s-projects.vercel.app

Source commit `24f6d20` changes one CSS rule. `.home-about`, `.home-contact-mobile` and `.work-all` retain their bottom border and turn blue on hover without a second text underline. Ordinary `.inline-link` hover underlines remain unchanged. Button dimensions, the mobile 44px target, keyboard focus outlines, links and M0 masters are unchanged.

## Evidence

- [Build](build.txt): Vercel CLI 59.10.0 / Node 24.16.0 / Next 16.3.3 in the existing isolated Ubuntu build directory. Compile, TypeScript, all 24 generated pages and Vercel packaging pass. Log line-end whitespace was stripped; the original console log remains in ignored local scratch.
- [Source preservation](source-preservation.json): all 114 tracked app/public/build-source files match commit `24f6d20`, accounting for Windows text line endings; binary bytes remain exact.
- [Compiled CSS](compiled-css.json): the expected grouped hover rule appears in the packaged stylesheet.
- [Browser checks](hover-checks.json): the original local issue was reproduced using a real pointer. On the updated authenticated Preview, all three bordered hover states have `text-decoration:none`, one 1px blue border and blue text. The mobile link remains 116.28125 × 44px. A normal case link still has its hover underline and no bottom border. All four checks pass.
- Five actual online clicks pass: mobile contact, mobile project anchor, desktop About, desktop project anchor and All projects. No emails were sent or external profile controls activated.
- [Local follow-up](local-confirmation.json): after service recovery, the same deployed build serves the corrected CSS on loopback. A real pointer at the user's 430px mobile width confirms one 1px blue border, no text underline and the unchanged 44px click target. [All 98 local requests](local-http.json) pass with zero failures on build `FAIzg0DhbVMVBPPcqHzfj`; this is a fresh run, not reused baseline evidence.
- [Deployment](release.json): `dpl_FfGexpBwBftrgRRdKsXiQ1oPL8UY`, Ready / preview; build `FAIzg0DhbVMVBPPcqHzfj`. [CLI output](deploy.txt) confirms use of prebuilt artifacts. The CLI's printed production suggestions were not executed.
- [Before](output-before-deploy.json) and [after](output-after-deploy.json) output hashes match: `d1a427cadf150c1c8526aa80aad1fb0e3bd27e0f852a05cb1c0f9d9ae206f72f` (336 regular files, 110 symlinks).
- Production remains `dpl_8Yfsm7janYL8nMiLU8RPakv96UHa`, with the same four aliases. No push, production deploy, access-protection change, new dependency, design asset change or company-system write occurred.

Screenshots are actual JPEG files. `before-mobile-hover.jpg` is from the previous local build. `after-mobile-hover.jpg`, `after-desktop-about-hover.jpg` and `after-desktop-projects-hover.jpg` are from the updated online Preview. The later `local-after-mobile-hover.jpg` captures the recovered local server at 430px.

## Local startup recovered

The old local server was stopped to rebuild. The tool rejected the background restart command with `blocked by policy`; no alternate launch mechanism was used to bypass it. At the first delivery checkpoint the port was not listening, so the user was given this manual PowerShell command:

```powershell
cd E:\gitclone\deshengkong-site-m1
wsl -d Ubuntu --exec sh /mnt/e/gitclone/deshengkong-site-m1/.vercel/run-linux-preview.sh
```

During the user's follow-up on 2026-09-01, the service was found running from the expected Ubuntu build directory. Read-only HTTP and real pointer verification passed, followed by all 98 requests from the existing verifier. `.next/m1-preview-process.json` now records the confirmed running state and Linux PID. No server launch, restart, process termination, rebuild or deployment was performed in this recovery check. Do not run a duplicate server while the existing one is active. Final M1 user acceptance and physical confirmation of the full image-dialog Tab cycle remain open.

## Worker return

1. Project: `deshengkong-site` (Personal).
2. Worktree: `E:\gitclone\deshengkong-site-m1`.
3. Branch: `codex/personal-site-m1`; implementation commit `24f6d20`.
4. Changed tracked paths: `app/globals.css`, root `README.md`, `docs/workflows/m1-portfolio-workflow-v3.md` and this QA directory. Local ignored build/runtime records were refreshed; no application dependency changed.
5. Checks: `git diff --check`; official `vercel build --target=preview`; source comparison; `hash_output.mjs before|after`; supported-browser pointer/click checks recorded in JSON. No new test suite was added for this CSS change.
6. Raw build/deploy console output is retained in the linked text files; actual DOM/style/navigation observations are retained in JSON. The blocked local restart is not omitted.
7. Unresolved: final M1 acceptance and prior physical full-dialog Tab check. Local startup/after-fix verification has recovered.
8. Suggested technical state: source `24f6d20`, unchanged build/deployment/URL and verified running local service as above.
9. Suggested progress: duplicate hover underline fixed and verified online and locally; all 98 local requests pass; original assets and production unchanged. The earlier startup blocker is resolved.
10. 本 Worker 没有修改 CLAUDE、AGENTS、MEMORY、progress、项目索引或治理文件。
