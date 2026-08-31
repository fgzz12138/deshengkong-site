# Technical QA scope

Run `python qa/validate_bundle.py` from this bundle. Existing Python/Pillow and
Node/sharp/librsvg are used; no install, browser, server, account or network is
required. `NODE_PATH` may point at another existing sharp installation.

These are static About/Contact UI layout diagrams. All page text and graphics are
native SVG. The DK profile card is an intentional typographic composition, not a
photograph, generated portrait, or missing-photo placeholder. There are no raster
assets and no full-page PNG embedded in an SVG wrapper.

Acceptance here means **XML source editor round-trip + sharp/librsvg rendering**.
The editable master is serialized, parsed again, and rendered without changing
its pixels; a separate copy receives an actual native heading edit and semantic
group movement, is reopened, and produces changed pixels. The delivery master is
never modified by QA. Test copies under `roundtrip/` are evidence, not masters.

`svg-structure.json`, `render-evidence.json` and `roundtrip-evidence.json` record
actual native structure, canvas dimensions, file hashes and edit results.
`prior-bundle-guard.json` compares the prior approved master/build script with the
root-supplied pre-task hashes, read-only. `visual-review.json` separately records
actual rendered-image observations, bound to all five preview hashes. Required
visual checks remain `fail` until that review exists; structure alone is not a
claim that geometry is correct. `preflight-result.json` contains the result from
the existing unmodified visual-production-kit validator.

No Penpot/draw.io GUI import, native GUI editing or GUI reopening was performed.
Cross-machine font consistency is unverified. This bundle does not implement M1
navigation, contact submission, mobile responsiveness, or a running website.
