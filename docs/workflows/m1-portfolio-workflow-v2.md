# STAGE_WORKFLOW_CONTRACT — Portfolio M1 v2

Date: 2026-08-31

- Status: `M1_IMPLEMENTATION_AUTHORISED / IN_PROGRESS`.
- Visual approval: user accepted the saved homepage, case-study, mobile-home, About and Get in touch direction and explicitly requested M1.
- Supersedes the pending-approval state of [v1](m1-portfolio-workflow-v1.md). Older M0 files remain historical source records; their pending labels do not cancel this later approval.
- Scope: portfolio UI implementation and independent preview; no production-domain release or hosting migration.
- Execution environment: `AWAITING_USER_CHOICE` for build, dev server and browser/E2E. The user has been asked asynchronously. Source editing and lightweight static checks may proceed.

## Formula and fixed implementation scope

**Existing Next.js code + approved SVG visual baseline + factual case content + working navigation/states + old URL compatibility + verified build + same-artifact stable preview.**

Reuse the existing Next.js 16 / React 19.2.3 / TypeScript / Tailwind 4 application and lucide-react. A verified security advisory requires the original Next.js 16.1.6 to move to 16.3.3 before server/build acceptance; the M1 manifest and lockfile are updated, while the installed-runtime replacement is still pending. See [the security correction](m1-dependency-security.md). No new content platform, database, authentication, contact backend or AI service.

Build the homepage, four featured case pages, a full project collection, About, contact, and a real 404. Retain all 12 existing project slugs and add the portal, media and workbench slugs, giving 15 project URLs. Historical pages retain their content and are identified as earlier work.

Approved contact-page addition: `/contact` groups the existing Gmail-compose, LinkedIn, GitHub and local CV destinations. Email starts a draft, not automatic sending. The contact page has no submission form or scheduling promise. `/#projects` is the selected-work anchor.

## Preservation and implementation location

- Original repository: `E:/gitclone/deshengkong-site`, main / tracked baseline `8bbc53e5d710c5a8bf81e433e6a74a35f18b4105`.
- Remote fetched before implementation: `https://github.com/fgzz12138/deshengkong-site.git`; origin/main matched that baseline.
- Full scoped draft backup: `E:/gitclone/deshengkong-site-backups/m1-baseline-20260831-173042/` (zip, binary patch and file hashes).
- Original draft retained unchanged, including its separate local `.claude` state. No reset or stash.
- M1 worktree: `E:/gitclone/deshengkong-site-m1`, branch `codex/personal-site-m1`, created from the M0 branch and supplied with the preserved AI draft and approved M0 assets.
- A temporary node_modules junction was used only for lightweight static tooling, then safely removed after checks. The original dependency directory is unchanged. M1 currently has no installed dependencies; install its lockfile in isolation after the environment choice.

## Approved visuals

Continue [the M0 visual contract](../design/m0-portfolio-v2/visual-contract.md) and [About/contact supplement](../design/m0-about-contact-v1/README.md). This v2 contract records user approval of those five page directions.

The original generated PNGs remain visual references. SVG supplies editable geometry; all actual page text, navigation, states and layout are real HTML/React/CSS. Only approved concept illustrations are extracted into `public/portfolio/`, with [asset provenance](../design/m1-assets.json). Use Arial, the existing light palette, fixed desktop content width, explicit hero line breaks, restrained borders and the same card order. No new theme, font family, hero composition or decorative layout.

Keep concept/synthetic labels. The public UAI API portal demo is a separate synthetic-data application. Other featured projects have no invented live-demo control. Learning topics and course work remain clearly separated from established project claims.

## Hosting facts verified in this task

The personal site is currently hosted by **Vercel**, project `fgzz12138s-projects/deshengkong-site`, at `https://www.deshengkong.com/`. Evidence: the site README, historical project statement, GitHub's successful Vercel Production deployment for the current main SHA, current HTTP `Server: Vercel`, and the www Vercel DNS CNAME. Public nameservers currently belong to the registrar.

No Cloudflare Pages/Workers project, Wrangler/OpenNext setup or Cloudflare DNS hosting was found for this site. Do not infer a Cloudflare migration from the user's request to locate hosting records. The UAI API demo's pages.dev address belongs to a different project.

Treat pushing main as a possible production deployment. Do not push or merge into main, change production DNS, migrate hosting, or disable account protection in this batch. The known Vercel deployment URL requires login and is not a verified public preview. Verify the independent preview target and access before deployment; preserve source and build hashes, and do not substitute a second build without proving equivalence.

Authenticated browser access to the existing Hobby project was confirmed through the user's existing GitHub login. The project overview confirms the same production SHA and no active feature branches. CLI authentication and access to an eventual M1 Preview have not yet been verified; no security settings were changed.

Source implementation and preliminary static checks are complete; see [the acceptance record](../qa/m1-2026-08-31/README.md). This does not satisfy the runtime acceptance sequence below.

## Acceptance sequence

1. Complete all approved pages, historical URL preservation, keyboard/menu behavior, link destinations and honest missing-image/404 results.
2. In the user-selected environment, run lint and production build, preserving the real output and fixing failures.
3. Use browser screenshots at 320, 390, 768, 1024 and 1440 widths; inspect all five approved page directions, full four-case mobile collection, keyboard navigation, closed-menu focus, Escape/close behavior, CV, old URLs and unknown slugs.
4. Compare reference and actual screenshots: title wraps, hero proportions, card rows, image frames, status and contact sections. Record necessary responsive/accessibility changes and correct unapproved drift.
5. Publish an authorized independent Preview from the verified build; verify actual access, UI and assets. No production-domain replacement.
6. Deliver source, preview, screenshots, control-results table and residual limitations. Only then record M1 ready for user acceptance; implementation approval is not interaction acceptance.

## Current stop boundaries

No environment-gated workload before the user's choice. No automatic message sending, client-data publication, paid service, new server/VM, production connection or primary-domain deployment. Missing deploy access does not stop source work or excuse claiming an unavailable preview as complete.
