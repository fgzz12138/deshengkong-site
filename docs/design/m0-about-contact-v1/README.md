# M0 About + Get in touch — supplementary previews

- Date: 2026-08-31
- Project: deshengkong-site
- Status: `M0_PREVIEW / USER_REVIEW_PENDING`; no M1 implementation or deployment.
- Scope: two desktop UI compositions extending the saved portfolio visual direction.
- Authoring: editable SVG source, continuing the user's requested SVG workflow; no new image-generation call, website framework, design platform or service.

## Open the previews

- [About preview](qa/previews/01-about-desktop.png) / [editable SVG](01-about-desktop.svg)
- [Get in touch preview](qa/previews/02-contact-desktop.png) / [editable SVG](02-contact-desktop.svg)
- [Combined preview](qa/previews/about-contact-master.png) / [combined master](about-contact-master.svg)

Both pages use 1024 × 1536 reference artboards. The combined master is 2112 × 1536, including a 64-unit gap. These are M0 compositions, not live pages or browser screenshots. Mobile layouts are not included in this batch.

## Visual continuity

Continue [the existing visual contract](../m0-portfolio-v2/visual-contract.md): off-white surface, dark typography, cobalt blue accents, 40-unit desktop margins, the same header, restrained borders, and generous spacing. The existing homepage, case-study and mobile masters remain unchanged. These additions do not replace or silently approve any earlier reference.

`build_svg.py` reuses the existing local SVG helpers. Native text, groups, buttons and layout geometry remain editable. A DK letter card is an intentional typographic profile treatment, not a placeholder claiming to be a real portrait. No verified portrait was found in the current website source, so no synthetic face or unrelated project image is used.

Font rendering has only been checked in the current local font environment; cross-device font equivalence and Penpot/draw.io GUI import/edit/reopen are not claimed. QA uses XML source editing and local sharp/librsvg rendering.

## What each page does

The audience is people assessing Desheng's work for development opportunities or technical collaboration.

- **About** explains the move from front-end interfaces to applied AI, current focus, and the working approach. Learning topics remain visibly separate from current work. No education, employer chronology, years of experience, customer count, or performance claim has been invented.
- **Get in touch** proposes one place to find email, professional profiles and the existing CV. The primary action opens an email draft; the page does not collect or submit messages. The short “Useful to include” area is guidance for writing an email, not form fields.

There is currently **no `/contact` route** in the inspected website source. The existing “Contact Me” opens Gmail compose. A dedicated contact page is a proposed M0 presentation for the user to assess; it is not an implemented route or an approved change to the M1 interaction contract.

## Proposed controls and truthful results

All controls in these SVGs are visual descriptions only. M1 would implement and verify the following outcomes after approval:

| Label | Proposed result | Existing evidence / boundary |
|---|---|---|
| Work / View selected work | Go to the homepage's selected-work section | Preserve the homepage flow; confirm the exact anchor during M1 |
| About | Open `/about` | Existing route |
| Get in touch | Open the proposed contact page, suggested `/contact` | New route proposal, pending user choice; current Contact Me goes directly to Gmail |
| Email me / Open Gmail | Open `https://mail.google.com/mail/?view=cm&to=desheng.kong408@gmail.com&subject=Portfolio%20Enquiry` in a new tab | Existing target, prefilled recipient and subject; does not send automatically; Gmail may require sign-in |
| Visible email address | Allow reading/selecting the address `desheng.kong408@gmail.com` | Manual fallback if the visitor does not use Gmail; no unimplemented copy-success control |
| LinkedIn | Open `https://www.linkedin.com/in/desheng-kong/` | Existing source target; remote availability not checked this batch |
| GitHub | Open `https://github.com/fgzz12138` | Existing source target; remote availability not checked this batch |
| Download CV | Download `/Desheng_Kong_CV.pdf` | Existing home-page target; file exists, but its contents and recency have not been verified |

No contact-form backend, automatic email, booking calendar, availability guarantee, analytics service, paid dependency, or connection to company/customer systems is included.

## Content evidence

Read-only evidence was taken from the existing AI repositioning draft in `E:/gitclone/deshengkong-site`, which has pre-existing uncommitted changes. These source files were not modified:

- `app/about/page.tsx`: identity, Melbourne, applied AI focus, front-end background, AI-assisted development, maintenance/debugging/decision explanation, Gmail and professional-profile targets.
- `app/components/SkillsPanel.tsx`: skill vocabulary; not proof of a particular level of expertise.
- `app/components/CurrentlyLearning.tsx`: LangGraph, MCP, n8n and RAG evaluation remain learning topics. They are not promoted to proven production capabilities by this preview.
- `app/page.tsx`: existing download-CV behavior and contact destinations.
- `public/Desheng_Kong_CV.pdf`: existence only; no CV content/recency verification or rewrite in this batch.

The background layout is a narrative of focus areas, not a dated employment or education timeline. Text is draft public-facing copy grounded in the above files and remains subject to user review.

## Review and next step

Review whether the About introduction feels accurate and whether a separate lightweight contact page is preferred over opening Gmail immediately. No additional form fields or personal information are required for this M0 preview.

If approved, incorporate these pages and their control outcomes into the next version of the visual/workflow contract before M1. This batch does not start a dev server, build the application, publish a preview URL, update the production domain, or mark the pages implemented.
