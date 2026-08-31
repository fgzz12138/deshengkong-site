"""Local QA for a static, source-editable About/Contact SVG layout diagram.

Writes only qa/** and the two bundle manifests. Uses existing local Node/sharp
and Python/Pillow. No browser, devserver, GUI design editor, account or network.
Visual checks remain fail until a real current-hash review is recorded.
"""
from __future__ import annotations
import copy
import hashlib
import json
import os
import re
import subprocess
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parent.parent
QA = ROOT / 'qa'
PAGES = {'01-about-desktop.svg': (1024, 1536), '02-contact-desktop.svg': (1024, 1536)}
MASTER = 'about-contact-master.svg'
EXPECTED = {**PAGES, MASTER: (2112, 1536)}
RULES = ['editable-master-reopened', 'text-overflow-reviewed', 'unexpected-overlap-reviewed',
         'orphan-wrap-reviewed', 'canvas-ratio-reviewed']
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
ET.register_namespace('xlink', 'http://www.w3.org/1999/xlink')


def write(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, ensure_ascii=False) + '\n', encoding='utf-8', newline='\n')


def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
def rel(path): return path.relative_to(ROOT).as_posix()
def tag(element): return element.tag.rsplit('}', 1)[-1]
def num(value): return float(re.sub(r'px$', '', value or '0'))


def inspect(path):
    raw = path.read_text(encoding='utf-8')
    if '<!DOCTYPE' in raw.upper() or '<!ENTITY' in raw.upper():
        raise ValueError('DTD/entity declarations are not allowed.')
    root = ET.fromstring(raw)
    counts = Counter(tag(e) for e in root.iter())
    width, height = num(root.get('width')), num(root.get('height'))
    viewbox = [float(n) for n in re.split('[ ,]+', root.get('viewBox', '').strip())]
    ids = [e.get('id') for e in root.iter() if e.get('id')]
    id_set = set(ids)
    groups = [e.get('id') for e in root.iter() if tag(e) == 'g' and e.get('data-semantic-role')]
    errors = []
    if tag(root) != 'svg' or (width, height) != EXPECTED[path.name]: errors.append('Incorrect root/canvas dimensions.')
    if viewbox != [0, 0, width, height]: errors.append('Incorrect viewBox.')
    if len(ids) != len(id_set): errors.append('Duplicate IDs.')
    if counts['text'] < 8 or counts['rect'] < 4 or len(groups) < 2: errors.append('Insufficient native text/geometry/semantic structure.')
    if counts['image'] != 0: errors.append('Unexpected raster image: this approved route is entirely native SVG.')
    for e in root.iter():
        if tag(e).lower() in ('script', 'foreignobject'): errors.append('Executable/container element: ' + tag(e))
        for key, value in e.attrib.items():
            attr = key.rsplit('}', 1)[-1].lower()
            if attr.startswith('on'): errors.append('Event handler: ' + key)
            if attr in ('href', 'src') and value and not value.startswith('#'):
                errors.append('Nonlocal executable/resource reference: ' + value[:120])
            for reference in re.findall(r'url\(\s*[\'\"]?([^\)\'\"]+)', value):
                if not reference.startswith('#') or reference[1:] not in id_set:
                    errors.append('Unresolved or external URL reference: ' + reference[:120])
        if tag(e) == 'style':
            css = ''.join(e.itertext())
            if '@import' in css.lower() or 'url(' in css.lower(): errors.append('External/resource CSS is not required by this native-only bundle.')
    canvases = [{'id':e.get('id'), 'width':num(e.get('width')), 'height':num(e.get('height')),
                 'viewBox':e.get('viewBox'), 'x':num(e.get('x')), 'y':num(e.get('y'))}
                for e in root.iter() if e is not root and tag(e) == 'svg']
    if path.name == MASTER and [(e['width'], e['height']) for e in canvases] != list(PAGES.values()):
        errors.append('Master does not retain the original two page canvases.')
    return {'file':path.name, 'sha256':sha(path), 'dimensions':[width,height], 'viewBox':viewbox,
            'element_counts':dict(counts), 'semantic_group_ids':groups, 'nested_canvases':canvases,
            'all_objects_native':counts['image']==0, 'full_page_raster_wrapping':False if counts['image']==0 else 'not verified',
            'visible_native_text':' '.join(' '.join(e.itertext()) for e in root.iter() if tag(e)=='text'),
            'status':'pass' if not errors else 'fail', 'errors':errors}


