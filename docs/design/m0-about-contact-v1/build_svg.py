"""Build two editable M0 portfolio page proposals using the existing v2 helpers.

Only this bundle is written. The imported v2 source is never executed as main,
modified, or bytecode-cached. All visuals are native SVG; no portrait is invented.
"""
from pathlib import Path
from types import ModuleType
import hashlib
import json
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent
HELPER = ROOT.parent / 'm0-portfolio-v2' / 'build_svg.py'
base = ModuleType('portfolio_svg_helpers')
base.__file__ = str(HELPER)
exec(compile(HELPER.read_text(encoding='utf-8'), str(HELPER), 'exec'), base.__dict__)
base.ROOT = ROOT
base.ASSETS = ROOT / 'assets'
SVG = base.SVG
BG, INK, BLUE, LINE, PALE, MUTED = base.BG, base.INK, base.BLUE, base.LINE, base.PALE, base.MUTED


def page(name, title):
    s = SVG(name, 1024, 1536, title)
    s.parts[2] = '<desc id="page-description">Editable static M0 proposal for Desheng Kong’s personal portfolio. All text and artwork are native SVG. Contact controls are visual proposals only: no message, form, network request or backend is implemented.</desc>'
    base.header(s)
    return s


def footer(s, label):
    with s.group('page-footer', [40, 1483, 944, 36]):
        s.line(40, 1483, 984, 1483)
        s.text(40, 1512, 'Desheng Kong', 12)
        s.text(984, 1512, label, 10, color=MUTED, anchor='end', mono=True, spacing=.3)


def chips(s, items, x, y):
    """Explicit positions preserve a readable, stable grouping without wrapping."""
    for label, dx, dy, width in items:
        s.rect(x+dx, y+dy, width, 31, 'white', LINE, 15)
        s.text(x+dx+width/2, y+dy+20, label, 13, color='#26374D', anchor='middle')


def about():
    s = page('01-about-desktop', 'About Desheng Kong — editable M0 desktop proposal')
    with s.group('about-active-navigation', [790, 51, 43, 3]):
        s.line(792, 54, 833, 54, BLUE, 1.5)
    with s.group('about-introduction', [40, 116, 592, 451]):
        s.text(40, 129, 'ABOUT ME', 13, color=BLUE, mono=True, spacing=1.1)
        s.multiline(40, 215, ['From interfaces', 'to AI systems.'], 66, 72, 700)
        s.multiline(41, 343, ['I’m Desheng Kong, an applied AI systems', 'developer based in Melbourne.'], 19, 28)
        s.multiline(41, 417, ['I work across LLM integration, knowledge retrieval,', 'voice interfaces and workflow automation.'], 18, 27)
        s.multiline(41, 487, ['My front-end background still shapes the interfaces', 'I build around these systems.'], 18, 27)
        s.text(41, 562, 'View selected work', 16, 500, BLUE)
        s.arrow(202, 556, 'right', BLUE, 14)
    with s.group('profile-card-with-initials', [676, 128, 306, 431]):
        s.rect(676, 128, 306, 431, PALE, '#CDDBF0', 10)
        # A typographic monogram is used because no verified personal portrait was found.
        for x in range(700, 960, 26): s.line(x, 151, x, 365, '#E5ECF8', .7)
        for y in range(157, 365, 26): s.line(699, y, 959, y, '#E5ECF8', .7)
        s.circle(829, 257, 78, '#C4D5F6', '#EDF3FF', 1)
        s.text(829, 281, 'DK', 68, 700, BLUE, 'middle')
        s.line(699, 387, 959, 387, '#D6E1F2')
        s.text(700, 428, 'Desheng Kong', 25, 700)
        s.text(700, 457, 'Melbourne, Australia', 16, color='#46586D')
        s.text(700, 504, 'APPLIED AI', 11, color=BLUE, mono=True, spacing=.9)
        s.text(700, 531, 'Voice · knowledge · workflows', 14, color='#26374D')
    with s.group('working-approach', [40, 585, 944, 276]):
        s.line(40, 585, 984, 585)
        s.text(40, 638, 'How I work', 30, 700)
        s.text(40, 669, 'AI-assisted development, grounded in understanding the system.', 17, color='#46586D')
        for xx in (351, 669): s.line(xx, 706, xx, 854)
        columns = [
            (40, '01', 'Understand the system', ['Understand how the code and', 'components fit together, including', 'the parts created with AI assistance.']),
            (374, '02', 'Debug and maintain', ['Work through issues and understand', 'the system well enough to maintain', 'what I build.']),
            (692, '03', 'Explain the decisions', ['Explain the architecture choices', 'behind a system, and the reasons', 'for those decisions.']),
        ]
        for x, num, title, lines in columns:
            s.text(x, 723, num, 13, color=BLUE, mono=True)
            s.text(x, 763, title, 19, 700)
            s.multiline(x, 799, lines, 15, 23, color='#334255')
    with s.group('working-toolkit', [40, 899, 460, 207]):
        s.line(40, 885, 984, 885)
        s.text(40, 935, 'Working toolkit', 27, 700)
        chips(s, [('LLM integration',0,0,132), ('RAG',142,0,56), ('Voice / STT / TTS',208,0,153),
                  ('Next.js',0,44,80), ('TypeScript',90,44,103), ('Tailwind',203,44,88),
                  ('Python',0,88,77), ('Docker',87,88,78)], 40, 968)
    with s.group('learning-boundary', [535, 914, 447, 208]):
        s.rect(535, 914, 447, 208, PALE, '#D6E1F2', 9)
        s.text(559, 950, 'Currently exploring', 22, 700)
        s.multiline(559, 984, ['LangGraph · MCP · n8n', 'RAG evaluation'], 16, 25, color='#334255')
        s.line(559, 1027, 958, 1027, '#D6E1F2')
        s.text(559, 1056, 'NL2SQL course case study', 15, 500)
        s.multiline(559, 1081, ['Course learning — not a self-built', 'production product.'], 14, 20, color='#59697B')
    with s.group('background-without-invented-education', [40, 1163, 944, 168]):
        s.text(40, 1190, 'Background', 27, 700)
        rows = [('Foundation', 'Web interfaces · Next.js · TypeScript · Tailwind'),
                ('Current focus', 'Applied AI · voice · knowledge retrieval · workflows')]
        for i,(label,value) in enumerate(rows):
            yy=1236+i*53
            s.text(41,yy,label,14,color='#67758A',mono=True)
            s.text(270,yy,value,17)
            s.line(41,yy+19,982,yy+19)
    with s.group('about-contact-and-cv', [40, 1371, 942, 97]):
        s.rect(40, 1371, 942, 97, PALE, '#D6E1F2', 7)
        base.chat_icon(s,72,1402,.9)
        s.text(143,1409,'Have a practical AI problem to solve?',15)
        s.text(143,1445,'Let’s talk.',30,700)
        s.button(612,1398,159,45,'Download CV','white',INK,'#A8B7CC',15)
        s.button(789,1398,164,45,'Get in touch',size=15,arrow='right')
    footer(s, 'M0 · ABOUT PAGE CONCEPT')
    return s.finish()


