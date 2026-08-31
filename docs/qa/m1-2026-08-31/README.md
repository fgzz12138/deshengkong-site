# M1 local review and acceptance evidence

Date: 2026-08-31. Scope: **Personal**. Branch: `codex/personal-site-m1`.

## Open the current version

- Home: http://127.0.0.1:3180/
- About: http://127.0.0.1:3180/about
- Get in touch: http://127.0.0.1:3180/contact
- Featured portal case: http://127.0.0.1:3180/projects/uai-api-customer-portal

The user explicitly selected this workstation. The temporary server binds only to 127.0.0.1 and uses the production build, without GPU, Docker, production-domain changes or a hosting migration. Its current PID is in `.next/m1-preview-process.json`. This URL requires the preview process on this computer; it is **not** the independent remote Preview required for full M1 delivery.

Current build ID: `hZqpohBpUeWN8UoSwhLrU`.

## Verified

- Isolated `npm ci` completed. Installed Next.js / eslint-config-next **16.3.3**, React / React DOM 19.2.3. No dependency junction remains: [versions](installed-dependencies.json).
- ESLint, TypeScript and production build exited 0 on the final source: [checks](local-build-checks.json), [build output](build.txt), [lint output](eslint-patched.txt), [TypeScript output](typescript-patched.txt).
- HTTP checks on this build covered 19 pages, 54 resources including the PDF CV, 13 JS/CSS resources, three 404 cases, two redirects and robots/sitemap. Resource bytes match local hashes. See the two-round [HTTP evidence](route-http-evidence.json), including the server-HTML limitation below.
- All twelve original project URLs are retained, plus the three new featured URLs (fifteen projects total). EziSight's seven case-sensitive image references were corrected to match disk names for future Linux hosting.
- Four primary page types were captured at 320, 390, 768, 1024 and 1440 requested CSS widths. All twenty measurements have one main element, no horizontal overflow and no failed images: [metrics](responsive-layout.json), [screenshots](screenshots/).
- Home, About/contact and the portal case retain the approved M0 composition. Homepage spacing and title tracking were calibrated against the SVG; all four cards remain on mobile. Fonts, icons, wrapping and touch-target spacing are browser/responsive adaptations, not a claim of pixel identity with the generated references.
- An independent visual reviewer inspected eleven screenshots across four pages and the requested small/tablet/desktop widths against all five M0 references. No visual blocker, clipped text or unintended overlap was found. This review does not replace interaction acceptance.
- Mobile menu opens/closes, Escape closes it and returns focus to the toggle, About navigation closes it, and the unknown-project page hydrates to the full recovery screen with a working project-collection link: [browser observations](browser-actions.json).
- The separate portal demo loaded with DEMO DATA visible in a read-only destination check: [record](portal-link.json). No external messages or portal data changes were made.
- Original draft: all fifteen scoped paths remain unchanged: [preservation](original-preservation.json). Its old installed dependencies also remain untouched.
- Local build files have hashes: [artifact manifest](build-artifact-manifest.json). These are ordinary `.next` files, not Vercel `.vercel/output`, and have not been verified against a remote deployment.

## Control/result coverage and remaining limits

| Control / state | Result |
| --- | --- |
| Brand, Work, About, contact, collection and case destinations | Implemented; routes/resources and main navigation inspected |
| Mobile toggle, Escape and About selection | Browser behavior verified |
| Closed mobile navigation | `hidden` state verified; native Tab traversal remains inconclusive in this browser driver |
| Native Enter activation / full keyboard traversal | Inconclusive automation; not recorded as passed; separate keyboard confirmation remains open |
| Unknown project | HTTP404 and browser recovery passed; original HTML recovery content absent before hydration, so no-JS recovery is a known limitation |
| CV | PDF response and exact bytes verified; original contents retained, currency not certified |
| Gmail / LinkedIn / GitHub | Correct destinations and new-tab behavior inspected in markup; no message sent; external compose/account behavior is not claimed as end-to-end tested |
| Missing-image fallback | Source reviewed and compact text corrected; network-failure behavior not forced in this run |
| Historical screenshot zoom controls | Original behavior retained; not a complete per-control keyboard/modal audit |
| Remote preview | Not deployed; public access and same-artifact parity still pending |

## Preserved earlier evidence

`static-check-context.json`, `eslint.txt`, `typescript.txt` and `diff-check.txt` are the earlier source-only checks using the temporary original-dependency junction. Their pending-build statements describe that earlier step, not this later verified local build. The junction was removed before the isolated install. `eslint-diagnostic.txt` records a successful targeted check used while confirming the main check process had completed.

M1 remains IN_PROGRESS until remaining interaction checks, an independent stable Preview, and user acceptance are complete. The local review link is available now; the production website has not been updated.
