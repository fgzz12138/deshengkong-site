# CV update verification

Date: 2026-09-01 (Australia/Sydney). Scope: Personal M1.

**Preview:** https://deshengkong-site-9h6duaud5-fgzz12138s-projects.vercel.app/contact

Source commit `1b16581` updates the downloadable CV from the user-supplied PDF and the current LinkedIn profile. The new one-page A4 resume presents Desheng Kong as an Analyst Programmer focused on applied AI and backend systems, adds the verified Ultimate AI Australia role, closes the prior UltimAite Strata Robotics role at Sep 2026, and uses reviewed public wording for selected work.

## Evidence

- [Rendered page](cv-page-1.png): latest 180 dpi Poppler render of the exact final website PDF. Visual inspection found no clipping, overlap, missing glyphs or broken wrapping.
- [PDF validation](pdf-validation.json): the website asset and Downloads copy are byte-identical; the document is one A4 page, contains all required role/project fields, exposes four expected URI annotations and uses embedded Arial subsets for every actual character.
- [Browser check](browser-check.json): the authenticated protected Preview renders the contact page and its CV link. A real browser download matches the local final PDF byte for byte.
- [Build](build.txt): Vercel CLI 59.10.0, Node 24.16.0 and Next 16.3.3 complete all 24 generated pages and package the final asset.
- [Deployment](deploy.txt): prebuilt target `preview`, deployment `dpl_Epk4AhgVZwZkGqfAyb1yaQKrDqy7`, Ready.
- [Before](output-before-deploy.json) and [after](output-after-deploy.json) output hashes match: `52b7ac4a32f5dcaced52707868f1fe2d308f82def0ced17957cb30a36ae02dcf` (336 regular files, 110 symlinks).
- [Release record](release.json): production remains `dpl_8Yfsm7janYL8nMiLU8RPakv96UHa` with the same four aliases. No push, production deployment or access-policy change occurred.

The full project-wide `npm run lint` scans the intentionally retained `.vercel/linux-build` package and reports generated-code errors. The targeted source check `npx eslint app next.config.ts` passes, as does `npx tsc --noEmit --incremental false`. No application source or dependency changed in this update.

## Worker return

1. Project: `deshengkong-site` (Personal).
2. Worktree: `E:\gitclone\deshengkong-site-m1`.
3. Branch: `codex/personal-site-m1`; implementation commit `1b16581`.
4. Changed paths: `public/Desheng_Kong_CV.pdf`, `docs/cv/`, root `README.md`, `docs/workflows/m1-portfolio-workflow-v3.md` and this QA directory.
5. Checks: PDF render/extract/link/font validation; targeted ESLint; TypeScript; official Vercel Preview build; pre/post artifact hash; authenticated browser contact/download check; Preview and production inspection.
6. Raw build and deploy output is linked above; structured checks are retained in JSON.
7. Unresolved: final M1 user acceptance and the earlier physical full-dialog Tab cycle check. The local server is currently stopped.
8. Suggested technical state: source `1b16581`, Preview deployment and exact PDF hash as recorded in `release.json`.
9. Suggested progress: current CV is available from the protected M1 Preview; production remains unchanged.
10. 本 Worker 没有修改 CLAUDE、AGENTS、MEMORY、progress、项目索引或治理文件。