def email_icon(s, x, y, scale=1, color=BLUE):
    s.raw(f'<g transform="translate({x} {y}) scale({scale})">')
    s.rect(0, 0, 42, 30, 'none', color, 4, 1.8)
    s.path('M2 3l19 14L40 3', color, 1.8)
    s.raw('</g>')


def contact():
    s = page('02-contact-desktop', 'Get in touch — editable M0 desktop contact proposal')
    with s.group('contact-introduction', [40, 117, 944, 220]):
        s.text(40, 130, 'GET IN TOUCH', 13, color=BLUE, mono=True, spacing=1)
        s.text(40, 232, 'Let’s talk.', 84, 700)
        s.multiline(42, 287, ['Have a practical AI problem to solve?', 'Tell me what you’re working on.'], 22, 32)
        base.chat_icon(s,803,170,2.6)
    with s.group('primary-email-contact', [40, 381, 944, 264]):
        s.rect(40, 381, 944, 264, PALE, '#CDDBF0', 11)
        s.text(72, 426, 'EMAIL', 12, color=BLUE, mono=True, spacing=1)
        s.text(72, 495, 'desheng.kong408@gmail.com', 40, 500)
        s.button(72, 552, 157, 47, 'Email me', size=17, arrow='up-right')
        s.text(252, 582, 'Opens Gmail in a new tab.', 15, color='#586A7E')
        email_icon(s,870,420,1.4)
    with s.group('additional-contact-and-cv-options', [40, 680, 944, 166]):
        links=[(40,'LinkedIn','Profile & background','linkedin'),
               (362,'GitHub','Projects & code','github'),
               (684,'Download CV','Resume PDF','cv')]
        for x,title,subtitle,kind in links:
            s.rect(x,680,300,166,'white',LINE,8)
            if kind=='linkedin':
                s.rect(x+24,703,28,28,BLUE,radius=3)
                s.text(x+38,725,'in',23,700,'white','middle')
            elif kind=='github':
                s.circle(x+38,717,15,BLUE,sw=1.5)
                s.path(f'M{x+33} 710l-5 7l5 7m10-14l5 7l-5 7',BLUE,1.7)
            else:
                s.path(f'M{x+28} 703h14l8 8v24h-22zM{x+42} 703v8h8',BLUE,1.5)
                s.arrow(x+38,722,'down',BLUE,12,1.4)
            s.arrow(x+272,716,'down' if kind=='cv' else 'up-right',BLUE,14,1.4)
            s.text(x+24,775,title,23,700)
            s.text(x+24,810,subtitle,15,color='#586A7E')
    with s.group('useful-enquiry-context', [40, 918, 944, 367]):
        s.text(40, 951, 'Useful to include', 31, 700)
        s.text(40, 985, 'A little context helps make the conversation specific.', 18, color='#586A7E')
        rows=[('01','Your goal','What would you like to make, improve or understand?'),
              ('02','What you have now','The current system, workflow or starting point.'),
              ('03','Timing','Any target dates or constraints worth knowing.')]
        for i,(number,title,body) in enumerate(rows):
            y=1051+i*91
            s.text(41,y,number,13,color=BLUE,mono=True)
            s.text(95,y+3,title,21,600)
            s.text(378,y+2,body,17,color='#334255')
            s.line(41,y+35,983,y+35)
    with s.group('contact-return-to-work', [40, 1371, 944, 97]):
        s.rect(40,1371,944,97,PALE,'#D6E1F2',7)
        s.text(72,1411,'Want to see the work first?',17,color='#334255')
        s.text(72,1444,'Explore selected projects.',26,700)
        s.button(789,1398,164,45,'View projects','white',INK,'#A8B7CC',15,arrow='right')
    footer(s, 'M0 · CONTACT PAGE CONCEPT')
    return s.finish()


