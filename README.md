# Desheng Kong — Portfolio (Next.js)

Personal portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.
The M1 upgrade implements the approved portfolio, About and contact designs, with four featured cases and the existing project archive.

M1 source is implemented; production build, responsive/browser acceptance and an independent preview are still pending. See [the active workflow contract](docs/workflows/m1-portfolio-workflow-v2.md) and [acceptance record](docs/qa/m1-2026-08-31/README.md). The production site has not been updated.

## Live

- Existing production: https://www.deshengkong.com
- M1 preview: not deployed yet
- Vercel project: `fgzz12138s-projects/deshengkong-site`; pushing `main` can deploy production. Keep M1 on `codex/personal-site-m1` until separately approved for production.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Deployed with Vercel

## Pages

- `/` — Home
- `/projects` — Project list
- `/projects/[slug]` — Project detail pages (one page per project)
- `/about` — About me
- `/contact` — Email draft, professional profiles and CV (no submission backend)
- Unknown project slugs return the not-found page.

## Getting Started (Local)

Requirements:

- Node.js >=20.9.0 (the current workstation uses 24.16.0)
- Next.js and eslint-config-next 16.3.3 from the lockfile; do not start the older 16.1.6 runtime. See [security correction](docs/workflows/m1-dependency-security.md).

For this M1 task, choose the build/test environment before starting a server or production build. Install dependencies in this worktree only; never install through a junction pointing at the original checkout.

After the environment is selected and this worktree has its own dependencies:

```bash
npm ci
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm run start -- --hostname 127.0.0.1
```

Keep `docs/design/m0-portfolio-v2/` and `docs/design/m0-about-contact-v1/` as the visual references. Runtime UI uses React/HTML/CSS; concept illustrations are separate assets with [provenance](docs/design/m1-assets.json). Do not publish concept images as evidence of product operation.
