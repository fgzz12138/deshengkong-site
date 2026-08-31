import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, AudioLines, BrainCircuit, MessagesSquare, PanelsTopLeft, Puzzle } from "lucide-react";
import { featuredProjects } from "./content/portfolio";
import PortfolioImage from "./components/PortfolioImage";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main id="main-content" className="site-shell">
      <section className="home-hero" aria-labelledby="home-heading">
        <div>
          <p className="eyebrow">Applied AI · Melbourne</p>
          <h1 id="home-heading" className="home-title"><span>AI systems.</span><span>Built for</span><span>real work.</span></h1>
          <p className="home-summary home-summary-desktop">I connect AI capabilities, product interfaces<br />and everyday workflows.</p>
          <p className="home-summary home-summary-mobile">Applied AI, practical tools<br />and clear workflows.</p>
          <div className="home-actions">
            <Link className="button button-primary" href="#projects"><span className="desktop-action-label">Explore selected work</span><span className="mobile-action-label">Explore my work</span><ArrowDown aria-hidden="true" /></Link>
            <Link className="inline-link home-about" href="/about">About me<ArrowRight aria-hidden="true" /></Link>
            <Link className="inline-link home-contact-mobile" href="/contact">Get in touch<ArrowRight aria-hidden="true" /></Link>
          </div>
        </div>
        <PortfolioImage src="/portfolio/hero-system.svg" alt="Conceptual illustration connecting an interface, knowledge and workflow. Illustrative system view." className="hero-system" eager />
      </section>
      <div className="capabilities" aria-label="Focus areas">
        <div className="capability"><AudioLines aria-hidden="true" /><span>Voice &amp; RAG</span></div>
        <div className="capability"><Puzzle aria-hidden="true" /><span>Workflow automation</span></div>
        <div className="capability"><BrainCircuit aria-hidden="true" /><span>Applied AI</span></div>
        <div className="capability"><PanelsTopLeft aria-hidden="true" /><span>Web interfaces</span></div>
      </div>
      <div className="mobile-capabilities" aria-label="Focus areas"><span>AI</span><span>Interfaces</span><span>Workflows</span></div>
      <section id="projects" className="selected-work" aria-labelledby="work-heading">
        <span id="work" aria-hidden="true" />
        <div className="work-heading">
          <div><h2 id="work-heading" className="section-heading">Selected work</h2><p>Applied AI, practical tools and the work behind them.</p></div>
          <Link href="/projects" className="inline-link work-all">All projects<ArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="work-grid">
          {featuredProjects.map((project) => <article key={project.slug} className="work-card">
            <div className="work-visual"><PortfolioImage src={project.image} alt={project.imageAlt} /><span className="illustration-label">{project.illustrationLabel}</span></div>
            <div className="work-card-body">
              <span className="project-status" data-status={project.status}>{project.status}</span>
              <h3><Link href={"/projects/" + project.slug}>{project.title}</Link></h3>
              <p>{project.shortSummary}</p>
              <Link href={"/projects/" + project.slug} className="inline-link" aria-label={"View " + project.title + " case study"}>View case study<ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </article>)}
        </div>
      </section>
      <section className="contact-band home-contact" aria-labelledby="home-contact-heading">
        <MessagesSquare aria-hidden="true" /><div><p>Have a practical AI problem to solve?</p><h2 id="home-contact-heading">Let’s talk.</h2></div>
        <Link href="/contact" className="button button-primary">Get in touch<ArrowRight aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
