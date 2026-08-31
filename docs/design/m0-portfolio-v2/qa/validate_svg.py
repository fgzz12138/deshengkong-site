"""Local XML source-edit, SVG integrity and librsvg-render evidence.

This is a static UI layout diagram check, not website or GUI-editor acceptance.
Run from any directory: python path/to/qa/validate_svg.py
The only writes are qa/** and the two bundle manifests.
Visual review is separate: qa/visual-review.json must name the inspected PNG
hashes and explicitly pass the five contract checks before bundle acceptance.
"""
from __future__ import annotations

import base64
import copy
import hashlib
import io
import json
import os
import re
import subprocess
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote
from xml.etree import ElementTree as ET

from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
QA = ROOT / 'qa'
NS = 'http://www.w3.org/2000/svg'
XLINK = 'http://www.w3.org/1999/xlink'
ET.register_namespace('', NS)
ET.register_namespace('xlink', XLINK)
EXPECTED = {
    '01-home-desktop.svg': (1024, 1536),
    '02-case-study-desktop.svg': (1024, 1536),
    '03-home-mobile.svg': (853, 1844),
}
RULES = ['editable-master-reopened', 'text-overflow-reviewed',
         'unexpected-overlap-reviewed', 'orphan-wrap-reviewed', 'canvas-ratio-reviewed']


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def relative(path):
    return path.relative_to(ROOT).as_posix()


def local(tag):
    return tag.rsplit('}', 1)[-1]


def number(value):
    return float(re.sub(r'px$', '', value or '0'))


def image_metadata(blob):
    with Image.open(io.BytesIO(blob)) as image:
        image.load()
        return {'width': image.width, 'height': image.height, 'format': image.format}


