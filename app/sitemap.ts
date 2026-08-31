import type { MetadataRoute } from "next";
import { featuredProjects } from "./content/portfolio";
import { projects } from "./content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://www.deshengkong.com";
  const slugs = [...new Set([...projects, ...featuredProjects].map((project) => project.slug))];
  return ["", "/about", "/contact", "/projects", ...slugs.map((slug) => "/projects/" + slug)]
    .map((path) => ({ url: origin + path, changeFrequency: path ? "monthly" : "weekly", priority: path ? 0.7 : 1 }));
}
