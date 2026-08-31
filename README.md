# Desheng Kong — Portfolio (Next.js)

Personal portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.
The M1 upgrade implements the approved portfolio, About and contact designs, with four featured cases and the existing project archive.

M1 has an independent [Vercel Preview](https://deshengkong-site-8x2pu57c6-fgzz12138s-projects.vercel.app). Existing Vercel login protection is retained; a signed-in authorised browser is required. The latest change removes duplicate hover underlines on three bordered links. The local service has recovered, and real mobile hover checks confirm the fix locally as well as online; production and aliases are unchanged. See [the active workflow](docs/workflows/m1-portfolio-workflow-v3.md) and [current evidence](docs/qa/m1-link-hover-2026-08-31/README.md). Final user acceptance and physical confirmation of the full dialog Tab cycle remain open.

## Live

- Existing production: https://www.deshengkong.com
- M1 local preview: http://127.0.0.1:3180 (running on this workstation)
- M1 stable remote preview: https://deshengkong-site-8x2pu57c6-fgzz12138s-projects.vercel.app (existing Vercel login required)
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

The commands above build a normal Windows development-review artifact. The current release artifact is instead the Ubuntu WSL build under `.vercel/linux-build`. The local service is now running; its earlier blocked background restart is retained as history in the QA record. If it is stopped later, run `wsl -d Ubuntu --exec sh /mnt/e/gitclone/deshengkong-site-m1/.vercel/run-linux-preview.sh` from PowerShell and keep that terminal open. Current local process status and build ID are recorded in `.next/m1-preview-process.json`. Do not start a duplicate server or stop an unrelated process if port 3180 is occupied. The remote Preview does not need this workstation to stay online.

Keep `docs/design/m0-portfolio-v2/` and `docs/design/m0-about-contact-v1/` as the visual references. Runtime UI uses React/HTML/CSS; concept illustrations are separate assets with [provenance](docs/design/m1-assets.json). Do not publish concept images as evidence of product operation.