def render(path):
    dest = QA/'previews'/(path.stem+'.png')
    env = dict(os.environ)
    env.setdefault('NODE_PATH', r'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules')
    result = subprocess.run(['node',str(QA/'render.cjs'),str(path),str(dest)], env=env,
                            capture_output=True,text=True,check=True)
    return {'input':rel(path),'input_sha256':sha(path),'output':rel(dest),'output_sha256':sha(dest),
            **json.loads(result.stdout)}


def pixels(first, second):
    with Image.open(first) as a, Image.open(second) as b:
        if a.size != b.size: return {'identical':False,'same_size':False}
        delta = ImageChops.difference(a.convert('RGB'), b.convert('RGB'))
        r,g,b = delta.split()
        maximum = ImageChops.lighter(ImageChops.lighter(r,g),b)
        changed = a.width*a.height - maximum.histogram()[0]
        return {'same_size':True,'identical':changed==0,'changed_pixels':changed,'bbox_xyxy':delta.getbbox()}


def roundtrip(original_render):
    master = ROOT/MASTER
    original_sha = sha(master)
    tree = ET.parse(master)
    folder = QA/'roundtrip'; folder.mkdir(parents=True,exist_ok=True)
    reopened = folder/'about-contact-master-reopened.svg'
    tree.write(reopened,encoding='utf-8',xml_declaration=True)
    reopened_tree = ET.parse(reopened)
    same_counts = Counter(tag(e) for e in tree.getroot().iter()) == Counter(tag(e) for e in reopened_tree.getroot().iter())
    reopen_render = render(reopened)
    edited_tree = copy.deepcopy(reopened_tree)
    candidates = [e for e in edited_tree.getroot().iter() if tag(e)=='g' and e.get('data-semantic-role')
                  and not any(k in e.get('data-semantic-role','').lower() for k in ('navigation','footer'))
                  and any(tag(c)=='text' for c in e.iter())]
    group = next((e for e in candidates if 'hero' in e.get('data-semantic-role','').lower()), candidates[0])
    texts = [e for e in group.iter() if tag(e)=='text' and ''.join(e.itertext()).strip()]
    heading = max(texts, key=lambda e:num(e.get('font-size')))
    leaf = next(e for e in heading.iter() if tag(e) in ('text','tspan') and e.text and e.text.strip())
    before = leaf.text
    leaf.text = before.replace('interfaces', 'ideas') if 'interfaces' in before else 'QA ' + before
    before_transform = group.get('transform','')
    group.set('transform','translate(12 6)' + (' '+before_transform if before_transform else ''))
    edited = folder/'about-contact-master-local-edit.svg'
    edited_tree.write(edited,encoding='utf-8',xml_declaration=True)
    ET.parse(edited)
    edit_render = render(edited)
    same = pixels(ROOT/original_render['output'],ROOT/reopen_render['output'])
    changed = pixels(ROOT/reopen_render['output'],ROOT/edit_render['output'])
    unchanged_master = sha(master)==original_sha
    passed = same_counts and same['identical'] and not changed['identical'] and unchanged_master
    return {'status':'pass' if passed else 'fail', 'method':'XML source editor round-trip + sharp/librsvg rendering',
            'native_counts_retained':same_counts,'master_was_not_modified':unchanged_master,
            'native_title_edit':{'before':before,'after':leaf.text},
            'semantic_group_move':{'id':group.get('id'),'role':group.get('data-semantic-role'),
                                   'before':before_transform,'after':group.get('transform')},
            'unchanged_roundtrip_pixel_comparison':same,'local_edit_pixel_comparison':changed,
            'renders':[reopen_render,edit_render],
            'limits':['No Penpot/draw.io GUI import, editing or save/reopen was tested.',
                      'Fonts across other machines/editors are not verified.',
                      'The edited SVG is an intentionally modified QA copy, not a new delivery master.']}


