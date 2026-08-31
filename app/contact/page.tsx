import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, ArrowUpRight, FileDown,
  Github, Linkedin, Mail, MessagesSquare,
} from "lucide-react";
import { contactLinks } from "../content/contact";
import { createPageMetadata } from "../content/site-metadata";
import "../styles/about-contact.css";

export const metadata: Metadata = createPageMetadata({
  title: "Get in touch | Desheng Kong",
  description:
    "Get in touch with Desheng Kong about applied AI, product interfaces and practical workflows. Find his email, LinkedIn, GitHub and CV.",
  path: "/contact",
});

const enquiryContext = [
  { title: "Your goal", description: "What would you like to make, improve or understand?" },
  { title: "What you have now", description: "The current system, workflow or starting point." },
  { title: "Timing", description: "Any target dates or constraints worth knowing." },
];

export default function ContactPage() {
  return (
    <main id="main-content" className="ac-page ac-contact-page">
      <div className="site-shell">
        <section className="ac-contact-hero" aria-labelledby="contact-heading">
          <div>
            <p className="eyebrow">Get in touch</p>
            <h1 id="contact-heading">Let’s talk.</h1>
            <p className="ac-contact-intro">
              Have a practical AI problem to solve?
              <br className="ac-desktop-break" /> Tell me what you’re working on.
            </p>
          </div>
          <MessagesSquare className="ac-contact-hero-icon" aria-hidden="true" />
        </section>

        <section className="ac-email-card" aria-labelledby="email-heading">
          <h2 id="email-heading" className="eyebrow">Email</h2>
          <p className="ac-email-address">{contactLinks.email}</p>
          <div className="ac-email-actions">
            <a
              href={contactLinks.gmailCompose}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary ac-action"
              aria-describedby="gmail-behavior"
            >
              Email me <ArrowUpRight aria-hidden="true" size={20} />
            </a>
            <p id="gmail-behavior">Opens Gmail in a new tab.</p>
          </div>
          <Mail className="ac-email-icon" aria-hidden="true" />
        </section>

        <nav className="ac-profile-links" aria-label="Professional profiles and CV">
          <a
            className="ac-profile-link"
            href={contactLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn: profile and background (opens in a new tab)"
          >
            <Linkedin className="ac-profile-link-icon" aria-hidden="true" />
            <ArrowUpRight className="ac-profile-link-arrow" aria-hidden="true" />
            <span className="ac-profile-link-title">LinkedIn</span>
            <span className="ac-profile-link-description">Profile &amp; background</span>
          </a>
          <a
            className="ac-profile-link"
            href={contactLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub: projects and code (opens in a new tab)"
          >
            <Github className="ac-profile-link-icon" aria-hidden="true" />
            <ArrowUpRight className="ac-profile-link-arrow" aria-hidden="true" />
            <span className="ac-profile-link-title">GitHub</span>
            <span className="ac-profile-link-description">Projects &amp; code</span>
          </a>
          <a className="ac-profile-link" href={contactLinks.cv} download>
            <FileDown className="ac-profile-link-icon" aria-hidden="true" />
            <ArrowDown className="ac-profile-link-arrow" aria-hidden="true" />
            <span className="ac-profile-link-title">Download CV</span>
            <span className="ac-profile-link-description">Resume PDF</span>
          </a>
        </nav>

        <section className="ac-enquiry-context" aria-labelledby="enquiry-heading">
          <h2 id="enquiry-heading" className="section-heading">Useful to include</h2>
          <p className="ac-section-intro">
            A little context helps make the conversation specific.
          </p>
          <ol className="ac-enquiry-list">
            {enquiryContext.map((item, index) => (
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

        <section
          className="contact-band ac-contact-band ac-contact-work-band"
          aria-labelledby="more-work-heading"
        >
          <div className="ac-contact-band-copy">
            <p>Want to see the work first?</p>
            <h2 id="more-work-heading">Explore selected projects.</h2>
          </div>
          <div className="ac-contact-band-actions">
            <Link href="/#projects" className="button button-outline ac-action">
              View projects <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
