import type { Metadata } from "next";
import ProjectCollection from "../components/ProjectCollection";
import { createPageMetadata } from "../content/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects | Desheng Kong",
  description: "Selected applied AI work and earlier web, game and 3D projects by Desheng Kong.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectCollection />;
}
