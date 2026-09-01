# STAGE_WORKFLOW_CONTRACT — Portfolio M1 v3

Date: 2026-08-31

- Status: `M1_PRODUCTION_RELEASED / ACCEPTANCE_IN_PROGRESS`.
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

Later on 2026-09-01 the user asked to update the downloadable CV from the supplied PDF and current LinkedIn profile. Source commit `1b16581` replaces the stale front-end-only resume with a one-page Analyst Programmer CV, preserves the public contact details, adds the two verified 2026 roles and aligns selected work with reviewed portfolio copy. A tracked ReportLab generator now makes the PDF reproducible. [CV evidence](../qa/cv-update-2026-09-01/README.md) records A4 rendering, text extraction, embedded fonts, four PDF links, the exact online download hash and the independent protected Preview deployment. This is a content/artifact update within M1. No push, production deployment, alias change, access-policy change or company-system write was performed. The local service was not listening during this checkpoint; the protected remote Preview is independent of the workstation.

## Production promotion — 2026-09-01

The user then explicitly authorised the current homepage and CV for production. The release used the clean `codex/personal-site-m1` worktree and left the original dirty `main` worktree untouched. After a final fetch, `origin/main` remained `8bbc53e5`; it was the merge base and direct ancestor of candidate `44d05488`, so the release was a pure 12-commit fast-forward with no merge or force push.

Before the push, the previous production deployment `dpl_8Yfsm7janYL8nMiLU8RPakv96UHa`, the old public CV hash and a local archive of the previous `main` tree were recorded as rollback evidence. GitHub `main` then advanced to `44d05488`. Vercel built production deployment `dpl_Erj8RFmJkYVaWxWWTAPJQ3BASwfY`, reported `READY` and attached the `www`, apex, stable-project and Git-main aliases. The custom domains remain publicly accessible; the Vercel-owned aliases retain the account's existing SSO protection.

[Production evidence](../qa/m1-production-2026-09-01/README.md) records the route checks, browser visual review and an actual CV-link download. The downloaded production PDF is 77,154 bytes with SHA-256 `A5962742C8A7A2D97F27C43354B1E002635FFA595204AA9B7939CF742F5D1813`, exactly matching the tracked asset. The release does not change the earlier factual, synthetic-data or interaction boundaries. Physical confirmation of the full image-dialog Tab cycle remains the only open M1 interaction check.
