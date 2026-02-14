export type ProjectCategory = "Web" | "Game";

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tech: string[];

  // optional
  demo?: string;
  github?: string;

  // detail page content (optional but recommended)
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: "portfolio-v1",
    title: "Portfolio v1 (This Site)",
    description:
      "My personal portfolio built with Next.js, TypeScript and Tailwind, deployed on Vercel.",
    category: "Web",
    tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    demo: "https://deshengkong.com",
    highlights: [
      "App Router structure with clean routing",
      "Projects list + dynamic detail pages",
      "Deployed on Vercel with custom domain",
    ],
  },
  {
    slug: "no-boss",
    title: "NO BOSS",
    description: "A fast-paced 2D action game built with Unity.",
    category: "Game",
    tech: ["Unity", "C#", "AI"],
    highlights: [
      "Enemy AI behaviours and state transitions",
      "Combat feel tuning and difficulty iteration",
      "UI/UX polish for gameplay feedback",
    ],
  },
  {
    slug: "paint-cube",
    title: "Paint Cube",
    description: "A casual puzzle game focused on color mechanics.",
    category: "Game",
    tech: ["Unity", "Game Design"],
    highlights: [
      "Core color mechanic and level progression",
      "Simple onboarding and readable visuals",
      "Iterated puzzle difficulty and pacing",
    ],
  },
];