def inspect_svg(path):
    raw = path.read_text(encoding='utf-8')
    tree = ET.fromstring(raw)
    errors = []
    width, height = number(tree.get('width')), number(tree.get('height'))
    vb = [float(v) for v in re.split(r'[ ,]+', tree.get('viewBox', '').strip())]
    if local(tree.tag) != 'svg': errors.append('Root element is not SVG.')
    if vb != [0, 0, width, height]: errors.append('viewBox differs from root dimensions.')
    if path.name in EXPECTED and (width, height) != EXPECTED[path.name]:
        errors.append(f'Dimensions differ from expected {EXPECTED[path.name]}.')
    counts = Counter(local(e.tag) for e in tree.iter())
    nested_canvases = [{'id': e.get('id'), 'x': number(e.get('x')), 'y': number(e.get('y')),
                        'width': number(e.get('width')), 'height': number(e.get('height')),
                        'viewBox': e.get('viewBox')}
                       for e in tree.iter() if e is not tree and local(e.tag) == 'svg']
    if path.name == 'portfolio-master.svg':
        actual = [(e['width'], e['height']) for e in nested_canvases]
        if actual != list(EXPECTED.values()):
            errors.append('Combined master does not retain the three original-sized page canvases in order.')
    ids = [e.get('id') for e in tree.iter() if e.get('id')]
    duplicates = [key for key, count in Counter(ids).items() if count > 1]
    if duplicates: errors.append('Duplicate IDs: ' + ', '.join(duplicates))
    id_set = set(ids)
    images, security, semantic_groups = [], [], []
    for element in tree.iter():
        tag = local(element.tag)
        if tag.lower() in ('script', 'foreignobject'):
            security.append(f'Forbidden executable/container element: {tag}')
        if element.get('data-semantic-role'):
            semantic_groups.append({'id': element.get('id'), 'role': element.get('data-semantic-role')})
        for key, value in element.attrib.items():
            attr = local(key).lower()
            if attr.startswith('on'):
                security.append(f'Event-handler attribute: {key}')
            if attr in ('href', 'src') and tag != 'image':
                if value and not value.startswith('#'):
                    security.append(f'Nonlocal executable/navigation reference on {tag}: {value[:160]}')
            for reference in re.findall(r'url\(\s*[\'\"]?([^\)\'\"]+)', value):
                if not reference.startswith('#'):
                    security.append(f'Nonlocal CSS URL: {reference[:160]}')
                elif reference[1:] not in id_set:
                    errors.append(f'Unresolved local reference: {reference}')
        if tag == 'style':
            css = ''.join(element.itertext())
            if '@import' in css.lower() or re.search(r'url\(\s*[\'\"]?(?!#)', css):
                security.append('External or nonlocal CSS resource in style element.')
        if tag != 'image': continue
        href = element.get(f'{{{XLINK}}}href') or element.get('href') or ''
        record = {'id': element.get('id'), 'x': number(element.get('x')),
                  'y': number(element.get('y')), 'width': number(element.get('width')),
                  'height': number(element.get('height')), 'source_asset': element.get('data-source-asset')}
        if href.startswith('data:image/png;base64,') or href.startswith('data:image/jpeg;base64,'):
            record['storage'] = 'embedded data image'
            try:
                blob = base64.b64decode(href.split(',', 1)[1], validate=True)
                record['raster'] = image_metadata(blob)
                record['embedded_sha256'] = hashlib.sha256(blob).hexdigest()
            except Exception as exc:
                errors.append(f'Invalid embedded raster {record["id"]}: {exc}')
        elif href and not re.match(r'(?i)(?:[a-z][a-z0-9+.-]*:|//|/)', href):
            asset = (path.parent / unquote(href)).resolve()
            if not asset.is_relative_to(ROOT) or not asset.is_file():
                errors.append(f'Missing or escaping image reference {href}')
            else:
                record['storage'] = 'relative local asset'
                record['raster'] = image_metadata(asset.read_bytes())
                record['source_sha256'] = sha(asset)
        else:
            security.append(f'Forbidden external/unsupported image reference: {href[:160]}')
        source = record['source_asset']
        if source:
            asset = (ROOT / source).resolve()
            if not asset.is_relative_to(ROOT) or not asset.is_file():
                errors.append(f'Unavailable source asset: {source}')
            elif record.get('embedded_sha256') != sha(asset):
                errors.append(f'Embedded bytes differ from declared source: {source}')
        # Full page raster detection is an explicit structural guard, not geometry QA.
        near_full_canvas = record['width'] >= .9 * width and record['height'] >= .9 * height
        if near_full_canvas: errors.append(f'Full-page raster detected: {record["id"]}')
        record['near_full_canvas_raster'] = near_full_canvas
        images.append(record)
    if '<!DOCTYPE' in raw.upper() or '<!ENTITY' in raw.upper():
        security.append('DTD/entity declarations are not allowed.')
    errors.extend(security)
    if counts['text'] < 10 or counts['g'] < 3 or counts['rect'] < 5:
        errors.append('Insufficient native text/groups/geometry for an editable UI diagram.')
    if not semantic_groups: errors.append('No semantic groups found.')
    visible = ' '.join(' '.join(e.itertext()) for e in tree.iter() if local(e.tag) == 'text')
    text_check = {
        'corrected_portal_title_present': bool(re.search(r'UAI API\s+Customer Portal', visible)),
        'demo_badge_present': bool(re.search(r'\bDEMO\b', visible)),
        'in_development_badge_present': 'IN DEVELOPMENT' in visible or 'IN-DEVELOPMENT' in visible,
        'native_visible_text': visible,
    }
    if not text_check['corrected_portal_title_present']:
        errors.append('Corrected native UAI API Customer Portal title missing.')
    if not text_check['demo_badge_present']: errors.append('DEMO status is missing.')
    if path.name == '01-home-desktop.svg' and not text_check['in_development_badge_present']:
        errors.append('IN DEVELOPMENT status is missing from desktop overview.')
    return {'path': relative(path), 'sha256': sha(path), 'dimensions': [width, height],
            'viewBox': vb, 'nested_canvases': nested_canvases, 'element_counts': dict(counts), 'semantic_groups': semantic_groups,
            'images': images, 'self_contained_images': all(i.get('storage') == 'embedded data image' for i in images),
            'security_findings': security, 'text_checks': text_check,
            'status': 'pass' if not errors else 'fail', 'errors': errors}


