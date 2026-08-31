"""Rebuild the selected M0 compositions as portable, editable SVG masters.

Only complex, generated illustrations are cropped from immutable v1 references.
Page text, page geometry, controls, and the large portal interface use native SVG.
Run: python docs/design/m0-portfolio-v2/build_svg.py
No network, design service, browser, or application build is used.
"""
from pathlib import Path
from contextlib import contextmanager
from html import escape
import base64
import hashlib
import json
import re
import xml.etree.ElementTree as ET
from PIL import Image

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT.parent / 'm0-portfolio-v1'
ASSETS = ROOT / 'assets'
BG, INK, BLUE = '#FBFCFD', '#080B10', '#064FF5'
LINE, PALE, MUTED = '#CFD7E3', '#F3F7FF', '#778397'
FONT = 'Arial, Helvetica, sans-serif'
MONO = 'Consolas, Courier New, monospace'

CROPS = {
    'home-system-illustration': ('01-home-desktop.png', (617, 109, 987, 520)),
    'home-concierge-illustration': ('01-home-desktop.png', (40, 781, 499, 946)),
    'home-portal-illustration': ('01-home-desktop.png', (515, 781, 982, 946)),
    'home-media-illustration': ('01-home-desktop.png', (40, 1079, 499, 1243)),
    'home-workbench-illustration': ('01-home-desktop.png', (515, 1079, 982, 1250)),
    'mobile-concierge-illustration': ('03-home-mobile.png', (52, 908, 801, 1139)),
    'mobile-portal-illustration': ('03-home-mobile.png', (52, 1349, 802, 1566)),
}


