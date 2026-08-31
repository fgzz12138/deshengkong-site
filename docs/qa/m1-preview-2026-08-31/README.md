# M1 independent Preview release — 2026-08-31

Scope: Personal. Application source: `97254f6`, branch `codex/personal-site-m1`. No application code, dependency versions, approved image masters or UI settings changed during this release.

**Preview:** https://deshengkong-site-bysxwt2p0-fgzz12138s-projects.vercel.app

Deployment `dpl_3Bg4obR6Km9kNnEJqDJr1AAJee2E` is **Ready / preview**. It runs independently of this workstation. Existing Vercel login protection remains enabled: unauthenticated requests redirect to Vercel SSO; this is not an anonymous public preview. The existing authorised Chrome login can view it. No cookies, passwords or tokens were inspected or copied into evidence.

## Build and production boundary

- The user explicitly authorised GitHub/Vercel login and the official CLI for this independent Preview. Windows and Ubuntu CLI identities were verified as `fgzz12138`, and the existing project ID was confirmed before publishing. Cross-OS credential reuse did not work; the Ubuntu CLI completed its own normal authorised login.
- Native Windows Next compilation succeeded, but Vercel's adapter mixed `projects\\[Slug]` and `projects/[Slug]` keys and failed packaging. Actual page/trace files were complete. The source was left unchanged; an isolated Ubuntu WSL copy used official portable Node 24.16.0, Vercel CLI 59.10.0 and Next 16.3.3. No Docker or global runtime installation was used.
- Build ID: **`MzdCOZ9TZQHLE8lpG6fHV`**. Artifact: `.vercel/linux-build/.vercel/output`. Its 336 regular files and 110 symlinks have the same combined SHA256 before and after upload: `3dc69d55cfe05a889249711074494f22e059fc926ad9a01b437f3512c13b1833`.
- Vercel confirmed it used the prebuilt artifact. There was no rebuild between local verification and deployment. `--skip-domain` was rejected as production-only before upload; it was removed while retaining `--target=preview`. No production flag was used.
- Production remains `dpl_8Yfsm7janYL8nMiLU8RPakv96UHa`, with the same four aliases, including `www.deshengkong.com` and `deshengkong.com`. No git push, main update, DNS change or access-protection change occurred.

## Evidence and results

| Check | Result |
| --- | --- |
| Source preservation | [115 files](source-preservation.json) match the archived source exactly and the committed source content; Windows CRLF conversion is explicitly accounted for. Binary images match exact bytes. |
| Local release artifact | [98 requests](local-http.json) pass: 19 pages, 55 assets, 17 JS/CSS resources, 3 missing paths, 2 redirects and robots/sitemap. Page bytes match this build's prerender files; static resources also match Vercel output. |
| Responsive local review | [10 final captures](responsive-layout.json), five page types at1440/390, no horizontal overflow or missing/pending visible images. Independent review against the prior approved width build found no layout drift. |
| Authenticated online routes | [All19 pages](remote-routes.json) match the local titles, visible H1 text and single main region. This is ordinary authenticated Chrome DOM evidence, not a claim of unauthenticated HTTP200. |
| Online visual comparison | Four full-page captures: home/About at1440/390. Independent comparison with the corresponding local images found no layout drift. The final default-viewport homepage image is also retained. |
| Online asset bytes | [Nine observed resources](remote-loaded-assets.json), including all three loaded CSS files, the hero, four case images and favicon, were exported through the supported browser pageAssets capability. Every byte matches the release artifact. |
| Online keyboard/recovery | [Tab navigation, Enter navigation/image opening, Escape closing/focus recovery and restored scrolling](remote-keyboard.json) pass. [Both404 recovery pages and the return link](remote-recovery.json) pass. |
| Artifact immutability | [Before](output-before-deploy.json) and [after](output-after-deploy.json) manifests match, including symlinks. |

Screenshot filenames use `.jpg` to match the browser's JPEG output. Correcting the extensions did not re-encode the images or change their SHA256 hashes.

## Limits retained honestly

- Full dialog Tab cycling still needs physical-keyboard confirmation. Focus left the DOM dialog in the injected test; the read-only browser surface cannot distinguish browser-chrome focus from a defect. It is not counted as passed. The ordinary Tab sequence, Enter and native Escape now have positive Chrome evidence, superseding their earlier broader uncertainty.
- Additional remote full-page screenshots hit browser CDP screenshot/scroll timeouts after the four successful captures. The other pages have authenticated DOM and local responsive evidence; they are not represented as complete remote screenshots. The source/CSS byte checks and matching existing screenshots are separate evidence.
- [Unauthenticated HTTP probe](remote-http.json) stops on the expected302 Vercel SSO redirect. No bypass token, cookie export, anonymous alternate deployment or protection change was used. The initial probe did not yet stop on302 and is retained separately; those login responses do not mean the app routes failed.
- The initial local checker treated the root canonical URL with and without a trailing slash as different. That false positive was corrected; both are equivalent root URLs. [Initial report](local-http-initial.json) is retained.
- Local Next still logs its known fallback diagnostic during deliberate unknown-slug probes and a nested-lockfile advisory. Actual tested local responses and authenticated remote recovery are correct; this is not a claim of an empty diagnostic log.
- Final M1 acceptance remains with Desheng. Concept-image disclosures and the previously documented inherited illustration label remain unchanged.

## Reproduce without changing the production site

Use the existing project's Preview settings and a source archive of the reviewed commit in an isolated Ubuntu directory. Keep `.vercel/` and environment files out of git. This workstation's build copy is `.vercel/linux-build`; its official portable Node archive hash and project settings are in [deployment evidence](deployment-evidence.json). Pull Preview settings with the official CLI, then in Ubuntu with the portable Node directory on PATH:

```sh
vercel build --target=preview --scope fgzz12138s-projects
# Serve this build on loopback3180 and run the Python verifier before uploading.
vercel deploy --prebuilt --target=preview --scope fgzz12138s-projects
```

Use the official CLI's normal login and credential storage. Do not print authentication codes/tokens in persistent records. Do not run a second build between verification and upload, switch to production, or create a replacement Vercel project. `verify_preview.py` accepts only the fixed loopback origin or an explicitly selected project Preview URL; it never follows authentication redirects. `hash_output.mjs before|after` records the entire output using the Ubuntu Node runtime.

## Worker return

Changed only the root README, v3 workflow, earlier QA supersession pointer and this release evidence directory. No app code or dependency change. Central progress updates are a separate Integrator operation in the iClaude main workspace.

**本 Worker 没有修改 CLAUDE、AGENTS、MEMORY、progress、项目索引或治理文件。**
