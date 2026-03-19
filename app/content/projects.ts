export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  thumbnail: string;
  demo?: string;
  github?: string;
  highlights?: string[];
};

export const projects: Project[] = [
  {
    slug: "company-website",
    title: "Corporate Website Development",
    category: "Web",
    description:
      "Contributed to the development of a company website during an internship, focusing on content structure, UI layout, and user experience optimization.",
    tech: ["WordPress", "HTML", "CSS"],
    thumbnail: "/projectThumbnail/company2.png",
  },
  {
    slug: "portfolio-v1",
    title: "Portfolio v1 (This Site)",
    category: "Web",
    description:
      "My personal portfolio built with Next.js, TypeScript and Tailwind, deployed on Vercel.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    thumbnail: "/projectThumbnail/portfolio.png",
  },
  {
    slug: "no-boss",
    title: "NO BOSS",
    category: "Game",
    description: "A fast-paced 2D action game built with Unity.",
    tech: ["Unity", "C#", "AI"],
    thumbnail: "/projectThumbnail/noboss1.png",
  },
  {
    slug: "run-sheep",
    title: "Run Sheep",
    category: "Game",
    description:
      "A fast-paced casual game where players control a sheep to avoid obstacles and survive as long as possible. Focused on simple mechanics and responsive gameplay.",
    tech: ["Unity", "C#", "Game Design"],
    thumbnail: "/projectThumbnail/runsheep1.png",
    demo: "https://kenditoncom.wordpress.com/run-sheep/",
  },
  {
    slug: "paint-cube",
    title: "Paint Cube",
    category: "Game",
    description: "A casual puzzle game focused on color mechanics.",
    tech: ["Unity", "Game Design"],
    thumbnail: "/projectThumbnail/paintbox.png",
  },

  {
    slug: "3d-environment-01",
    title: "3D Environment Study",
    category: "3D",
    description:
      "A collection of environment artworks focusing on lighting, composition, and atmosphere using Blender.",
    tech: ["Blender", "Rendering", "Lighting"],
    thumbnail: "/projectThumbnail/artwork1.jpg",
    demo: "https://express.adobe.com/page/zYgYE7pNuzhmd/",
  },

  {
    slug: "3d-material-study",
    title: "Material & Lighting Study",
    category: "3D",
    description:
      "A series of experiments exploring materials, textures, and lighting setups to achieve realistic visual results.",
    tech: ["Blender", "Shading", "Lighting"],
    thumbnail: "/projectThumbnail/artwork2.png",
    demo: "https://express.adobe.com/page/9kHQZ3agPN5qH/",
  },
];
