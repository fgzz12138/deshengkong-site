# STAGE_WORKFLOW_CONTRACT — Portfolio M1 v3

Date: 2026-08-31

- Status: `M1_IMPLEMENTATION_AUTHORISED / IN_PROGRESS`.
- This amendment follows the user's local-preview feedback: excessive side margins compress the content; widen the whole site while keeping the approved visual direction.
- Inherit the implementation scope, factual content, interactions, preservation requirements and release boundaries from [v2](m1-portfolio-workflow-v2.md). This is a layout revision within M1, not a new M0 or platform choice.

## Updated layout contract

The earlier 944px desktop content cap is superseded. Use a shared fluid shell with a maximum width of 1600px and side gutters of 4vw, bounded to 40–80px, until the width cap takes effect. At 700px and below, retain the existing 22px side gutters.

Apply the same shell alignment to the header, footer, home, About, contact, project collection, case studies and three historical dedicated pages. Keep the homepage's two-column cards and explicit hero title line breaks. Increase desktop card padding and text sizes so the wider cards remain readable. Limit the hero illustration to 560px wide and case-study figures to 620px high; keep paragraph reading limits rather than stretching every line across the full page.

About uses proportional introduction/profile columns and equal toolkit columns. Remove restrictive paragraph caps and forced desktop bio breaks where the wider layout has room. Historical body text retains readable line lengths. Mobile stacking and navigation remain unchanged.

Retain the approved palette, font families, case order, status labels, concept-image disclosures, learning boundaries and contact behavior. Do not alter the saved M0 SVG masters: they remain historical visual references, with this amendment controlling content width and supporting spacing.

## Verification and remaining work

Record the new build and checks separately in [the width-adjustment evidence](../qa/m1-width-adjustment-2026-08-31/README.md). Earlier screenshots and HTTP checks belong to the earlier build and do not verify this revision.

The initial width-revision attempt was blocked by the browser URL policy. In the later user-requested continuation, the supported browser connection recovered. The [current completion record](../qa/m1-completion-2026-08-31/README.md) supersedes that blocker: the wider UI now has fresh six-width screenshots, route/resource checks, modal/fallback verification and no-JavaScript recovery. Subsequent authenticated Chrome checks verified ordinary Tab navigation, native Enter and Escape; only the full dialog Tab cycle still needs physical-keyboard confirmation.

On 2026-08-31 the user explicitly authorised GitHub/Vercel login and the official CLI to publish this project's independent Preview, asking to see the login page only if manual action is needed. This supersedes the earlier login authorisation gate. CLI identity `fgzz12138` and the existing project `fgzz12138s-projects/deshengkong-site` were verified. The existing production deployment and aliases remain outside this release.

The native Windows Vercel packager mixed Windows and POSIX route separators even though Next generated every page successfully. Packaging therefore runs in an isolated copy under `.vercel/linux-build` using the workstation's existing Ubuntu WSL, official portable Node 24.16.0 and Vercel CLI 59.10.0. No Docker, global runtime installation, app dependency downgrade, route change or UI change is involved. Build from the recorded source commit, verify the resulting local UI/resources, and upload that exact `.vercel/output` with the Linux CLI using `--prebuilt --target=preview`. The CLI rejects `--skip-domain` for Preview because that option is production-only; omit it and retain the explicit Preview target, then verify that the existing production deployment and aliases remain unchanged. Do not rebuild between verification and deployment. Keep authentication in official CLI storage, outside source and QA evidence.

The [independent protected Preview](https://deshengkong-site-8x2pu57c6-fgzz12138s-projects.vercel.app) is now Ready. The [initial release evidence](../qa/m1-preview-2026-08-31/README.md) remains a historical checkpoint. Final M1 user acceptance and physical confirmation of the full dialog Tab cycle remain open. No push to main, production deployment, hosting migration, account-security change or company-system write is included.

On 2026-09-01 the user's screenshot feedback was resolved with one CSS rule: bordered home/contact/project links keep a single bottom border and turn blue on hover; ordinary inline links keep their existing underline. The [correction evidence](../qa/m1-link-hover-2026-08-31/README.md) records the new prebuilt artifact, three real hover checks, the unaffected ordinary-link behavior and five navigation checks on the authenticated Preview. The initial local background restart was blocked. During the user's follow-up, the local service was found running; its packaged CSS and real 430px mobile hover state confirm the updated build locally. Recovery was verified read-only, without bypassing the rejected launch command. The original startup limit is historical, not a current blocker.
