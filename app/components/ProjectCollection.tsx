import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "../content/portfolio";
import { projects } from "../content/projects";
import PortfolioImage from "./PortfolioImage";
import "../styles/projects.css";

export default function ProjectCollection() {
  const featuredSlugs = new Set(featuredProjects.map((project) => project.slug));
  const archive = projects.filter((project) => !featuredSlugs.has(project.slug));
  return (
    <main id="main-content" className="site-shell project-collection">
      <header className="collection-intro"><p className="eyebrow">Selected work & earlier projects</p><h1>Projects</h1><p>Applied AI, practical tools and the web, game and 3D work that came before.</p></header>
      <section aria-labelledby="featured-heading"><h2 className="section-heading" id="featured-heading">Selected work</h2><div className="collection-grid">
        {featuredProjects.map((project) => <Link href={`/projects/${project.slug}`} className="collection-card" key={project.slug}><div className="collection-card-image"><PortfolioImage src={project.image} alt={project.imageAlt} /><span className="collection-image-label">{project.illustrationLabel}</span></div><div className="collection-card-copy"><span className="project-status" data-status={project.status}>{project.status}</span><h3>{project.title}</h3><p>{project.shortSummary}</p><span className="collection-card-link">View case study <ArrowUpRight size={16} aria-hidden="true" /></span></div></Link>)}
      </div></section>
      <section className="collection-archive" aria-labelledby="archive-heading"><h2 className="section-heading" id="archive-heading">Earlier work & supporting projects</h2><p className="collection-note">Preserved project write-ups. Their descriptions reflect the project period; live services and historical outcomes have not been reverified for this portfolio update.</p><div className="collection-grid">
        {archive.map((project) => <Link href={`/projects/${project.slug}`} className="collection-card" key={project.slug}><div className="collection-card-image"><PortfolioImage src={project.thumbnail} alt={`${project.title} project visual`} /><span className="collection-image-label">{project.thumbnail.endsWith(".svg") ? "Concept illustration" : "Historical project visual"}</span></div><div className="collection-card-copy"><span className="collection-category">{project.category} · Earlier work</span><h3>{project.title}</h3><p>{project.description}</p><span className="collection-card-link">Read project <ArrowUpRight size={16} aria-hidden="true" /></span></div></Link>)}
      </div></section>
    </main>
  );
}
