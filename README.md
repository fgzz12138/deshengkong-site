# Desheng Kong — Portfolio (Next.js)

Personal portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.
The M1 upgrade implements the approved portfolio, About and contact designs, with four featured cases and the existing project archive.

M1 is available for local review at **http://127.0.0.1:3180** while its preview process is running. The wider layout now has 30 fresh responsive captures and 98 passing route/resource checks. Historical image dialogs, mobile no-JavaScript navigation and 404 recovery have been repaired; real missing-image fallbacks and all 15 image controls were checked. See [the active workflow contract](docs/workflows/m1-portfolio-workflow-v3.md) and [current completion evidence](docs/qa/m1-completion-2026-08-31/README.md). Physical-keyboard confirmation, explicit Vercel login authorisation, stable remote Preview and final M1 acceptance remain open. The production site has not been updated.

## Live

- Existing production: https://www.deshengkong.com
- M1 local preview: http://127.0.0.1:3180 (this workstation only)
- M1 stable remote preview: not deployed yet
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

The user selected this workstation for the current M1 task. Dependencies are installed in this worktree only; never install through a junction pointing at the original checkout.

After the environment is selected and this worktree has its own dependencies:

```bash
npm ci
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm run start -- --hostname 127.0.0.1 --port 3180
```

To reopen an already built preview after a reboot, run the final command from this M1 directory, then open the local link. The background preview started during this task is temporary; its PID and build ID are recorded in `.next/m1-preview-process.json`. Closing a browser tab does not stop that process. Do not stop an unrelated process if port 3180 is already occupied.

Keep `docs/design/m0-portfolio-v2/` and `docs/design/m0-about-contact-v1/` as the visual references. Runtime UI uses React/HTML/CSS; concept illustrations are separate assets with [provenance](docs/design/m1-assets.json). Do not publish concept images as evidence of product operation.