class SVG:
    def __init__(self, name, width, height, title):
        self.name, self.width, self.height = name, width, height
        self.groups = []
        self.parts = [f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-labelledby="page-title page-description">',
                      f'<title id="page-title">{escape(title)}</title>',
                      '<desc id="page-description">Editable M0 portfolio visual composition. All product images are generated concept illustrations, not actual product screenshots. No live controls or backend are implemented by this SVG.</desc>',
                      f'<style>text {{ font-family: {FONT}; }} .mono {{ font-family: {MONO}; }}</style>']
        self.rect(0, 0, width, height, fill=BG, id='page-background')

    def raw(self, markup): self.parts.append(markup)

    @contextmanager
    def group(self, name, bounds=None):
        self.groups.append({'id': name, **({'bounds': bounds} if bounds else {})})
        self.raw(f'<g id="{name}" data-semantic-role="{name}">')
        yield
        self.raw('</g>')

    def rect(self, x, y, w, h, fill='none', stroke=None, radius=0, sw=1, id=None):
        attrs = f' x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}"'
        if stroke: attrs += f' stroke="{stroke}" stroke-width="{sw}"'
        if id: attrs += f' id="{id}"'
        self.raw(f'<rect{attrs}/>')

    def line(self, x1, y1, x2, y2, color=LINE, sw=1):
        self.raw(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{sw}" stroke-linecap="round"/>')

    def path(self, d, color=BLUE, sw=1.4, fill='none'):
        self.raw(f'<path d="{d}" fill="{fill}" stroke="{color}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>')

    def circle(self, x, y, r, color=BLUE, fill='none', sw=1):
        self.raw(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" stroke="{color}" stroke-width="{sw}"/>')

    def text(self, x, y, value, size=16, weight=400, color=INK, anchor='start', mono=False, spacing=None, width=None):
        attrs = f'x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{color}" text-anchor="{anchor}"'
        if mono: attrs += ' class="mono"'
        if spacing is not None: attrs += f' letter-spacing="{spacing}"'
        if width is not None: attrs += f' textLength="{width}" lengthAdjust="spacingAndGlyphs"'
        self.raw(f'<text {attrs}>{escape(value)}</text>')

    def multiline(self, x, y, lines, size=16, leading=24, weight=400, color=INK, widths=None):
        self.raw(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" fill="{color}">')
        for index, line in enumerate(lines):
            length = f' textLength="{widths[index]}" lengthAdjust="spacingAndGlyphs"' if widths else ''
            self.raw(f'<tspan x="{x}" y="{y + index * leading}"{length}>{escape(line)}</tspan>')
        self.raw('</text>')

    def arrow(self, x, y, kind='right', color=INK, size=14, sw=1.5):
        if kind == 'down':
            self.path(f'M{x} {y-size/2}v{size}m{-size/2} {-size/2}l{size/2} {size/2}l{size/2} {-size/2}', color, sw)
        elif kind == 'up-right':
            self.path(f'M{x-size/2} {y+size/2}l{size} {-size}m{-size} 0h{size}v{size}', color, sw)
        elif kind == 'left':
            self.path(f'M{x+size/2} {y}h{-size}m{size/2} {-size/2}l{-size/2} {size/2}l{size/2} {size/2}', color, sw)
        else:
            self.path(f'M{x-size/2} {y}h{size}m{-size/2} {-size/2}l{size/2} {size/2}l{-size/2} {size/2}', color, sw)

    def button(self, x, y, w, h, label, fill=BLUE, color='white', stroke=None, size=16, arrow=None, radius=5):
        self.rect(x, y, w, h, fill, stroke, radius)
        tx = x + w / 2 - (10 if arrow else 0)
        self.text(tx, y + h / 2 + size * .34, label, size, 500, color, 'middle')
        if arrow: self.arrow(x + w - 26, y + h / 2, arrow, color, 13)

    def image(self, asset, x, y, w, h, radius=0):
        data = base64.b64encode((ASSETS / f'{asset}.png').read_bytes()).decode()
        clip_id = f'clip-{asset}'
        if radius:
            outline = f'M{x} {y+h}V{y+radius}Q{x} {y} {x+radius} {y}H{x+w-radius}Q{x+w} {y} {x+w} {y+radius}V{y+h}Z'
            self.raw(f'<defs><clipPath id="{clip_id}"><path d="{outline}"/></clipPath></defs>')
        clip = f' clip-path="url(#{clip_id})"' if radius else ''
        self.raw(f'<image id="asset-{asset}" data-source-asset="assets/{asset}.png" x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="none" xlink:href="data:image/png;base64,{data}"{clip}/>')

    def finish(self):
        self.raw('</svg>')
        dest = ROOT / f'{self.name}.svg'
        dest.write_text('\n'.join(self.parts) + '\n', encoding='utf-8')
        root = ET.parse(dest).getroot()
        ns = {'s': 'http://www.w3.org/2000/svg'}
        return {'file': dest.name, 'viewBox': [0, 0, self.width, self.height], 'font': FONT,
                'native_text_elements': len(root.findall('.//s:text', ns)),
                'native_tspan_elements': len(root.findall('.//s:tspan', ns)),
                'semantic_groups': self.groups,
                'embedded_local_crops': len(root.findall('.//s:image', ns)),
                'sha256': hashlib.sha256(dest.read_bytes()).hexdigest()}


def header(s):
    with s.group('site-navigation', [40, 20, 944, 52]):
        s.text(39, 47, 'Desheng Kong', 25, 700, width=190)
        s.text(710, 44, 'Work', 15)
        s.text(792, 44, 'About', 15)
        s.button(870, 20, 114, 36, 'Get in touch', INK, size=14, radius=4)
        s.line(40, 71, 984, 71)


def badge(s, x, y, value, size=11, height=21):
    is_demo = value == 'DEMO'
    color = BLUE if is_demo else ('#2A541E' if value == 'FIELD-TESTED' else '#5F6228')
    stroke = '#6D93FF' if is_demo else ('#9CBBA0' if value == 'FIELD-TESTED' else '#C7CDAD')
    w = len(value) * size * .60 + 16
    s.rect(x, y, w, height, 'white', stroke, 3)
    s.text(x + 8, y + height * .70, value, size, 400, color, mono=True)


def illustration_label(s, x, y, w, label='Illustrative interface', mobile=False, dark=False):
    fs, h = (18, 29) if mobile else (11, 20)
    width = len(label) * fs * .51 + 16
    bx = x + w - width - (20 if mobile else 10)
    s.rect(bx, y + 10, width, h, '#071624' if dark else '#FFFFFF', '#B9C9E1' if not dark else None, 4)
    s.text(bx + width / 2, y + 10 + h * .69, label, fs, 400, 'white' if dark else '#234365', 'middle')


def chat_icon(s, x, y, scale=1):
    s.raw(f'<g transform="translate({x} {y}) scale({scale})">')
    s.path('M6 1h22a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5H15l-8 7v-7H6a5 5 0 0 1-5-5V6a5 5 0 0 1 5-5z', BLUE, 2)
    s.path('M36 10h9a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5h-5v6l-9-6h-9', BLUE, 2)
    s.raw('</g>')


def skill_icon(s, x, y, kind):
    if kind == 'voice':
        for i, h in enumerate([4, 12, 22, 33, 24, 16, 7]):
            s.line(x-18+i*6, y-h/2, x-18+i*6, y+h/2, BLUE, 1.6)
    elif kind == 'puzzle':
        s.path(f'M{x-13} {y-9}h9c-5-10 10-10 5 0h10v9c10-5 10 10 0 5v10h-10c5-10-10-10-5 0h-9v-10c10 5 10-10 0-5z', BLUE, 1.4)
    elif kind == 'brain':
        s.path(f'M{x} {y-17}v33m-3-31c-8-5-13 1-12 7c-9 3-8 14-2 17c-1 7 10 9 14 3m6-26c7-4 13 4 10 10c8 4 6 12 0 14c-1 5-6 7-10 5', BLUE, 1.3)
        for dx,dy in [(-8,-8),(-7,7),(10,-5),(7,9)]: s.circle(x+dx,y+dy,2,BLUE)
    else:
        s.rect(x-16,y-15,33,31,'none',BLUE,3,1.4)
        s.line(x-15,y-7,x+16,y-7,BLUE,1.2)
        s.circle(x-10,y-11,1,BLUE,BLUE)
        s.circle(x-5,y-11,1,BLUE,BLUE)


def home():
    s = SVG('01-home-desktop', 1024, 1536, 'Desheng Kong — desktop portfolio homepage, editable M0')
    header(s)
    with s.group('hero-copy-and-actions', [40, 111, 460, 425]):
        s.text(40,127,'APPLIED AI · MELBOURNE',14,color=BLUE,mono=True,spacing=1)
        s.multiline(39,220,['AI systems.','Built for','real work.'],80,80,700,widths=[430,331,365])
        s.multiline(41,429,['I connect AI capabilities, product interfaces','and everyday workflows.'],19,27)
        s.button(41,486,228,47,'Explore selected work',size=16,arrow='down')
        s.text(308,515,'About me',16,600)
        s.arrow(400,509)
        s.line(308,525,410,525,INK)
    with s.group('hero-concept-system', [539,109,448,432]):
        s.image('home-system-illustration',617,109,370,411)
        for label, yy, start in [('Interface',163,602),('Knowledge',296,612),('Workflow',428,606)]:
            s.text(539,yy+4,label,12)
            s.circle(start,yy,2.5,BLUE,BLUE)
            s.line(start,yy,652,yy,'#426FFE',.8)
        s.text(792,536,'ILLUSTRATIVE SYSTEM VIEW',10,color=BLUE,anchor='middle',mono=True,spacing=.4)
    with s.group('capability-strip', [40,577,944,100]):
        s.line(40,577,984,577); s.line(40,677,984,677)
        for xx in (274,511,739): s.line(xx,596,xx,659)
        for xx,label,kind in [(155,'Voice & RAG','voice'),(392,'Workflow automation','puzzle'),(625,'Applied AI','brain'),(857,'Web interfaces','web')]:
            skill_icon(s,xx,614,kind); s.text(xx,656,label,14,anchor='middle')
    with s.group('selected-work-heading', [40,711,944,52]):
        s.text(40,737,'Selected work',30,700)
        s.text(40,762,'Applied AI, practical tools and the work behind them.',13)
        s.text(869,738,'All projects',14); s.arrow(975,732)
        s.line(868,746,966,746,INK)
    cards = [
        (40,781,459,282,165,'home-concierge-illustration','FIELD-TESTED','Virtual Concierge','Voice, knowledge retrieval and a kiosk interface.','Concept illustration',True),
        (515,781,467,282,165,'home-portal-illustration','DEMO','UAI API Customer Portal','A clear journey from access to request testing.','Illustrative interface',False),
        (40,1079,459,275,164,'home-media-illustration','IN DEVELOPMENT','Media & Visual Tools','Content workflows with human review built in.','Concept illustration',False),
        (515,1079,467,275,171,'home-workbench-illustration','IN DEVELOPMENT','iClaude Workbench','Project context, next steps and controlled handoffs.','Illustrative interface',True),
    ]
    for i,(x,y,w,h,ih,asset,status,title,body,label,dark) in enumerate(cards):
        with s.group(f'project-card-{i+1}-'+asset.split('-')[1],[x,y,w,h]):
            s.rect(x,y,w,h,'white',LINE,7)
            s.image(asset,x,y,w,ih,7)
            illustration_label(s,x,y,w,label,dark=dark)
            content_y = 960 if y==781 else 1256
            badge(s,x+13,content_y,status,10,21)
            title_y = 1004 if y==781 else 1297
            s.text(x+13,title_y,title,16,700)
            s.text(x+13,title_y+19,body,11)
            s.text(x+13,title_y+44,'View case study',12,500,BLUE)
            s.arrow(x+121,title_y+39,'up-right',BLUE,9,1)
    with s.group('contact-call-to-action', [40,1371,942,97]):
        s.rect(40,1371,942,97,PALE,'#D6E1F2',7)
        chat_icon(s,77,1403,1)
        s.text(164,1410,'Have a practical AI problem to solve?',16)
        s.text(164,1445,'Let’s talk.',30,700)
        s.button(782,1398,170,45,'Get in touch',size=16,arrow='right')
    with s.group('page-footer', [40,1483,942,34]):
        s.line(40,1483,982,1483)
        s.text(40,1512,'Desheng Kong',12)
        s.text(982,1512,'M0 · VISUAL CONCEPT',10,color=MUTED,anchor='end',mono=True,spacing=.4)
    return s.finish()


def portal_icon(s,x,y,kind):
    if kind=='home': s.path(f'M{x-7} {y}l7-7l7 7v9h-5v-6h-4v6h-5z',BLUE,1.1)
    elif kind=='key':
        s.circle(x+2,y-3,4,'#29415F');s.path(f'M{x-1} {y}l-7 7v3h4v-3h3l3-3','#29415F',1.1)
    elif kind=='usage':
        for dx,h in [(-6,7),(-2,13),(2,18),(6,10)]: s.line(x+dx,y+8,x+dx,y+8-h,'#29415F',1)
    elif kind=='cube': s.path(f'M{x} {y-9}l8 4v10l-8 4l-8-4V{y-5}zM{x-8} {y-5}l8 5l8-5M{x} {y}v9','#29415F',1.1)
    elif kind=='terminal':
        s.rect(x-8,y-7,16,15,'none','#29415F',2);s.path(f'M{x-5} {y-3}l3 3l-3 3m6 0h4','#29415F',1)
    else:
        s.path(f'M{x-6} {y-8}h8l5 5v12H{x-6}zM{x+2} {y-8}v5h5m-10 4h7m-7 4h7','#29415F',1)


def showcase(s):
    with s.group('editable-portal-illustrative-interface', [40,565,940,484]):
        s.rect(40,565,940,484,'#F5F8FE','#C6D6F3',11)
        s.rect(65,588,28,28,BLUE,radius=5)
        s.path('M79 591l10 11l-10 11l-11-11z','white',1.8)
        nav=[('Overview','home'),('API keys','key'),('Usage','usage'),('Models','cube'),('Playground','terminal'),('Docs','doc')]
        for i,(label,kind) in enumerate(nav):
            yy=655+i*41
            if i==0: s.rect(57,635,163,37,'#E6EEFC',radius=5)
            portal_icon(s,77,yy-2,kind)
            s.text(101,yy+4,label,14,color=BLUE if i==0 else '#162C4A')
        s.rect(239,585,703,450,'white','#D7E0EF',10)
        s.circle(909,607,13,'#E9EFF8','#E9EFF8')
        s.circle(909,604,3.5,'#1C3559')
        s.path('M902 614c0-7 14-7 14 0','#1C3559',1)
        s.rect(257,629,667,65,'#EAF1FE','#CFDDF5',6)
        s.text(590,673,'DEMO DATA · NO LIVE API',28,700,BLUE,'middle',width=364)
        with s.group('portal-request-playground', [257,708,361,173]):
            s.rect(257,708,361,173,'white','#DCE3EE',7)
            s.text(273,736,'Request playground',15,500,color='#102744')
            s.text(273,766,'Sample request',13,color='#172538')
            s.rect(273,775,330,53,'#FFFFFF','#CDD7E8',5)
            s.line(287,791,404,791,'#D5DDEA',4)
            s.line(287,809,412,809,'#D5DDEA',4)
            s.button(489,840,114,29,'Simulate request','white',BLUE,BLUE,11,radius=4)
        with s.group('portal-response-preview', [634,708,290,173]):
            s.rect(634,708,290,173,'white','#DCE3EE',7)
            s.text(650,736,'Response preview',15,500,color='#102744')
            s.rect(650,755,258,104,'#F8FAFE','#DCE3EE',5)
            for yy,key,value in [(784,'status:','simulated'),(809,'source:','fixture'),(835,'mode:','demo')]:
                s.text(665,yy,key,11,400,BLUE,mono=True)
                s.text(720,yy,value,11,400,'#172538',mono=True)
        with s.group('portal-synthetic-request-table', [257,893,667,126]):
            s.rect(257,893,667,126,'#FFFFFF','#DCE3EE',6)
            s.line(593,894,593,1018,'#DCE3EE')
            s.text(273,915,'Example request',12,500,color='#102744')
            s.text(611,915,'Simulated',12,500,color='#102744')
            for yy in (925,957,988): s.line(258,yy,923,yy,'#DCE3EE')
            for yy,leftwidth,rightwidth in [(941,184,117),(971,120,149),(1001,150,117)]:
                s.line(277,yy,277+leftwidth,yy,'#D5DDEA',4)
                s.line(613,yy,613+rightwidth,yy,'#D5DDEA',4)


def case_study():
    s=SVG('02-case-study-desktop',1024,1536,'UAI API Customer Portal — editable M0 portfolio case study')
    header(s)
    with s.group('case-study-hero',[40,104,944,351]):
        s.arrow(49,113,'left',BLUE,13,1)
        s.text(66,118,'Selected work',15,color=BLUE)
        s.rect(40,146,203,29,'white',BLUE,3)
        s.text(51,166,'DEMO · SYNTHETIC DATA',13,color=BLUE,mono=True,spacing=.55)
        s.multiline(40,246,['UAI API','Customer Portal'],68,68,700,widths=[255,505])
        s.multiline(41,355,['Turning platform capabilities into a clear customer journey.','From access and usage to request testing.'],19,27)
        s.button(41,409,154,45,'View demo',arrow='up-right')
        s.button(220,409,135,45,'Get in touch','white',INK,'#8796AB',16)
    with s.group('case-metadata',[40,474,944,67]):
        s.line(40,474,982,474)
        for x in (342,682): s.line(x,492,x,541)
        for x,label,value in [(41,'ROLE','Scope, interface & integration'),(388,'FOCUS','Customer experience'),(727,'STAGE','Demonstration')]:
            s.text(x,506,label,11,color=BLUE,mono=True,spacing=.6)
            s.text(x,533,value,15)
    showcase(s)
    with s.group('showcase-disclosure',[40,1058,942,34]):
        s.text(510,1070,'Illustrative interface · synthetic data',12,color='#3C4960',anchor='middle')
        s.line(41,1091,980,1091)
    with s.group('personal-contribution',[41,1114,939,143]):
        s.text(41,1134,'My contribution',25,700)
        for x in (341,662):s.line(x,1145,x,1238)
        cols=[(41,'01','Product scope',['Defined the customer journey across','access, usage and request testing.']),
              (367,'02','Interface & interactions',['Shaped navigation, responsive layouts','and clear success and failure states.']),
              (692,'03','Integration boundary',['Kept the customer interface separate','from internal administration.'])]
        for x,no,title,body in cols:
            s.text(x,1162,no,14,color=BLUE)
            s.text(x,1188,title,16,700)
            s.multiline(x,1213,body,14,20)
        s.line(41,1257,980,1257)
    with s.group('demonstrated-fixture-scope',[41,1278,460,124]):
        s.text(41,1294,'What the demo shows',20,700)
        for yy,label in [(1321,'Create and revoke demo keys'),(1353,'Explore sample usage and export CSV'),(1386,'Run simulated requests and inspect failures')]:
            s.circle(52,yy-2,7.5,BLUE)
            s.path(f'M48 {yy-2}l3 3l5-6',BLUE,1)
            s.text(73,yy+4,label,14)
        s.line(42,1336,475,1336)
        s.line(42,1369,475,1369)
        s.line(501,1281,501,1401)
    with s.group('synthetic-data-boundary-notice',[524,1278,455,124]):
        s.rect(524,1278,455,124,'#FFFAEF','#EBD39A',9)
        s.path('M575 1307l19 8v17c0 11-10 20-19 25c-9-5-20-14-20-25v-17z','#CC8B00',2.2)
        s.circle(575,1331,8,'#CC8B00',sw=2)
        s.text(628,1322,'A clear boundary',18,700)
        s.multiline(628,1349,['Synthetic data only. No live API access, real','customer accounts, billing or production inference.'],14,21)
    with s.group('case-contact-call-to-action',[40,1420,940,67]):
        s.rect(40,1420,940,67,PALE,'#D6E1F2',6)
        chat_icon(s,69,1437,.82)
        s.text(147,1459,'Have a similar problem to solve?',17)
        s.button(782,1431,170,45,'Get in touch',size=16,arrow='right')
    with s.group('case-footer',[40,1500,940,17]):
        s.text(40,1512,'Desheng Kong',12)
        s.text(980,1512,'M0 · VISUAL CONCEPT',10,color=MUTED,anchor='end',mono=True,spacing=.4)
    return s.finish()


def mobile():
    s=SVG('03-home-mobile',853,1844,'Desheng Kong — editable mobile M0 homepage excerpt')
    with s.group('mobile-site-navigation',[48,33,756,56]):
        s.text(48,62,'Desheng Kong',34,700,width=259)
        for yy in (35,48,61):s.line(765,yy,802,yy,INK,3)
        s.line(48,88,804,88)
    with s.group('mobile-hero-copy-and-actions',[48,117,756,534]):
        s.text(48,134,'APPLIED AI · MELBOURNE',21,color=BLUE,mono=True,spacing=1)
        s.multiline(48,228,['AI systems.','Built for','real work.'],90,85,700,widths=[506,389,427])
        s.multiline(50,454,['Applied AI, practical tools','and clear workflows.'],28,39)
        s.rect(49,523,755,71,BLUE,radius=9)
        s.text(405,569,'Explore my work',27,500,'white','middle')
        s.arrow(534,559,'down','white',19,2)
        s.text(340,640,'Get in touch',25,500)
        s.arrow(501,632,'right',INK,22,2)
        s.line(340,649,513,649,INK,2)
    with s.group('mobile-capability-strip',[49,686,755,89]):
        s.line(49,686,804,686);s.line(49,774,804,774)
        for x,label in [(158,'AI'),(411,'Interfaces'),(685,'Workflows')]:s.text(x,738,label,22,anchor='middle')
        for x in (280,540):s.circle(x,730,2.5,MUTED,MUTED)
    with s.group('mobile-selected-work-heading',[50,819,750,64]):
        s.text(50,848,'Selected work',37,700)
        s.text(50,883,'Real applications. Demos. Work in progress.',21)
    with s.group('mobile-project-virtual-concierge',[52,908,749,428]):
        s.rect(52,908,749,428,'white',LINE,14)
        s.image('mobile-concierge-illustration',52,908,749,231,14)
        illustration_label(s,52,912,749,'Concept illustration',True,True)
        s.rect(52.5,1139,748,181,'white')
        badge(s,83,1160,'FIELD-TESTED',18,31)
        s.text(83,1232,'Virtual Concierge',32,700)
        s.text(83,1268,'Voice + knowledge integration',24)
        s.text(83,1310,'View case study',25,500,BLUE)
        s.arrow(295,1301,'up-right',BLUE,17,2)
    with s.group('mobile-project-uai-api-customer-portal',[52,1349,750,413]):
        s.rect(52,1349,750,413,'white',LINE,14)
        s.image('mobile-portal-illustration',52,1349,750,217,14)
        illustration_label(s,52,1349,750,'Illustrative interface',True,False)
        s.rect(52.5,1566,749,180,'white')
        badge(s,83,1585,'DEMO',18,31)
        s.text(83,1654,'UAI API Customer Portal',31,700)
        s.text(83,1692,'Access, usage and request testing',23)
        s.text(83,1736,'View case study',25,500,BLUE)
        s.arrow(295,1727,'up-right',BLUE,17,2)
    with s.group('mobile-page-continues-annotation',[222,1800,540,22]):
        s.text(426,1818,'M0 · MOBILE CONCEPT · PAGE CONTINUES',16,color=MUTED,anchor='middle',mono=True,spacing=.25)
    return s.finish()


def combined_master(pages):
    """One master with three independent native-size artboards; no duplicate IDs."""
    gap = 64
    total_width = sum(p['viewBox'][2] for p in pages) + gap * (len(pages) - 1)
    max_height = max(p['viewBox'][3] for p in pages)
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{total_width}" height="{max_height}" viewBox="0 0 {total_width} {max_height}" role="img" aria-labelledby="master-title">',
             '<title id="master-title">Desheng Kong portfolio — editable M0 master with three native-size artboards</title>',
             '<desc>Single generated master. Desktop homepage, desktop case study and mobile excerpt remain at their source pixel dimensions. All page copy and geometry are native SVG; generated concept crops remain individually replaceable assets.</desc>',
             f'<rect width="{total_width}" height="{max_height}" fill="#E7EAF0"/>']
    x = 0
    for i, page in enumerate(pages):
        source = (ROOT/page['file']).read_text(encoding='utf-8')
        inner = source[source.index('>')+1:source.rindex('</svg>')]
        ids = re.findall(r'\bid="([^"]+)"', inner)
        prefix = f'artboard-{i+1}-'
        for old in sorted(ids, key=len, reverse=True):
            inner = inner.replace(f'id="{old}"', f'id="{prefix}{old}"')
            inner = inner.replace(f'url(#{old})', f'url(#{prefix}{old})')
        w,h = page['viewBox'][2:]
        parts.append(f'<svg id="artboard-{i+1}" data-semantic-role="{page["file"][:-4]}" x="{x}" y="0" width="{w}" height="{h}" viewBox="0 0 {w} {h}" overflow="hidden">{inner}</svg>')
        x += w + gap
    parts.append('</svg>')
    path = ROOT/'portfolio-master.svg'
    path.write_text('\n'.join(parts)+'\n', encoding='utf-8')
    ET.parse(path)
    return {'file':path.name,'viewBox':[0,0,total_width,max_height], 'artboard_gap_px':gap,
            'authoring_source':'build_svg.py; this master and all three individual SVGs are generated together.'}


def main():
    ASSETS.mkdir(parents=True, exist_ok=True)
    asset_manifest=[]
    for name,(source_file,box) in CROPS.items():
        source=SOURCE/source_file
        with Image.open(source) as image:
            asset=image.crop(box)
            dest=ASSETS/f'{name}.png'
            asset.save(dest)
        asset_manifest.append({'id':name,'file':f'assets/{name}.png','source':f'../m0-portfolio-v1/{source_file}',
                               'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),
                               'crop_box_xyxy':list(box),'dimensions_px':list(asset.size),
                               'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),
                               'provenance':'Local Pillow crop of user-authorized ImageGen M0 reference; generated concept illustration, not product evidence.',
                               'editability':'Independently replaceable raster illustration. Small text within the illustration remains raster; all enclosing portfolio copy and disclosure labels are native SVG text.'})
    (ROOT/'asset-crops-spec.json').write_text(json.dumps({'version':1,'assets':asset_manifest},indent=2)+'\n',encoding='utf-8')
    pages=[home(),case_study(),mobile()]
    master=combined_master(pages)
    spec={'version':2,'purpose':'Editable reconstruction of the selected M0 compositions, not website implementation.',
          'review_status':'DERIVED_EDITABLE_MASTER_REQUIRES_RENDER_QA_AND_USER_REVIEW',
          'coordinate_basis':'Original reference image pixels; manually reconstructed geometry, not a pixel-identical conversion.',
          'colors':{'background':BG,'ink':INK,'accent':BLUE,'border':LINE,'palePanel':PALE,'muted':MUTED},
          'font_family':FONT,'mono_font_family':MONO,
          'intentional_changes':['Correct project title to UAI API Customer Portal; case H1 uses UAI API / Customer Portal.',
                                 'Add readable native concept/illustrative-interface disclosure to every project thumbnail.',
                                 'Reconstruct the large case-study portal illustration as native SVG geometry and text.'],
          'fidelity_limits':['Arial is an available local font substitution for the image model’s non-identifiable typeface; key heading line widths are explicitly constrained.',
                             'Flat vector surfaces replace generated paper texture and irregular raster antialiasing.',
                             'Small capability icons and portal UI geometry are approximated with editable native vectors.',
                             'Complex concept illustrations remain separate cropped raster assets, embedded in masters for portability.'],
          'combined_master':master,'pages':pages}
    (ROOT/'layout-spec.json').write_text(json.dumps(spec,indent=2)+'\n',encoding='utf-8')
    print(json.dumps([{'file':p['file'],'native_text':p['native_text_elements'],'native_tspan':p['native_tspan_elements'],'semantic_groups':len(p['semantic_groups']),'embedded_crops':p['embedded_local_crops']} for p in pages],indent=2))


if __name__=='__main__':
    main()
