# CV source

`generate_cv.py` is the reproducible source for the PDF offered on the portfolio contact page.

The September 2026 update aligns the CV with the current LinkedIn profile and the reviewed public portfolio copy:

- Analyst Programmer at Ultimate AI Australia, Sep 2026 - Present
- Frontend Developer at UltimAite Strata Robotics, Jan 2026 - Sep 2026
- backend, applied AI and systems-focused summary and skills
- selected work wording carried from `app/content/portfolio.ts`

Generate the website asset with the bundled Codex Python runtime:

```powershell
cd E:\gitclone\deshengkong-site-m1
& 'C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' docs\cv\generate_cv.py --output public\Desheng_Kong_CV.pdf
```

The CV keeps the existing public phone number and portfolio contact email. LinkedIn was used to verify role titles, dates, employment types, locations and role descriptions on 2026-09-01.
