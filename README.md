# Desheng Kong — Portfolio (Next.js)

Personal portfolio website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.
The M1 upgrade implements the approved portfolio, About and contact designs, with four featured cases and the existing project archive.

M1 is live in production at [www.deshengkong.com](https://www.deshengkong.com). The portfolio CV now matches the current LinkedIn role history, uses a tracked PDF generator and has passed single-page rendering, text extraction, embedded-font and real production-download checks. The protected independent Preview remains available to authorised Vercel users. See [the active workflow](docs/workflows/m1-portfolio-workflow-v3.md), [production evidence](docs/qa/m1-production-2026-09-01/README.md), [CV evidence](docs/qa/cv-update-2026-09-01/README.md) and [hover evidence](docs/qa/m1-link-hover-2026-08-31/README.md). Physical confirmation of the full dialog Tab cycle remains open.

## Live

- M1 production: https://www.deshengkong.com
- Production contact and CV: https://www.deshengkong.com/contact and https://www.deshengkong.com/Desheng_Kong_CV.pdf
- M1 local preview: http://127.0.0.1:3180 (stopped at the CV update checkpoint; use the command below when needed)
- M1 stable remote preview: https://deshengkong-site-9h6duaud5-fgzz12138s-projects.vercel.app (existing Vercel login required)
- Vercel project: `fgzz12138s-projects/deshengkong-site`; GitHub `main` is the production branch.

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

The commands above build a normal Windows development-review artifact. The current release artifact is instead the Ubuntu WSL build under `.vercel/linux-build`. The local service was not listening at the CV update checkpoint. To run it, use `wsl -d Ubuntu --exec sh /mnt/e/gitclone/deshengkong-site-m1/.vercel/run-linux-preview.sh` from PowerShell and keep that terminal open. Check port 3180 before starting so an existing process is not duplicated or interrupted. The remote Preview does not need this workstation to stay online.

Keep `docs/design/m0-portfolio-v2/` and `docs/design/m0-about-contact-v1/` as the visual references. Runtime UI uses React/HTML/CSS; concept illustrations are separate assets with [provenance](docs/design/m1-assets.json). Do not publish concept images as evidence of product operation.
