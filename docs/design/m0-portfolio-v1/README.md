# Personal portfolio — M0 preview candidates v1

Created: 2026-08-31
Status: CANDIDATE / USER_REVIEW_PENDING
Scope: Personal portfolio; static visual review only.

The user asked to start the upgrade directly with M0 preview images, inspect them, and then proceed to the next stage. These images have **not** been approved as a visual contract. No application code or live website was changed.

## Review images

1. [Desktop homepage](01-home-desktop.png)
2. [Desktop case study](02-case-study-desktop.png)
3. [Mobile homepage excerpt](03-home-mobile.png)

The mobile image deliberately shows only the first two projects. The other two continue below the excerpt. An earlier mobile attempt was rejected because its horizontal image/text cards were too dense.

**Every product image and interface thumbnail in these previews is generated illustration, not a photograph or actual product screenshot.** The portal uses synthetic demo imagery. The workbench illustration is not an acceptance screenshot. Do not publish these images as evidence of delivered functionality.

## Business scope for review

- Primary visitors: recruiters, technical hiring managers and potential collaborators evaluating Desheng's practical AI work. This preserves the existing portfolio purpose; the user has not requested a sales platform.
- Main task: understand Desheng's focus, inspect a relevant case, understand his contribution, then contact him or inspect an explicitly labelled demo.
- Visible objects: selected projects, status, personal contribution, scoped results, illustrative or approved evidence, contact and demo links.
- Hidden objects: internal infrastructure, credentials, client data, pricing/financials, production controls, private reports and unapproved company information.
- System boundary: a public portfolio that explains and links to work. It does not replace the customer portal, project workbench, AI services or company websites.
- User/admin split: public read-only content only. Content remains maintained through the existing local repository; no new admin dashboard, authentication or CMS in this stage.
- Data boundary: all new preview visuals are synthetic. Written case states follow current repository evidence, and remain subject to user review. No live backend calls.

## Proposed case selection

| Case | Visible state | Scope of claim |
|---|---|---|
| Virtual Concierge | FIELD-TESTED | Voice/RAG/kiosk integration with recorded user field acceptance; not a blanket production/SLA claim |
| AI Platform & Customer Portal | DEMO | Fixture-driven customer journey; no live API, billing, real customers or production inference |
| Media & Visual Tools | IN DEVELOPMENT | Content and editable-visual workflow, with human review; not unattended publishing |
| iClaude Workbench | IN DEVELOPMENT | Local project context and controlled handoffs; newest visual work remains subject to acceptance |

The portal detail's key creation/revocation, sample CSV export and simulated request/failure descriptions are supported by the existing approved M1 interaction contract and fixture source. They were not newly implemented or runtime-tested in this M0 task.

Evidence:
- iClaude/projects/progress/deshengkong-site-progress.md
- iClaude/projects/progress/virtual-concierge-progress.md
- iClaude/projects/bg2w-gpu-arrangement/evidence/2026-08-21-kiosk-e2e-user-acceptance.md
- iClaude/projects/uai-api-private-beta/docs/design/m1-customer-portal-v1/interaction-contract.md
- iClaude/projects/uai-api-private-beta/demo/customer-portal/src/lib/portal.ts
- iClaude/projects/progress/media-ai-agent-progress.md
- iClaude/projects/progress/iclaude-workbench-progress.md

## Proposed controls — not an approved interaction contract

| Control | Intended result in a later implementation |
|---|---|
| Work / Explore selected work | Scroll to selected projects |
| All projects | Show the broader project collection, with historical work retained where appropriate |
| View case study | Open that project's contribution/evidence page |
| About / About me | Open About |
| View demo | Open the verified public demo in a separate context, with demo disclosure |
| Get in touch | Open the established contact channel; no message is sent by merely viewing the site |
| Mobile menu | Open/close public navigation |

The portal controls drawn inside the case-study image are part of a static illustration, not controls implemented on the portfolio.

## Visual direction

- Light neutral surface, strong dark typography, restrained cobalt accents.
- Work and contribution lead; no unverified impact counters or testimonials.
- Conceptual system illustration on desktop; a compact text strip on mobile.
- Project states always have text labels, not colour alone.
- Mobile project cards stack image above text.
- Approximate proposed colours: surface #F7F8FA, ink #17212B, accent #285DCC.
- In M1, rebuild layout and typography in native Next.js/Tailwind components. These flattened previews must never become the website UI.

## User review needed

Confirm the visitor/purpose assumption, the four selected cases and their states, the proposed main actions, the hidden-data boundary, and the visual direction. A positive response to appearance alone does not approve different business claims.

After confirmation, preserve these exact selected image versions as the approved visual contract, then implement within the existing site. The M0 preview is not approval to publish company/client material.

## Repository preservation

This candidate set is isolated in branch `codex/personal-site-m0`. The original website directory retains its pre-existing uncommitted AI rewrite. This worktree starts from the tracked baseline `8bbc53e` and **does not contain those uncommitted application changes**. Before M1, preserve and reconcile that original draft rather than overwriting it or assuming it was copied here.

No build, dev server, E2E run, public deployment or external message was performed.
