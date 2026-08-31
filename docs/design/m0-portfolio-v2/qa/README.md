# SVG QA scope

This bundle is a **static UI layout diagram** for the M0 visual direction. It is not
a runnable website, working portal, live API integration, or evidence that the
illustrated products are in production.

The single combined editable master is `../portfolio-master.svg`. The three
single-page SVG files are derivatives built by the same `../build_svg.py` source.
Native SVG text, semantic groups, rectangles, paths, and other geometry remain
editable. The seven complex concept illustrations are separate raster crops;
their internal pixels are not independently editable text or vectors. Each SVG
embeds its needed image bytes for portability, with source assets retained under
`../assets/` and source/crop hashes in `../asset-crops-spec.json`.

## Reproduction

Run `python qa/validate_svg.py` from the bundle directory. This uses existing
Python/Pillow and Node/sharp/librsvg dependencies. `NODE_PATH` may point at a
different already-installed sharp runtime; the default is this machine's bundled
Codex runtime. No install, development server, browser, account, or network request
is used. Successful SVG rendering records the actual versions in
`render-evidence.json`.

The native editing standard exercised here is **XML source editor round-trip +
sharp/librsvg rendering**. `roundtrip/portfolio-master-reopened.svg` is a serialized
and reopened copy. `roundtrip/portfolio-master-local-edit.svg` is a separate test
copy with a native project title changed and one named hero group moved. The
original master remains unchanged. Pixel comparisons test both the unchanged
round-trip and the actual local edit. Neither copy replaces the delivery master.

No Penpot/draw.io GUI import, GUI native editing, or GUI save/reopen has been
performed, and no such compatibility or editor acceptance is claimed. The runtime
route is the user's explicitly requested SVG source delivery; it is not a new
globally verified backend or a modification of the visual-production-kit gates.

## Evidence and acceptance

- `svg-structure.json`: dimensions/viewBox, native object counts, semantic groups,
  local/embedded asset verification, absence of full-page raster wrapping, native
  title/status copy, and unsafe/external executable reference checks.
- `crop-evidence.json`: retained crop hashes and, where sibling v1 sources exist,
  read-only original-source hash checks plus exact pixel comparison with the
  declared crop rectangles. These are subregions, not full-page image wrappers.
- `render-evidence.json`: actual full-size PNG renders and hashes.
- `roundtrip-evidence.json`: native edit, serialization/reopen, unchanged-master
  verification, and pixel comparisons, including explicit limits.
- `visual-review.json`: separately recorded reviewer observations of the current
  rendered PNGs. Structure alone does not prove overflow, overlap, orphan wrapping,
  or visual canvas correctness. Review hashes must match all six evidence PNGs.
- `qa-report.json`: full artifact-contract checks. Until the actual visual review
  is supplied for the current render hashes, the required checks remain `fail`
  with a pending-review explanation (the contract has no `pending` status).
- `preflight-result.json`: result from the existing, unmodified full bundle
  preflight. A green result validates bundle evidence completeness and integrity;
  it does not upgrade this artifact into a working web application.

The intended fonts use the authoring file's local font stack. Cross-device font
substitution can alter the rendered appearance. Illustrations are ImageGen concept
art, not real customer or production screenshots. Mobile is the deliberately
bounded homepage excerpt shown by the approved reference, with a visible page
continues annotation; it is not a claim of a complete mobile site.
