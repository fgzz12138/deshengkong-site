# M1 completion checks — 2026-08-31

Historical checkpoint: the later [Preview release evidence](../m1-preview-2026-08-31/README.md) supersedes the login/deployment gate below. This directory continues to identify its original local build and tests.

Scope: Personal. Worktree: `E:/gitclone/deshengkong-site-m1`. Branch: `codex/personal-site-m1`.

The browser connection recovered in this continuation. The wider layout now has fresh rendered evidence. Remaining implementation defects were fixed and verified locally. **M1 is still awaiting native keyboard confirmation, Vercel login authorisation, stable remote Preview and user acceptance.** No production deployment or remote push occurred.

## Final build and repairs

Final build: `yhUBmIse5tLbkcA6nmc__`, running at `http://127.0.0.1:3180/`. The current temporary PID is in `.next/m1-preview-process.json`. [Artifact hashes](artifact.json) identify the source, CSS and final screenshots.

- Historical company/ecommerce image controls share a native modal `dialog`. Opening focuses the close button; closing by button or backdrop restores the image trigger and original body scrolling. Native dialog semantics retain background inertness, focus containment and Escape cancellation.
- Mobile navigation has server-rendered `noscript` links and hides the unusable menu toggle when JavaScript is disabled.
- All valid project slugs are enumerated. `dynamicParams = false` makes unknown slugs use the static 404 with actual recovery HTML, rather than requiring hydration.
- Contact email can wrap before `@`; its address and selectable text are unchanged. This removes the orphan final letter at 390px.
- The v3 wide-layout settings, colors, content, original images and saved M0 SVGs remain unchanged.

## Verified results

| Check | Evidence / outcome |
| --- | --- |
| ESLint, TypeScript, production build | All exit 0: [commands](checks.json), [lint](lint.txt), [types](typecheck.txt), [build](build.txt). Output is unchanged except trailing whitespace normalization; a silent success has an empty output file. |
| Five page types × six widths | [30 measurements](responsive-layout.json) and [screenshots](screenshots/): home, About, contact, collection, portal case at 320, 390, 768, 1024, 1440 and 1920px. One main, zero horizontal overflow, zero broken or pending visible images in every capture. |
| Lazy images | Each final page was scrolled to the bottom and back before capture. This corrected early collection screenshots that contained unloaded historical thumbnails. |
| Pages and assets | [98 requests](http-evidence.json): 19 pages including all 15 project URLs; 55 assets including the CV; 17 current-build JS/CSS resources; 3 missing paths; 2 redirects; robots and sitemap. All pass; local asset bytes match. No external URL or redirect was followed. |
| No-JavaScript recovery | Literal HTML inspection excludes scripts and hidden streamed content. Root and unknown-project 404s contain the visible heading, one main and Explore projects link. Home/About/contact contain the four native noscript navigation links. This is server-HTML evidence, not a browser setting toggle. |
| Menu and 404 navigation | [Interactions](interactions.json): open/close state, menu Escape with focus recovery, About selection closing the menu, and 404-to-projects navigation pass. |
| Historical image controls | All 8 company and 7 ecommerce controls open one native modal, focus its close button, lock scrolling, close and return focus/scrolling correctly. Backdrop close also passes. |
| Real image failures | A [temporary loopback fixture](fault_proxy.py) returned HTTP404 for the four portfolio PNGs without editing assets. At 320 and 1440px, all four accessible fallback labels rendered, no overflow occurred, and all four case links remained. Case navigation passed. [Results](image-failure.json). The fixture was stopped; only the normal preview remains on 3180. |
| Visual review | Root and an independent reviewer inspected wide and mobile samples of all five page directions. Contact line wrapping and previously unloaded collection thumbnails were rechecked after correction. No layout blocker found. |

The `before/` images are explicitly earlier width-build and intermediate modal references. The final `screenshots/` and JSON records belong to the build above; final modal screenshots are `company-website-dialog.png` and `ezisight-ecommerce-dialog.png`. All fifteen preserved original draft paths still match their baseline hashes: [preservation check](original-preservation.json).

## Remaining limits and release gate

- **Native keyboard default actions need physical-keyboard confirmation.** The supported locator, CUA and DOM-keyboard inputs did not advance Tab focus or activate native Enter; native dialog Escape did not close. A visible-preview retry gave the same Tab result. Application-handled menu Escape works. Do not count these default-action checks as passed or change standard links/buttons just to satisfy the driver. Native modal semantics and close-button/backdrop behavior were verified separately.
- **Vercel authentication requires explicit approval.** The official CLI 59.10.0 was run through the temporary npm cache, without changing project dependencies. `whoami` exited 1 after a worker timeout and reported logged out; no usable identity was established. The supported device login reached Vercel's login page, but its GitHub sign-in action was rejected pending explicit user authorisation. The flow was cancelled, no code/token is retained here, and no alternate login or authentication bypass was attempted.
- After approval, confirm the existing `fgzz12138s-projects/deshengkong-site` project, link/pull Preview settings, run `vercel build`, verify that build locally, then deploy only its `.vercel/output` with `vercel deploy --prebuilt --target=preview`. Current `.next` output is not represented as Vercel prebuilt output. [Official build documentation](https://vercel.com/docs/cli/build), [deploy documentation](https://vercel.com/docs/cli/deploy).
- Preserve current access protection. If a remote Preview requires login, report it; do not disable protection, assign the production domain, use a temporary anonymous deployment to evade authentication, or push main.
- The stderr log contains two `Internal: NoFallbackError` diagnostics during deliberate unknown-slug probes. Local Next routing code handles this as a fallback routing signal, separately from generic HTTP500 handling; the actual tested responses are complete HTTP404 pages. This is not a claim of an empty server error log.
- Minor inherited asset issue: the concierge illustration contains a baked-in concept label partly repeated by the HTML disclosure. It does not clip page text or block operation. Original image masters are preserved.

## Worker return

Application changes: `app/components/Header.tsx`, new `app/components/ZoomImage.tsx`, `app/contact/page.tsx`, `app/projects/[Slug]/page.tsx`, `app/projects/company-website/page.tsx`, `app/projects/ezisight-ecommerce/page.tsx`.

Supporting changes: root `README.md`, current workflow/earlier-QA pointers, this QA directory and its verification helpers, raw check output, JSON evidence and screenshots. Tests and outstanding issues are recorded above. Integrator should replace the obsolete browser-URL blocker with these verified results and the specific Vercel login authorisation gate, while retaining M1 IN_PROGRESS.

Worker-phase declaration: **本 Worker 没有修改 CLAUDE、AGENTS、MEMORY、progress、项目索引或治理文件。** Any subsequent central progress update is a separate Integrator operation in the iClaude main workspace.