def render(path, output):
    env = dict(os.environ)
    if not env.get('NODE_PATH'):
        env['NODE_PATH'] = r'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules'
    result = subprocess.run(['node', str(QA / 'render_svg.cjs'), str(path), str(output)],
                            env=env, capture_output=True, text=True, check=True)
    evidence = json.loads(result.stdout)
    evidence['input'] = relative(path)
    evidence['output'] = relative(output)
    evidence['input_sha256'] = sha(path)
    evidence['output_sha256'] = sha(output)
    return evidence


def inspect_crop_assets():
    spec = json.loads((ROOT / 'asset-crops-spec.json').read_text(encoding='utf-8'))
    checks = []
    errors = []
    for asset in spec['assets']:
        crop_path = (ROOT / asset['file']).resolve()
        source_path = (ROOT / asset['source']).resolve()
        box = asset['crop_box_xyxy']
        record = {'asset': asset['file'], 'source_reference': asset['source'], 'crop_box_xyxy': box,
                  'crop_sha256_matches': crop_path.is_file() and sha(crop_path) == asset['sha256'],
                  'source_read_only': True}
        if not crop_path.is_relative_to(ROOT) or not record['crop_sha256_matches']:
            errors.append('Missing, escaping, or hash-mismatched crop: ' + asset['file'])
        if source_path.is_file():
            source_before = sha(source_path)
            with Image.open(source_path) as source, Image.open(crop_path) as actual:
                expected = source.crop(box).convert('RGBA')
                actual_rgba = actual.convert('RGBA')
                record['source_dimensions'] = list(source.size)
                record['crop_dimensions'] = list(actual.size)
                record['crop_is_subregion'] = box != [0, 0, source.width, source.height]
                record['crop_pixels_match_source_region'] = (expected.size == actual_rgba.size and
                                                               expected.tobytes() == actual_rgba.tobytes())
            record['source_sha256_matches_spec'] = source_before == asset['source_sha256']
            record['source_unchanged_during_check'] = sha(source_path) == source_before
            if not all(record[key] for key in ('crop_is_subregion', 'crop_pixels_match_source_region',
                                               'source_sha256_matches_spec', 'source_unchanged_during_check')):
                errors.append('Crop provenance check failed: ' + asset['file'])
        else:
            record['source_verification'] = 'Original v1 reference is absent in this relocated copy; asset bytes remain self-contained and hash-checked.'
        checks.append(record)
    return {'status': 'pass' if not errors else 'fail', 'assets': checks, 'errors': errors,
            'limits': 'Sources are read-only provenance references outside the v2 bundle; live SVG display needs only embedded bytes. Regeneration from original crops needs the sibling v1 references.'}


def pixel_diff(a, b):
    with Image.open(a) as im_a, Image.open(b) as im_b:
        if im_a.size != im_b.size: return {'same_size': False, 'identical': False}
        delta = ImageChops.difference(im_a.convert('RGB'), im_b.convert('RGB'))
        bbox = delta.getbbox()
        red, green, blue = delta.split()
        strongest = ImageChops.lighter(ImageChops.lighter(red, green), blue)
        changed = im_a.width * im_a.height - strongest.histogram()[0]
        return {'same_size': True, 'identical': bbox is None, 'changed_pixels': changed,
                'changed_bbox_xyxy': list(bbox) if bbox else None}


