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

The initial width-revision attempt was blocked by the browser URL policy. In the later user-requested continuation, the supported browser connection recovered. The [current completion record](../qa/m1-completion-2026-08-31/README.md) supersedes that blocker: the wider UI now has fresh six-width screenshots, route/resource checks, modal/fallback verification and no-JavaScript recovery. Native keyboard default-action checks remain inconclusive and need physical-keyboard confirmation.

The official Vercel CLI has no verified authenticated identity. Its GitHub sign-in action requires explicit user authorisation under the browser safety gate; the attempted flow was cancelled without bypassing the restriction. Finish authentication only after that approval, then build/verify/deploy an independent Preview with the existing account protection intact.

The existing remote-preview and final M1 acceptance requirements remain open. No push to main, production deployment, hosting migration, account-security change or company-system write is included.
