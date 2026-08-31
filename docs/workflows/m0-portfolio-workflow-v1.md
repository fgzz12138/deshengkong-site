# STAGE_WORKFLOW_CONTRACT — portfolio M0 v1

Date: 2026-08-31
Execution scope: user-authorised M0 preview production
Visual acceptance: PENDING
Project: deshengkong-site
Type: existing personal portfolio / public content site
Current work: visual-and-content upgrade of an existing site, not a new SaaS application.

## Selected route

Retain the existing Next.js 16.1.6 / React 19.2.3 / TypeScript / Tailwind 4 codebase and local content model. Do not replace it with a new framework or paid design platform.

- REUSE: repository, public-page structure, project content model, contact destinations and hosting arrangement.
- ADAPT: homepage information hierarchy, case-story layout, responsive composition, evidence/status presentation.
- CUSTOM: Desheng's accurate short copy, individual-contribution narratives and approved project-specific visuals.
- DEFER: MDX/blog expansion, CMS, authentication, analytics changes, contact backend, sales/billing and production-service integration.

The previous review checked Next deployment documentation and the official Portfolio Blog Starter. The latter may provide selective future content/SEO patterns, but its dependency set is not a reason to overwrite the working codebase. No new dependency is introduced by M0.

Sources:
- https://nextjs.org/docs/app/getting-started/deploying
- https://vercel.com/templates/portfolio/portfolio-starter-kit
- https://github.com/vercel/examples/tree/main/solutions/blog

## Inputs and commands

Inputs: current site/source review, current project records, scoped English copy and user request to begin with preview images. No private screenshots or raw client data are sent to image generation.

Generation: built-in ImageGen; exact prompt set is retained in the design directory. First generate desktop home; use it as style reference for case detail and mobile. No external CLI/API credentials, third-party generation service or design account is required.

Local verification: inspect generated images, confirm textual status and synthetic-data boundaries, record dimensions/checksums, and run targeted Git diff/check. Do not start the application or heavy tests during M0.

## Outputs

See ../design/m0-portfolio-v1/README.md and manifest.json:
- Desktop homepage candidate
- Desktop case study candidate
- Mobile homepage candidate
- Exact prompts, brief, QA and asset provenance

Images are concept communication artifacts. They are not source code, editable production layouts or acceptance evidence for underlying products.

## Human checkpoint

The user reviews the actual images for both business meaning and appearance. Only the chosen image versions become APPROVED_VISUAL_CONTRACT after explicit confirmation. Current files are CANDIDATE, not approved.

## Acceptance for this M0 batch

Three readable, stylistically consistent previews; no invented client evidence; project states visible; personal portfolio purpose preserved; generated-interface disclosure supplied; originals preserved; no source overwrite or deployment.

M0 completion means preview candidates delivered for review. It does not mean the website upgrade, M1 interaction or live deployment is complete.

## Next stage and stop line

Stop after user review request. Do not implement the website interface until business/visual confirmation. At M1:
1. Preserve/reconcile the original uncommitted AI draft.
2. Freeze selected visual version and update the appropriate project record through Integrator.
3. Implement with the existing codebase, keeping historic URL compatibility and consistent SEO.
4. Define all control results, including mobile navigation, failures and fallback behaviour.
5. Verify locally and create a stable preview from the same build only within the authorised deployment scope.

Before any dev server/E2E or other environment-gated load, obtain the task's execution-environment choice if not already provided. This M0 task did not require such a workload.

## Failure, replacement and exit

Image generation failure does not justify moving the user to another paid design platform. Retain copy and composition rules and use the repository-based preview path as the applicable fallback. Do not silently switch to a paid API requiring new credentials.

Source and content remain local/Git-owned. Vercel remains the existing hosting arrangement, not a required authoring platform. Revisit the route only for changed scope, invalid evidence, dependency/security/compatibility changes or explicit user preference.
