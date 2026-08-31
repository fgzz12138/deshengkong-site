# M1 acceptance record — source complete, runtime acceptance pending

Date: 2026-08-31. Branch: `codex/personal-site-m1`.

The user approved the saved five visual directions and authorised M1. Homepage, four featured cases, collection, About, contact, shared responsive navigation and 404 are implemented. All twelve original project slugs remain, with three additional slugs (fifteen total). Original write-ups and local CV are retained; retaining the CV does not certify its contents as recently updated.

## Checks actually performed

- ESLint: exit 0 ([output](eslint.txt)). The first full lint run identified CommonJS imports in the preserved M0 renderer scripts; a scoped `docs/**/*.cjs` config correction resolved them without disabling application rules.
- TypeScript: exit 0 ([output](typescript.txt)).
- `git diff --check`: exit 0 ([output](diff-check.txt)).
- Original draft: all fifteen scoped paths still match the pre-M1 state ([hash comparison](original-preservation.json)). Two deleted paths remain deleted in the original directory and were restored only in M1.
- [Static tooling context](static-check-context.json): these checks used the original installed dependencies read through a junction, including Next/eslint-config-next 16.1.6. They must be repeated after the isolated 16.3.3 install. Manifest/lockfile correction is not installed-runtime verification.
- Approved illustrations and the new native social card have [source paths and hashes](../../design/m1-assets.json).
- Independent source review identified two issues, both corrected before the final static checks: per-page Open Graph/Twitter metadata now preserves the social image and correct page copy; compact image-error text and sizing prevent the mobile card fallback from being clipped. Actual browser verification remains pending.

No application build, local server, browser acceptance, M1 screenshot, remote M1 deployment or production change has been performed. The user's execution-environment choice is pending. The social card PNG and M0 images are design artifacts, not M1 browser screenshots.

After the static checks, the temporary `node_modules` junction was removed with a non-recursive directory-link deletion, after verifying its exact path, reparse-point status, junction type and original target. The original dependency directory remains present; M1 now has no installed dependencies.

## Hosting investigation

Repository: `https://github.com/fgzz12138/deshengkong-site.git`. Existing host: Vercel, project `fgzz12138s-projects/deshengkong-site`, Hobby team. The authenticated project overview was inspected via the user's existing GitHub login, without extracting credentials or creating tokens. It shows production source `main`, commit `8bbc53e5d710c5a8bf81e433e6a74a35f18b4105`, the `www.deshengkong.com` domain and no active feature branches.

Cloudflare Pages/Workers is not the personal site's verified host. The portfolio links to a separate customer-portal demo on Cloudflare Pages. Browser project access does not establish CLI authentication or a working public M1 Preview. Deployment protection and public access still require verification for the eventual independent deployment. No account-security, DNS or hosting settings were changed.

## Control/result acceptance checklist

The outcomes below are implemented intentions; every runtime result remains **PENDING**.

| Surface/control | Expected result | Runtime check |
| --- | --- | --- |
| Brand / homepage | Return to `/` | Pending |
| Work / Explore work | Navigate to homepage `#projects` | Pending |
| All projects | Open complete collection at `/projects` | Pending |
| Four featured cards | Open the matching case, preserving honest status and illustration labels | Pending |
| About / Get in touch | Open `/about` / `/contact`; update nav state | Pending |
| Mobile menu | Toggle with labelled button; closed items cannot receive focus; link selection closes it; Escape closes and refocuses toggle | Pending |
| Keyboard / skip link | Visible focus; skip to page main; controls usable without pointer | Pending |
| Portal View demo | Open the separate synthetic-data demo in a new tab | M1 click pending. Destination loaded in a read-only browser check with DEMO DATA visible; HEAD-only probe returned 403 ([record](portal-link.json)) |
| Other case pages | No invented live-demo button | Pending |
| Email me | Open Gmail draft for the recorded address; never send automatically | Pending |
| LinkedIn / GitHub | Open recorded profile URL in a new tab | Pending |
| Download CV | Download the existing local PDF | Pending |
| Twelve old project URLs | Retain project content rather than fail or silently redirect | Pending |
| Unknown slug | Show genuine not-found result with a working home link | Pending |
| Missing illustration | Show a readable fallback, without presenting it as a loaded image | Pending |
| Responsive layout | Inspect 320, 390, 768, 1024 and 1440 widths; no overflow or hidden cases | Pending |
| Preview | Same verified artifact, accessible without keeping a maker's machine online | Pending |

## Remaining work

1. Obtain the user's build/browser execution-environment choice and install the lockfile in isolation. The temporary dependency junction has already been removed.
2. Verify installed Next/eslint-config-next 16.3.3; repeat static checks and run the production build.
3. Perform browser and screenshot comparisons against all five approved directions. Record actual dimensions, any accessibility adjustments and tested results; correct visual drift before review.
4. Deploy an independent non-production Preview from the accepted artifact. For Vercel prebuilt deployment, `.vercel/output` is the deployment artifact; ordinary `.next` output is not interchangeable. Do not push main or disable global deployment protection.
5. Verify the resulting link and ask Desheng to accept the real interactions. Keep the stage IN_PROGRESS until this evidence exists.