def prior_bundle_guard():
    originals = {'portfolio-master.svg':'F05EFC21B778D3BAFFB4E0DFFFD8C66270B46BA0E6D352C2C623B6E04669905F',
                 'build_svg.py':'9F1AC49F97AB0F6E01592A5A690083553D75F9B727FC53C7B04C7B6117ED8762'}
    records=[]
    for name,expected in originals.items():
        path=ROOT.parent/'m0-portfolio-v2'/name
        actual=sha(path) if path.is_file() else None
        records.append({'file':'../m0-portfolio-v2/'+name,'expected_sha256':expected.lower(),
                        'actual_sha256':actual,'unchanged':actual==expected.lower()})
    return {'status':'pass' if all(r['unchanged'] for r in records) else 'fail','files':records,
            'note':'Read-only comparison with root-supplied pre-task hashes; no prior bundle file is written.'}


def manifests(renders):
    assets=[]
    for path in sorted(ROOT.iterdir()):
        if not path.is_file() or path.name in ('artifact-manifest.json','assets-manifest.json',MASTER): continue
        if path.suffix.lower() not in ('.svg','.py','.json','.md'): continue
        assets.append({'id':'source-'+path.stem,'path':path.name,
                       'role':'single-page native SVG derivative' if path.suffix=='.svg' else 'authoring source, contract or layout specification',
                       'provenance':'Locally authored native SVG composition. The DK card is an intentional native typographic profile card; no photograph or AI-generated portrait is used. Source and layout decisions are recorded in the bundle README/build script/layout specification.'})
    write(ROOT/'assets-manifest.json',{'schema_version':'1.0.0','assets':assets})
    write(ROOT/'artifact-manifest.json',{'schema_version':'1.0.0','artifact_id':'deshengkong-site-m0-about-contact-v1',
          'artifact_type':'diagram','delivery_mode':'editable','explicit_raster_only_request':False,
          'master':{'path':MASTER,'format':'svg'},'previews':[{'path':r['output'],'format':'png'} for r in renders],
          'assets_manifest':'assets-manifest.json','qa_report':'qa/qa-report.json'})


def main():
    missing=[name for name in EXPECTED if not (ROOT/name).is_file()]
    if missing: raise SystemExit('Waiting for complete SVG set: '+', '.join(missing))
    files=[inspect(ROOT/name) for name in EXPECTED]
    write(QA/'svg-structure.json',{'checked_at_utc':datetime.now(timezone.utc).isoformat(),'purpose':'Static About/Contact UI layout diagrams, not a working M1 website.','files':files,
          'raster_asset_provenance':'No raster assets. DK is an intentional native typographic profile card; not a photograph, AI portrait or missing-photo placeholder.'})
    guard=prior_bundle_guard(); write(QA/'prior-bundle-guard.json',guard)
    if any(f['status']!='pass' for f in files) or guard['status']!='pass':
        raise SystemExit('Source safety/structure or prior-bundle guard failed; inspect qa evidence before rendering.')
    renders=[render(ROOT/name) for name in EXPECTED]
    write(QA/'render-evidence.json',{'renders':renders})
    edit=roundtrip(renders[-1]); write(QA/'roundtrip-evidence.json',edit)
    review_path=QA/'visual-review.json'
    review=json.loads(review_path.read_text(encoding='utf-8')) if review_path.exists() else {}
    hashes={r['output']:r['output_sha256'] for r in renders+edit['renders']}
    current=all(review.get('preview_sha256',{}).get(k)==v for k,v in hashes.items())
    checks=[]
    for rule in RULES:
        record=review.get('checks',{}).get(rule,{})
        passed=current and record.get('status')=='pass' and (rule!='editable-master-reopened' or edit['status']=='pass')
        checks.append({'id':rule,'status':'pass' if passed else 'fail',
                       'evidence':record.get('evidence') if passed else 'Pending actual review of current renders and source-edit evidence. Structure alone is not visual QA.'})
    checks += [{'id':'native-only-svg-structure-security','status':'pass','evidence':'qa/svg-structure.json'},
               {'id':'native-edit-roundtrip','status':edit['status'],'evidence':'qa/roundtrip-evidence.json'},
               {'id':'prior-approved-bundle-unchanged','status':guard['status'],'evidence':'qa/prior-bundle-guard.json'}]
    write(QA/'qa-report.json',{'schema_version':'1.0.0','checks':checks})
    manifests(renders)
    print(json.dumps({'source_structure':'pass','rendered_previews':len(renders),'roundtrip':edit['status'],
                      'current_visual_review':current,'checks':{c['id']:c['status'] for c in checks}},indent=2))


if __name__=='__main__': main()