def combined(pages):
    parts = ['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="2112" height="1536" viewBox="0 0 2112 1536" role="img" aria-labelledby="master-title">',
             '<title id="master-title">About and Get in touch — editable M0 master</title>',
             '<desc>Two native-size 1024 by 1536 artboards, separated by 64 pixels. Static portfolio proposals only. No forms, sending state, scheduling promise, backend, or invented personal portrait.</desc>',
             '<rect width="2112" height="1536" fill="#E7EAF0"/>']
    for i,p in enumerate(pages):
        source=(ROOT/p['file']).read_text(encoding='utf-8')
        inner=source[source.index('>')+1:source.rindex('</svg>')]
        for old in sorted(re.findall(r'\bid="([^"]+)"',inner),key=len,reverse=True):
            inner=inner.replace(f'id="{old}"',f'id="page-{i+1}-{old}"').replace(f'url(#{old})',f'url(#page-{i+1}-{old})')
        parts.append(f'<svg id="artboard-{i+1}" data-semantic-role="{p["file"][:-4]}" x="{i*1088}" y="0" width="1024" height="1536" viewBox="0 0 1024 1536" overflow="hidden">{inner}</svg>')
    parts.append('</svg>')
    dest=ROOT/'about-contact-master.svg'
    dest.write_text('\n'.join(parts)+'\n',encoding='utf-8')
    doc=ET.parse(dest).getroot()
    ids=[n.attrib['id'] for n in doc.iter() if 'id' in n.attrib]
    if len(ids)!=len(set(ids)): raise ValueError('Duplicate combined SVG IDs')
    return {'file':dest.name,'viewBox':[0,0,2112,1536],'artboards':2,'gap_px':64,
            'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()}


def main():
    ROOT.mkdir(parents=True,exist_ok=True)
    pages=[about(),contact()]
    master=combined(pages)
    spec={'version':1,'stage':'M0_STATIC_VISUAL_REVIEW','status':'PROPOSAL_PENDING_USER_REVIEW',
          'scope':'Two desktop proposals only; no application implementation, mobile design, live contact route, message sending, form or schedule integration.',
          'style_source':'../m0-portfolio-v2/build_svg.py',
          'style_source_sha256':hashlib.sha256(HELPER.read_bytes()).hexdigest(),
          'shared_styles':{'background':BG,'ink':INK,'accent':BLUE,'line':LINE,'pale':PALE,'font':base.FONT,'mono':base.MONO,'margin_px':40},
          'facts_and_boundaries':{'name':'Desheng Kong','location':'Melbourne, Australia',
             'portrait':'Native DK monogram; no verified personal portrait was found.',
             'education':'No education, employer, job-year or tenure claims added because no verified source was available.',
             'learning':'LangGraph, MCP, n8n and RAG evaluation remain exploring. NL2SQL is explicitly a course case study, not a self-built production product.',
             'email':'desheng.kong408@gmail.com','existing_email_action':'New tab Gmail compose with subject Portfolio Enquiry; SVG is static and sends nothing.',
             'linkedin':'https://www.linkedin.com/in/desheng-kong/','github':'https://github.com/fgzz12138',
             'cv':'/Desheng_Kong_CV.pdf; existing file confirmed, content currency not verified.',
             'contact_route':'A new /contact route is a proposal, not an existing deployed page.'},
          'source_fact_files':['Original website app/about/page.tsx','Original website app/page.tsx','Original website app/components/CurrentlyLearning.tsx','Original website public/Desheng_Kong_CV.pdf (existence only)'],
          'raster_assets':[], 'master':master,'pages':pages,
          'fidelity_limit':'The new pages reuse the established M0 type, color, navigation and geometry family; they have no prior page screenshot to match. Arial availability may change metrics across environments.'}
    (ROOT/'layout-spec.json').write_text(json.dumps(spec,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'pages':[{'file':p['file'],'native_text':p['native_text_elements'],'tspan':p['native_tspan_elements'],'groups':len(p['semantic_groups']),'images':p['embedded_local_crops']} for p in pages],'master':master},indent=2))


if __name__=='__main__': main()
