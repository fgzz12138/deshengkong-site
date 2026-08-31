import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, MessageSquare, ShieldCheck } from "lucide-react";
import type { PortfolioCase } from "../content/portfolio";
import PortfolioImage from "./PortfolioImage";
import "../styles/projects.css";

export default function CaseStudy({ project }: { project: PortfolioCase }) {
  return (
    <main id="main-content" className="site-shell case-study">
      <Link className="inline-link case-back" href="/#projects"><ArrowLeft size={16} aria-hidden="true" /> Selected work</Link>
      <section className="case-hero" aria-labelledby="case-title">
        <span className="project-status" data-status={project.status}>{project.status}{project.status === "DEMO" ? " · SYNTHETIC DATA" : ""}</span>
        <h1 id="case-title" className="case-title">{(project.titleLines ?? [project.title]).map((line) => <span key={line}>{line}</span>)}</h1>
        <p className="case-summary">{project.summaryLines ? project.summaryLines.map((line) => <span key={line}>{line}</span>) : project.summary}</p>
        <div className="case-actions">
          {project.demoUrl && <a className="button button-primary" href={project.demoUrl} target="_blank" rel="noopener noreferrer" aria-label="View synthetic-data demo in a new tab">View demo <ArrowUpRight size={18} aria-hidden="true" /></a>}
          <Link className={`button ${project.demoUrl ? "button-outline" : "button-primary"}`} href="/contact">Get in touch</Link>
        </div>
      </section>
      <dl className="case-metadata"><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Focus</dt><dd>{project.focus}</dd></div><div><dt>Stage</dt><dd>{project.stage}</dd></div></dl>
      <figure className="case-figure"><div className="portfolio-image"><PortfolioImage src={project.detailImage ?? project.image} alt={project.detailImageAlt ?? project.imageAlt} eager /></div><figcaption>{project.illustrationLabel} · Not an acceptance screenshot</figcaption></figure>
      <section className="case-contributions" aria-labelledby="contribution-title"><h2 id="contribution-title">My contribution</h2><div className="case-contribution-grid">{project.contributions.map((item, index) => <article key={item.title}><span className="case-number">{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></section>
      <section className="case-outcomes" aria-label="Demonstrated scope and limitations">
        <div className="case-checks"><h2>{project.checksTitle ?? "What this project shows"}</h2><ul>{project.checks.map((check) => <li key={check}><CheckCircle2 size={18} aria-hidden="true" /><span>{check}</span></li>)}</ul></div>
        <aside className="case-boundary"><ShieldCheck size={40} aria-hidden="true" /><div><h2>{project.boundaryTitle}</h2><p>{project.boundary}</p></div></aside>
      </section>
      <section className="contact-band case-contact" aria-label="Discuss a similar project"><MessageSquare size={34} aria-hidden="true" /><p>Have a similar problem to solve?</p><Link className="button button-primary" href="/contact">Get in touch <ArrowRight size={18} aria-hidden="true" /></Link></section>
    </main>
  );
}
