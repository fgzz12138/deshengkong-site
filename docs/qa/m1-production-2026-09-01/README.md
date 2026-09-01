# M1 production release evidence — 2026-09-01

## Scope and approval

The user explicitly authorised promotion of the approved M1 homepage and updated CV to the current production site. This release did not change the approved UI, project facts, contact behavior, hosting provider or deployment-protection policy.

## Git safety and rollback

- Candidate worktree: clean `codex/personal-site-m1` at `44d05488beb7e1e0fb3e7b23e308e13addc347ab`.
- Pre-release remote: `origin/main` at `8bbc53e5d710c5a8bf81e433e6a74a35f18b4105`.
- Relationship: `origin/main` was the candidate's merge base and direct ancestor; `0 behind / 12 ahead`.
- Promotion: explicit fast-forward push from the clean M1 worktree to GitHub `main`; no merge commit or force push.
- The original `E:\gitclone\deshengkong-site` main worktree had unrelated tracked and untracked changes and was not modified.
- Primary rollback anchor: previous immutable Vercel production deployment `dpl_8Yfsm7janYL8nMiLU8RPakv96UHa`.
- Additional local rollback evidence under ignored `.vercel/production-backups/`: archive of the previous `main` tree plus deployment, alias and CV-hash metadata.

## Preflight

- `npx eslint app next.config.ts`: pass.
- `npx tsc --noEmit --incremental false`: pass.
- Candidate worktree: clean.
- Git worktree/common-dir lock scan: no lock files.
- Old production homepage and CV: HTTP 200 before cutover.
- Old production CV: 77,678 bytes, SHA-256 `BA933934FDE5249EC88A833E6994CCF99B5ABF9DD1DE291B872BE608B7010B26`.

## Initial production deployment

- Deployment: `dpl_Erj8RFmJkYVaWxWWTAPJQ3BASwfY`.
- State: `READY`.
- Target: `production`.
- Initial deployment URL: `https://deshengkong-site-f4423bnz3-fgzz12138s-projects.vercel.app`.
- Aliases attached: `www.deshengkong.com`, `deshengkong.com`, the stable project alias and the Git-main alias.
- Public surface: `www` returns HTTP 200; apex redirects to `www`; Vercel-owned aliases keep existing SSO protection.

## Production acceptance

Anonymous HTTP checks passed for:

- `/`
- `/about`
- `/contact`
- `/projects/virtual-concierge`
- `/projects/uai-api-customer-portal`

The production browser review confirmed the approved wide desktop layout, `AI systems. Built for real work.`, the four selected-work cards, the contact page and the `Download CV / Resume PDF` entry. No Vercel login interstitial appears on the custom production domain.

The CV link was clicked in the production browser. The downloaded file at `C:\Users\Administrator\Downloads\Desheng_Kong_CV (1).pdf` was 77,154 bytes with SHA-256:

```text
A5962742C8A7A2D97F27C43354B1E002635FFA595204AA9B7939CF742F5D1813
```

That hash exactly matches `public/Desheng_Kong_CV.pdf` and the independently downloaded production asset.

## Remaining check

Physical-keyboard confirmation of the full image-dialog Tab cycle remains open. Existing modal, fallback, Enter, Escape, route, resource and responsive evidence is unchanged.
