import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Project } from "../content/projects";
import PortfolioImage from "./PortfolioImage";
import "../styles/projects.css";

function ParagraphSection({ title, text }: { title: string; text?: string }) {
  return text ? <section className="legacy-section"><h2>{title}</h2><p>{text}</p></section> : null;
}

function ListSection({ title, items, ordered = false }: { title: string; items?: string[]; ordered?: boolean }) {
  if (!items?.length) return null;
  const List = ordered ? "ol" : "ul";
  return <section className="legacy-section"><h2>{title}</h2><List>{items.map((item) => <li key={item}>{item}</li>)}</List></section>;
}

export default function LegacyProjectDetail({ project }: { project: Project }) {
  const isSourceLink = project.demo?.includes("github.com/");
  return (
    <main id="main-content" className="site-shell legacy-project">
      <Link className="inline-link" href="/projects"><ArrowLeft size={16} aria-hidden="true" /> All projects</Link>
      <header className="legacy-hero"><p className="eyebrow">{project.category} · Earlier work</p><h1>{project.title}</h1>{project.tagline && <p className="legacy-tagline">{project.tagline}</p>}<p>{project.description}</p><ul className="legacy-tech" aria-label="Technologies">{project.tech.map((tech) => <li key={tech}>{tech}</li>)}</ul></header>
      <aside className="legacy-notice">Historical project write-up. Descriptions reflect the project period; current service availability and historical outcomes have not been reverified for this portfolio update.</aside>
      <div className="case-actions">
        {project.demo && <a className="button button-outline" href={project.demo} target="_blank" rel="noopener noreferrer">{isSourceLink ? "View project repository" : "Open project link"}<ArrowUpRight size={16} aria-hidden="true" /></a>}
        {project.github && project.github !== project.demo && <a className="button button-outline" href={project.github} target="_blank" rel="noopener noreferrer">View code<ArrowUpRight size={16} aria-hidden="true" /></a>}
        {project.caseStudy && <a className="button button-outline" href={project.caseStudy} target="_blank" rel="noopener noreferrer">Related case study<ArrowUpRight size={16} aria-hidden="true" /></a>}
      </div>
      <figure className="legacy-hero-image"><div className="portfolio-image"><PortfolioImage src={project.thumbnail} alt={`${project.title} project visual`} eager /></div><figcaption>{project.thumbnail.endsWith(".svg") ? "Concept illustration · Not an acceptance screenshot" : "Historical project visual"}</figcaption></figure>
      <ParagraphSection title="Overview" text={project.overview} />
      <ParagraphSection title="Audience" text={project.audience} />
      <ParagraphSection title="The problem" text={project.problem} />
      {(project.role || project.team || project.timeframe) && <dl className="legacy-facts">{project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}{project.team && <div><dt>Team</dt><dd>{project.team}</dd></div>}{project.timeframe && <div><dt>Period</dt><dd>{project.timeframe}</dd></div>}</dl>}
      <ListSection title="Highlights" items={project.highlights} />
      {project.features?.length ? <section className="legacy-section"><h2>Features</h2><div className="legacy-feature-grid">{project.features.map((feature) => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div></section> : null}
      <ListSection title="Process" items={project.process} ordered />
      <ParagraphSection title="Workflow" text={project.workflow} />
      <ParagraphSection title="System" text={project.system} />
      {project.flowDiagram?.length ? <section className="legacy-section"><h2>System flow</h2><ol className="legacy-flow">{project.flowDiagram.map((step) => <li key={step.label}><h3>{step.label}</h3>{step.description && <p>{step.description}</p>}</li>)}</ol></section> : null}
      <ListSection title="Challenges" items={project.challenges} />
      <ListSection title="Improvements" items={project.improvements} />
      {project.images?.length ? <section className="legacy-section"><h2>Project images</h2><div className="legacy-gallery">{project.images.map((image, index) => <figure key={image}><div className="portfolio-image"><PortfolioImage src={image} alt={`${project.title}, historical project view ${index + 1}`} /></div><figcaption>Historical project view {index + 1}</figcaption></figure>)}</div></section> : null}
      {project.demoVideo && <section className="legacy-section"><h2>Project video</h2><a className="inline-link" href={project.demoVideo} target="_blank" rel="noopener noreferrer">Open recorded project video<ArrowUpRight size={16} aria-hidden="true" /></a></section>}
      <ParagraphSection title="Recorded result" text={project.result} />
      <ParagraphSection title="Reflection" text={project.reflection} />
      <ParagraphSection title="Next step at the time" text={project.nextStep} />
      <div className="legacy-footer-links"><Link className="inline-link" href="/projects">All projects <ArrowLeft size={16} aria-hidden="true" /></Link><Link className="button button-primary" href="/contact">Get in touch</Link></div>
    </main>
  );
}
