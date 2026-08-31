# M1 dependency correction

Date: 2026-08-31

The original draft used Next.js and eslint-config-next 16.1.6. Before running a server or publishing M1, the package manifests are updated to **16.3.3**. This is a targeted security correction within Next.js 16, not a framework migration or UI change. React and React DOM remain 19.2.3; do not confuse those package names with the separately affected react-server-dom packages.

Official evidence:

- [May 2026 coordinated security release](https://vercel.com/changelog/next-js-may-2026-security-release): Next 16.x through 16.2.5 is in the affected ranges; Vercel states patching is the complete mitigation.
- [August 2026 release](https://vercel.com/changelog/nextjs-august-2026-security-release): self-hosted Next 16.x should use 16.3.3, including the Windows-server fix. The Vercel-managed protection described for August's two issues does not certify older versions against every previous advisory.

Registry metadata confirmed next@16.3.3 and eslint-config-next@16.3.3 exist and accept Node >=20.9.0 and React ^19.0.0. The current Node is 24.16.0.

`npm install --package-lock-only --ignore-scripts --no-audit --no-fund` completed successfully. This updates the M1 manifest/lockfile without modifying the original site's installed dependencies. Preliminary static checks read 16.1.6 through a temporary junction, which has now been safely removed without deleting its target. M1 currently has no installed dependencies; it requires an isolated matching install before any build/server/runtime acceptance. Do not claim the installed runtime has been patched merely because the lockfile changed.

After the user selected the local environment, `npm ci --no-audit --no-fund` completed in the M1 worktree. The installed Next.js and eslint-config-next are both 16.3.3; React/React DOM remain 19.2.3. The directory is not a junction. Lint, TypeScript and the production build passed with the isolated installation. The loopback-only preview uses that production build. See [installed dependency evidence](../qa/m1-2026-08-31/installed-dependencies.json) and [build checks](../qa/m1-2026-08-31/local-build-checks.json).

The original checkout's installed Next.js remains 16.1.6 and was not modified or started by this task. Do not start that older original runtime when reviewing M1. The verified preview is `http://127.0.0.1:3180`, served from the separate M1 worktree. Remote deployment remains pending.
