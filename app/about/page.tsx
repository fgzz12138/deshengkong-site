import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessagesSquare } from "lucide-react";
import { contactLinks } from "../content/contact";
import { createPageMetadata } from "../content/site-metadata";
import "../styles/about-contact.css";

export const metadata: Metadata = createPageMetadata({
  title: "About | Desheng Kong",
  description:
    "Meet Desheng Kong, an applied AI systems developer in Melbourne. Explore his front-end background, working approach, current toolkit and ongoing learning.",
  path: "/about",
});

const workingApproach = [
  {
    title: "Understand the system",
    description:
      "Understand how the code and components fit together, including the parts created with AI assistance.",
  },
  {
    title: "Debug and maintain",
    description:
      "Work through issues and understand the system well enough to maintain what I build.",
  },
  {
    title: "Explain the decisions",
    description:
      "Explain the architecture choices behind a system, and the reasons for those decisions.",
  },
];

const toolkit = [
  ["LLM integration", "RAG", "Voice / STT / TTS"],
  ["Next.js", "TypeScript", "Tailwind"],
  ["Python", "Docker"],
];

export default function AboutPage() {
  return (
    <main id="main-content" className="ac-page ac-about-page">
      <div className="site-shell">
        <section className="ac-about-hero" aria-labelledby="about-heading">
          <div className="ac-about-introduction">
            <p className="eyebrow">About me</p>
            <h1 id="about-heading" className="ac-about-title">
              <span>From interfaces</span>
              <span>to AI systems.</span>
            </h1>
            <div className="ac-about-bio">
              <p>
                I’m Desheng Kong, an applied AI systems
                <br className="ac-desktop-break" /> developer based in Melbourne.
              </p>
              <p>
                I work across LLM integration, knowledge retrieval,
                <br className="ac-desktop-break" /> voice interfaces and workflow automation.
              </p>
              <p>
                My front-end background still shapes the interfaces
                <br className="ac-desktop-break" /> I build around these systems.
              </p>
            </div>
            <Link href="/#projects" className="inline-link ac-selected-work-link">
              View selected work <ArrowRight aria-hidden="true" size={19} />
            </Link>
          </div>
          <aside className="ac-profile-card" aria-label="Profile">
            <div className="ac-profile-art" aria-hidden="true">
              <div className="ac-profile-initials">DK</div>
            </div>
            <div className="ac-profile-details">
              <h2>Desheng Kong</h2>
              <p className="ac-profile-location">Melbourne, Australia</p>
              <p className="eyebrow ac-profile-focus">Applied AI</p>
              <p className="ac-profile-topics">Voice · knowledge · workflows</p>
            </div>
          </aside>
        </section>

        <section className="ac-working-approach" aria-labelledby="approach-heading">
          <h2 id="approach-heading" className="section-heading">How I work</h2>
          <p className="ac-section-intro">
            AI-assisted development, grounded in understanding the system.
          </p>
          <ol className="ac-approach-list">
            {workingApproach.map((item, index) => (
              <li key={item.title}>
                <span className="ac-section-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ac-toolkit-section" aria-labelledby="toolkit-heading">
          <div className="ac-toolkit">
            <h2 id="toolkit-heading" className="section-heading">Working toolkit</h2>
            <div className="ac-toolkit-rows">
              {toolkit.map((row, index) => (
                <ul key={index} className="ac-toolkit-row">
                  {row.map((skill) => <li key={skill}>{skill}</li>)}
                </ul>
              ))}
            </div>
          </div>
          <aside className="ac-learning-card" aria-labelledby="learning-heading">
            <h3 id="learning-heading">Currently exploring</h3>
            <p className="ac-learning-topics">
              LangGraph · MCP · n8n<br />RAG evaluation
            </p>
            <div className="ac-course-boundary">
              <p>NL2SQL course case study</p>
              <p>Course learning — not a self-built production product.</p>
            </div>
          </aside>
        </section>

        <section className="ac-background" aria-labelledby="background-heading">
          <h2 id="background-heading" className="section-heading">Background</h2>
          <dl className="ac-background-list">
            <div>
              <dt>Foundation</dt>
              <dd>Web interfaces · Next.js · TypeScript · Tailwind</dd>
            </div>
            <div>
              <dt>Current focus</dt>
              <dd>Applied AI · voice · knowledge retrieval · workflows</dd>
            </div>
          </dl>
        </section>

        <section
          className="contact-band ac-contact-band ac-about-contact-band"
          aria-labelledby="about-contact-heading"
        >
          <MessagesSquare className="ac-contact-band-icon" aria-hidden="true" />
          <div className="ac-contact-band-copy">
            <p>Have a practical AI problem to solve?</p>
            <h2 id="about-contact-heading">Let’s talk.</h2>
          </div>
          <div className="ac-contact-band-actions">
            <a href={contactLinks.cv} download className="button button-outline ac-action">
              Download CV
            </a>
            <Link href="/contact" className="button button-primary ac-action">
              Get in touch <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