def round_trip(master, original_preview):
    original_sha = sha(master)
    tree = ET.parse(master)
    reopened = QA / 'roundtrip' / 'portfolio-master-reopened.svg'
    reopened.parent.mkdir(parents=True, exist_ok=True)
    tree.write(reopened, encoding='utf-8', xml_declaration=True)
    reopen_tree = ET.parse(reopened)
    before_counts = Counter(local(e.tag) for e in tree.getroot().iter())
    after_counts = Counter(local(e.tag) for e in reopen_tree.getroot().iter())
    reopen_preview = QA / 'previews' / 'portfolio-master-reopened.png'
    reopen_render = render(reopened, reopen_preview)
    edited_tree = copy.deepcopy(reopen_tree)
    edited_root = edited_tree.getroot()
    text_node = next((e for e in edited_root.iter()
                      if local(e.tag) in ('text', 'tspan') and e.text and 'Customer Portal' in e.text), None)
    group = next((e for e in edited_root.iter()
                  if local(e.tag) == 'g' and 'hero-copy-and-actions' in e.get('data-semantic-role', '')), None)
    if text_node is None or group is None:
        raise RuntimeError('No native title or named hero semantic group available for real edit test.')
    before_text = text_node.text
    text_node.text = before_text.replace('Customer Portal', 'Customer Portal [QA EDIT]')
    before_transform = group.get('transform', '')
    group.set('transform', 'translate(12 6)' + (' ' + before_transform if before_transform else ''))
    edited = QA / 'roundtrip' / 'portfolio-master-local-edit.svg'
    edited_tree.write(edited, encoding='utf-8', xml_declaration=True)
    ET.parse(edited)
    edited_preview = QA / 'previews' / 'portfolio-master-local-edit.png'
    edited_render = render(edited, edited_preview)
    unchanged_diff = pixel_diff(original_preview, reopen_preview)
    edited_diff = pixel_diff(reopen_preview, edited_preview)
    pass_ = before_counts == after_counts and unchanged_diff['identical'] and not edited_diff['identical'] and sha(master) == original_sha
    return {'status': 'pass' if pass_ else 'fail',
            'method': 'XML source editor round-trip + sharp/librsvg rendering',
            'purpose': 'Static UI layout diagram with native editable SVG text/groups/geometry.',
            'master_was_not_modified': sha(master) == original_sha,
            'native_counts_retained': before_counts == after_counts,
            'reopened_svg': relative(reopened), 'edited_svg': relative(edited),
            'visible_title_edit': {'before': before_text, 'after': text_node.text},
            'semantic_group_move': {'id': group.get('id'), 'role': group.get('data-semantic-role'),
                                    'before_transform': before_transform, 'after_transform': group.get('transform')},
            'unchanged_roundtrip_pixel_comparison': unchanged_diff,
            'local_edit_pixel_comparison': edited_diff,
            'renders': [reopen_render, edited_render],
            'limits': ['No Penpot/draw.io GUI import, GUI editing, or GUI reopen was tested.',
                       'The changed copy is an intentionally altered QA probe, not a delivery master.',
                       'SVG structure and pixel-difference evidence are not overflow/overlap review.',
                       'Embedded concept illustrations remain replaceable raster assets; their internal pixels are not native objects.']}


def manifests(previews):
    assets = []
    if (ROOT / 'assets').exists():
        for path in sorted((ROOT / 'assets').rglob('*')):
            if not path.is_file(): continue
            provenance = ('Local separated crop of immutable v1 ImageGen M0 reference. Cropped/read-only source; '
                          'generated concept illustration, not a product screenshot. See asset-crops-spec.json '
                          'for source/crop coordinates and hashes. Embedded image bytes checked against this asset.')
            if path.suffix.lower() == '.json':
                provenance = 'Locally generated crop/source provenance from the SVG authoring workflow.'
            assets.append({'id': 'asset-' + path.stem, 'role': 'replaceable concept illustration' if path.suffix.lower() == '.png' else 'source provenance',
                           'path': relative(path), 'provenance': provenance})
    for path in sorted(ROOT.iterdir()):
        if not path.is_file() or path.name in ('artifact-manifest.json', 'assets-manifest.json'): continue
        if path.suffix.lower() not in ('.py', '.json', '.md'): continue
        assets.append({'id': 'source-' + path.stem, 'role': 'authoring source or approved design/stage contract',
                       'path': relative(path), 'provenance': 'Local versioned authoring source/contract for this M0 static UI layout diagram; use actual source notes for approval boundaries.'})
    for name in EXPECTED:
        path = ROOT / name
        if path.exists():
            assets.append({'id': 'derived-' + path.stem, 'role': 'single-page editable derivative of the combined master',
                           'path': name, 'provenance': 'Locally generated by the same build_svg.py as portfolio-master.svg; not an independent approved master.'})
    write_json(ROOT / 'assets-manifest.json', {'schema_version': '1.0.0', 'assets': assets})
    write_json(ROOT / 'artifact-manifest.json', {'schema_version': '1.0.0',
        'artifact_id': 'deshengkong-site-m0-portfolio-v2', 'artifact_type': 'diagram',
        'delivery_mode': 'editable', 'explicit_raster_only_request': False,
        'master': {'path': 'portfolio-master.svg', 'format': 'svg'},
        'previews': [{'path': relative(path), 'format': 'png'} for path in previews],
        'assets_manifest': 'assets-manifest.json', 'qa_report': 'qa/qa-report.json'})


