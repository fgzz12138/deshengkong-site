"""Generate the one-page CV published by the portfolio site.

Run with the bundled Codex Python runtime or any Python environment that has
ReportLab installed:

    python docs/cv/generate_cv.py --output public/Desheng_Kong_CV.pdf
"""

from __future__ import annotations

import argparse
from pathlib import Path
from typing import Iterable

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


PAGE_WIDTH, PAGE_HEIGHT = A4
LEFT = 31
RIGHT = 31
CONTENT_WIDTH = PAGE_WIDTH - LEFT - RIGHT

INK = HexColor("#111111")
MUTED = HexColor("#353535")
RULE = HexColor("#1A1A1A")

REGULAR_FONT = "Helvetica"
BOLD_FONT = "Helvetica-Bold"


def register_fonts() -> None:
    """Use Arial when available and keep a portable Helvetica fallback."""

    global REGULAR_FONT, BOLD_FONT
    regular = Path(r"C:\Windows\Fonts\arial.ttf")
    bold = Path(r"C:\Windows\Fonts\arialbd.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("CVArial", str(regular)))
        pdfmetrics.registerFont(TTFont("CVArial-Bold", str(bold)))
        REGULAR_FONT = "CVArial"
        BOLD_FONT = "CVArial-Bold"


def wrapped_lines(text: str, font_name: str, font_size: float, width: float) -> list[str]:
    words = text.split()
    if not words:
        return [""]

    lines: list[str] = []
    current = words[0]
    for word in words[1:]:
        candidate = f"{current} {word}"
        if pdfmetrics.stringWidth(candidate, font_name, font_size) <= width:
            current = candidate
        else:
            lines.append(current)
            current = word
    lines.append(current)
    return lines


def draw_wrapped(
    c: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: float,
    *,
    font_name: str | None = None,
    font_size: float = 9.8,
    leading: float = 12.4,
    color=MUTED,
) -> float:
    font_name = font_name or REGULAR_FONT
    c.setFont(font_name, font_size)
    c.setFillColor(color)
    for line in wrapped_lines(text, font_name, font_size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_bullets(
    c: canvas.Canvas,
    bullets: Iterable[str],
    y: float,
    *,
    font_size: float = 9.55,
    leading: float = 12.1,
    gap: float = 2.3,
) -> float:
    text_x = LEFT + 13
    text_width = CONTENT_WIDTH - 13
    for bullet in bullets:
        lines = wrapped_lines(bullet, REGULAR_FONT, font_size, text_width)
        c.setFillColor(INK)
        c.circle(LEFT + 2.6, y + 3.1, 1.45, stroke=0, fill=1)
        c.setFont(REGULAR_FONT, font_size)
        c.setFillColor(MUTED)
        for line in lines:
            c.drawString(text_x, y, line)
            y -= leading
        y -= gap
    return y


def draw_rule(c: canvas.Canvas, y: float) -> None:
    c.setStrokeColor(RULE)
    c.setLineWidth(0.7)
    c.line(LEFT - 12, y, PAGE_WIDTH - RIGHT + 12, y)


def draw_section_heading(c: canvas.Canvas, title: str, y: float) -> float:
    draw_rule(c, y)
    y -= 20
    c.setFont(BOLD_FONT, 12.7)
    c.setFillColor(INK)
    c.drawString(LEFT, y, title.upper())
    return y - 18


def draw_contact_row(c: canvas.Canvas, y: float) -> None:
    items = [
        ("+61 413 439 408", "tel:+61413439408"),
        ("desheng.kong408@gmail.com", "mailto:desheng.kong408@gmail.com"),
        ("deshengkong.com", "https://www.deshengkong.com/"),
        ("linkedin.com/in/desheng-kong", "https://www.linkedin.com/in/desheng-kong/"),
    ]
    font_size = 9.0
    separator = "  |  "
    separator_width = pdfmetrics.stringWidth(separator, REGULAR_FONT, font_size)
    widths = [pdfmetrics.stringWidth(label, REGULAR_FONT, font_size) for label, _ in items]
    total = sum(widths) + separator_width * (len(items) - 1)
    x = (PAGE_WIDTH - total) / 2

    c.setFont(REGULAR_FONT, font_size)
    c.setFillColor(MUTED)
    for index, ((label, target), width) in enumerate(zip(items, widths)):
        c.drawString(x, y, label)
        c.linkURL(target, (x, y - 2, x + width, y + font_size + 1), relative=0)
        x += width
        if index < len(items) - 1:
            c.drawString(x, y, separator)
            x += separator_width


def draw_role(
    c: canvas.Canvas,
    *,
    title: str,
    date: str,
    company_line: str,
    bullets: list[str],
    y: float,
) -> float:
    c.setFont(BOLD_FONT, 11.2)
    c.setFillColor(INK)
    c.drawString(LEFT, y, title)
    date_width = pdfmetrics.stringWidth(date, BOLD_FONT, 10.5)
    c.setFont(BOLD_FONT, 10.5)
    c.drawString(PAGE_WIDTH - RIGHT - date_width, y, date)
    y -= 14.5

    c.setFont(BOLD_FONT, 9.85)
    c.setFillColor(MUTED)
    c.drawString(LEFT, y, company_line)
    y -= 16
    return draw_bullets(c, bullets, y)


def build_cv(output: Path) -> None:
    register_fonts()
    output.parent.mkdir(parents=True, exist_ok=True)

    c = canvas.Canvas(str(output), pagesize=A4, pageCompression=1)
    c.setTitle("Desheng Kong - CV")
    c.setAuthor("Desheng Kong")
    c.setSubject("Analyst Programmer - Applied AI and Backend Systems")
    c.setCreator("ReportLab - reproducible source in the portfolio repository")
    c.setKeywords("Analyst Programmer, Python, FastAPI, REST APIs, Applied AI, RAG, React, Next.js")

    y = PAGE_HEIGHT - 34
    c.setFont(BOLD_FONT, 24)
    c.setFillColor(INK)
    name = "Desheng Kong"
    c.drawString((PAGE_WIDTH - pdfmetrics.stringWidth(name, BOLD_FONT, 24)) / 2, y, name)
    y -= 18

    c.setFont(REGULAR_FONT, 10.0)
    c.setFillColor(MUTED)
    headline = "Analyst Programmer | Applied AI and Backend Systems"
    c.drawString((PAGE_WIDTH - pdfmetrics.stringWidth(headline, REGULAR_FONT, 10.0)) / 2, y, headline)
    y -= 17
    draw_contact_row(c, y)
    y -= 18

    y = draw_section_heading(c, "Summary", y)
    y = draw_wrapped(
        c,
        "Analyst Programmer focused on backend engineering, server-side systems and applied AI integration. "
        "Builds secure Python and FastAPI services, REST APIs and AI-enabled workflows, with experience in "
        "Linux deployment, authentication, monitoring and modern front-end development.",
        LEFT,
        y,
        CONTENT_WIDTH,
        font_size=10.0,
        leading=12.7,
    )
    y -= 6

    y = draw_section_heading(c, "Core Skills", y)
    skill_rows = [
        ("Backend and AI", "Python, FastAPI, REST APIs, LLM integration, embeddings, RAG, speech services"),
        ("Systems", "Linux, authentication, access control, API-key management, rate limiting, logging and monitoring"),
        ("Front end", "React, Next.js, TypeScript, Tailwind CSS and responsive UI development"),
    ]
    for label, detail in skill_rows:
        label_text = f"{label}:"
        c.setFont(BOLD_FONT, 9.7)
        c.setFillColor(INK)
        c.drawString(LEFT, y, label_text)
        label_width = pdfmetrics.stringWidth(label_text, BOLD_FONT, 9.7) + 5
        y = draw_wrapped(
            c,
            detail,
            LEFT + label_width,
            y,
            CONTENT_WIDTH - label_width,
            font_size=9.7,
            leading=12.0,
        )
        y -= 1.5
    y -= 4

    y = draw_section_heading(c, "Work Experience", y)
    y = draw_role(
        c,
        title="Analyst Programmer",
        date="Sep 2026 - Present",
        company_line="Ultimate AI Australia | Full-time | Melbourne, VIC (On-site)",
        bullets=[
            "Analyse requirements and design secure backend services, API gateways and AI-enabled applications.",
            "Develop and maintain Python and FastAPI backend services with reliable APIs and maintainable system architecture.",
            "Integrate approved LLM, embedding, RAG, speech and related AI services into applications.",
            "Implement authentication, access controls, API-key management, rate limiting, logging and monitoring; support Linux deployments, performance testing and incident troubleshooting.",
        ],
        y=y,
    )
    y -= 5
    y = draw_role(
        c,
        title="Frontend Developer",
        date="Jan 2026 - Sep 2026",
        company_line="UltimAite Strata Robotics | Contract | Melbourne, VIC (On-site)",
        bullets=[
            "Contributed to front-end development and website optimisation, delivering updates efficiently while maintaining code quality and user experience.",
            "Used AI-assisted tools to understand existing codebases, implement changes and improve structure, readability and development efficiency.",
            "Built and refined responsive layouts from design requirements, improving projects through rapid iteration, problem-solving and close attention to detail.",
        ],
        y=y,
    )
    y -= 3

    y = draw_section_heading(c, "Selected Work", y)
    selected_work = [
        (
            "Virtual Concierge | Field-tested integration",
            "Connected venue-specific knowledge retrieval with a voice and touchscreen kiosk, worked on speech output and an asynchronous interaction pipeline, and supported field validation.",
        ),
        (
            "UAI API Customer Portal | Demonstration",
            "Defined the customer journey across access, usage and request testing, shaped responsive success and failure states, and kept the public demo limited to synthetic data.",
        ),
    ]
    for title, description in selected_work:
        c.setFont(BOLD_FONT, 10.1)
        c.setFillColor(INK)
        c.drawString(LEFT, y, title)
        y -= 13
        y = draw_wrapped(c, description, LEFT + 12, y, CONTENT_WIDTH - 12, font_size=9.55, leading=12.1)
        y -= 5
    y -= 1

    y = draw_section_heading(c, "Education", y)
    c.setFont(BOLD_FONT, 10.1)
    c.setFillColor(INK)
    c.drawString(LEFT, y, "QUT (Queensland University of Technology)")
    y -= 13
    y = draw_wrapped(
        c,
        "Bachelor of Games and Interactive Environments (Software Development) | Feb 2020 - Nov 2023",
        LEFT,
        y,
        CONTENT_WIDTH,
        font_size=9.7,
        leading=12.1,
    )

    if y < 44:
        raise RuntimeError(f"CV content exceeds safe one-page boundary: y={y:.1f}")

    c.showPage()
    c.save()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("public/Desheng_Kong_CV.pdf"),
        help="Destination PDF path",
    )
    args = parser.parse_args()
    build_cv(args.output.resolve())
    print(args.output.resolve())


if __name__ == "__main__":
    main()
