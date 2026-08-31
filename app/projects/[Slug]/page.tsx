import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "../../components/CaseStudy";
import LegacyProjectDetail from "../../components/LegacyProjectDetail";
import { featuredProjects, getFeaturedProject } from "../../content/portfolio";
import { projects } from "../../content/projects";
import { createPageMetadata } from "../../content/site-metadata";

type Props = { params: Promise<{ Slug: string }> };

export function generateStaticParams() {
  // These historical write-ups have their own static route and full page content.
  const dedicatedRoutes = new Set(["company-website", "ezisight-ecommerce", "portfolio-v1"]);
  const slugs = new Set([...projects.map((project) => project.slug), ...featuredProjects.map((project) => project.slug)]);
  return [...slugs].filter((slug) => !dedicatedRoutes.has(slug)).map((Slug) => ({ Slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { Slug } = await params;
  const featured = getFeaturedProject(Slug);
  const legacy = projects.find((project) => project.slug === Slug);
  if (!featured && !legacy) notFound();
  const title = featured?.title ?? legacy!.title;
  const description = featured?.summary ?? legacy!.description;
  return createPageMetadata({
    title: `${title} | Desheng Kong`,
    description,
    path: `/projects/${Slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: Props) {
  const { Slug } = await params;
  const featured = getFeaturedProject(Slug);
  if (featured) return <CaseStudy project={featured} />;
  const legacy = projects.find((project) => project.slug === Slug);
  if (!legacy) notFound();
  return <LegacyProjectDetail project={legacy} />;
}