def main():
    source_paths = [ROOT / name for name in EXPECTED] + [ROOT / 'portfolio-master.svg']
    missing = [p.name for p in source_paths if not p.is_file()]
    if missing: raise SystemExit('Waiting for complete authored SVG set: ' + ', '.join(missing))
    timestamp = datetime.now(timezone.utc).isoformat()
    structures = [inspect_svg(path) for path in source_paths]
    write_json(QA / 'svg-structure.json', {'checked_at_utc': timestamp, 'files': structures})
    crops = inspect_crop_assets()
    write_json(QA / 'crop-evidence.json', crops)
    if crops['status'] != 'pass':
        raise SystemExit('Crop provenance validation failed. See qa/crop-evidence.json.')
    if any(x['status'] == 'fail' for x in structures):
        raise SystemExit('SVG structural validation failed. See qa/svg-structure.json; no rendering of unsafe SVG.')
    renders, previews = [], []
    for path in source_paths:
        preview = QA / 'previews' / (path.stem + '.png')
        renders.append(render(path, preview))
        previews.append(preview)
    write_json(QA / 'render-evidence.json', {'checked_at_utc': timestamp, 'renders': renders})
    roundtrip = round_trip(ROOT / 'portfolio-master.svg', QA / 'previews' / 'portfolio-master.png')
    write_json(QA / 'roundtrip-evidence.json', roundtrip)
    review_path = QA / 'visual-review.json'
    review = json.loads(review_path.read_text(encoding='utf-8')) if review_path.exists() else {}
    checks = []
    expected_hashes = {r['output']: r['output_sha256'] for r in renders + roundtrip['renders']}
    review_hashes = review.get('preview_sha256', {})
    fresh_review = bool(expected_hashes) and all(review_hashes.get(p) == h for p, h in expected_hashes.items())
    for rule in RULES:
        record = review.get('checks', {}).get(rule, {})
        good = fresh_review and record.get('status') == 'pass'
        if rule == 'editable-master-reopened': good = good and roundtrip['status'] == 'pass'
        checks.append({'id': rule, 'status': 'pass' if good else 'fail',
                       'evidence': record.get('evidence') if good else
                       'Pending actual visual/reopen review of current PNG hashes. See qa/render-evidence.json and qa/roundtrip-evidence.json. XML structure alone is not this check.'})
    checks.extend([
        {'id': 'native-svg-structure-security', 'status': 'pass', 'evidence': 'qa/svg-structure.json'},
        {'id': 'local-crop-provenance', 'status': crops['status'], 'evidence': 'qa/crop-evidence.json'},
        {'id': 'xml-native-edit-roundtrip', 'status': roundtrip['status'], 'evidence': 'qa/roundtrip-evidence.json'},
    ])
    write_json(QA / 'qa-report.json', {'schema_version': '1.0.0', 'checks': checks})
    manifests(previews)
    print(json.dumps({'structure': 'pass', 'renders': len(renders), 'roundtrip': roundtrip['status'],
                      'visual_review_current': fresh_review, 'contract_checks': {x['id']: x['status'] for x in checks}}, indent=2))


if __name__ == '__main__':
    main()
