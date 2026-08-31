import Link from "next/link";
import PortfolioImage from "../../components/PortfolioImage";

const techStack = ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"];

const features = [
  {
    title: "Clear Project Structure",
    description:
      "Projects are grouped by category to improve readability and help users quickly navigate between web, game, and 3D work.",
  },
  {
    title: "Reusable UI Components",
    description:
      "The site is built with reusable sections and consistent card patterns to keep the interface maintainable and scalable.",
  },
  {
    title: "Responsive Layout",
    description:
      "Layouts, spacing, and typography were adjusted to remain clean and readable across different screen sizes.",
  },
  {
    title: "Mixed Routing Strategy",
    description:
      "General projects use dynamic routing, while selected web projects have dedicated pages for more detailed storytelling.",
  },
];

export default function PortfolioV1Page() {
  return (
    <main id="main-content" className="min-h-screen bg-white py-16 text-black">
      <aside className="site-shell mb-8 border-l-4 border-blue-200 bg-blue-50 px-5 py-4 text-sm leading-6 text-slate-600">
        Historical project write-up. Descriptions and screenshots reflect the project period; current service availability and historical outcomes have not been reverified for this portfolio update.
      </aside>
      <div className="site-shell">
        {/* Back link */}
        <Link
          href="/"
          className="mb-10 inline-flex text-sm text-gray-500 transition hover:text-black"
        >
          ← Back to Home
        </Link>

        {/* =========================
            HERO SECTION
        ========================= */}
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Personal Web Project
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Portfolio
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              This is my personal portfolio website built to present my work,
              demonstrate my frontend development skills, and create a clean,
              structured, and professional online presence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* Replace with your real live site link */}
              <a
                href="https://www.deshengkong.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Visit Live Site
              </a>

              {/* Replace with your repo link if public */}
              <a
                href="https://github.com/fgzz12138/deshengkong-site"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
              >
                View Code
              </a>
            </div>
          </div>

          {/* Hero screenshot wrapper */}
          <div className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            {/* Replace only if your image path changes */}
            <PortfolioImage
              src="/ProjectImages/Portfolio/Hero.png"
              alt="Portfolio hero section screenshot"
              className="w-full object-cover"
            />
          </div>
        </section>

        {/* =========================
            OVERVIEW
        ========================= */}
        <section className="mt-20 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Why I built this project
            </h2>
          </div>

          <div className="space-y-5 text-gray-600">
            <p className="leading-8">
              I built this portfolio to create a stronger and more professional
              way to present my work. Instead of showing projects in a simple
              list, I wanted the site itself to reflect my frontend development
              ability through structure, clarity, and visual consistency.
            </p>

            <p className="leading-8">
              The project also gave me a space to combine different interests,
              including web development, game projects, and 3D work, while still
              keeping the browsing experience organized and easy to understand.
            </p>
          </div>
        </section>

        {/* =========================
            DESIGN THINKING
        ========================= */}
        <section className="mt-20 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-gray-200 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Design Thinking
            </p>
            <h2 className="mt-3 text-2xl font-semibold">UX decisions</h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600">
              <p>
                I focused on creating a simple visual hierarchy through spacing,
                typography, and consistent card design so users can quickly scan
                projects and understand the overall structure of the site.
              </p>
              <p>
                Grouping projects into Web, Game, and 3D categories helps make
                the content easier to browse and gives each type of work a
                clearer identity.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Development
            </p>
            <h2 className="mt-3 text-2xl font-semibold">How I built it</h2>

            <div className="mt-6 space-y-4 text-sm leading-7 text-gray-600">
              <p>
                The site is built with Next.js, TypeScript, and Tailwind CSS
                using a component-based structure that is easier to maintain and
                extend over time.
              </p>
              <p>
                I also used a mixed routing approach: general projects are
                handled through dynamic routing, while selected web projects use
                dedicated pages for more tailored presentation.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            KEY FEATURES
        ========================= */}
        <section className="mt-20">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Key Features
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            What this project demonstrates
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {features.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-gray-200 p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================
            SCREENSHOTS SHOWCASE
        ========================= */}
        <section className="mt-20">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Key Screens
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Selected views from the project
          </h2>
          <p className="mt-4 max-w-3xl text-gray-600 leading-8">
            These screenshots show the landing experience, the categorized
            project overview, and the structured detail-page presentation used
            to communicate selected work more clearly.
          </p>

          <div className="mt-10 space-y-10">
            {/* Screenshot 1: Hero */}
            <figure className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
              <PortfolioImage
                src="/ProjectImages/Portfolio/Hero.png"
                alt="Portfolio homepage hero screenshot"
                className="w-full object-cover"
              />
              <figcaption className="border-t border-gray-200 px-5 py-4 text-sm text-gray-600">
                Homepage hero section with clear positioning, introduction, and
                primary call-to-action.
              </figcaption>
            </figure>

            {/* Screenshot 2: Projects */}
            <figure className="overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
              <PortfolioImage
                src="/ProjectImages/Portfolio/Projects.png"
                alt="Portfolio projects section screenshot"
                className="w-full object-cover"
              />
              <figcaption className="border-t border-gray-200 px-5 py-4 text-sm text-gray-600">
                Projects are grouped by category to improve readability and help
                users quickly browse different types of work.
              </figcaption>
            </figure>

            {/* Screenshot 3: Detail page placeholder
                Replace this image after you capture the detail-page screenshot.
                Recommended crop:
                - title
                - overview
                - part of design or development section
            */}
            <figure className="overflow-hidden rounded-[28px] border border-dashed border-gray-300 bg-gray-50 shadow-[0_18px_50px_rgba(0,0,0,0.04)]">
              <PortfolioImage
                src="/ProjectImages/Portfolio/ProjectDetail.png"
                alt="Portfolio detail page screenshot placeholder"
                className="w-full object-cover"
              />
              <figcaption className="border-t border-gray-200 px-5 py-4 text-sm text-gray-600">
                Replace this with a detail-page screenshot that includes the
                project title, overview, and part of the design or development
                section.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* =========================
    RESULT / REFLECTION
========================= */}
        <section className="mt-20 space-y-6 rounded-[32px] bg-black p-8 text-white md:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            Result
          </p>

          <h2 className="max-w-4xl text-3xl font-semibold md:text-4xl">
            Built a structured and scalable personal project that demonstrates
            both frontend development and product thinking.
          </h2>

          <p className="max-w-4xl leading-8 text-white/70">
            This project strengthened my ability to design and develop complete
            web pages with clear content structure, consistent UI patterns, and
            strong visual hierarchy. It also reflects how I approach problem
            solving, iteration, and presenting ideas in a user-focused way.
          </p>

          <p className="max-w-4xl leading-8 text-white/70">
            Through this project, I improved my workflow in planning layouts,
            refining components, and ensuring scalability for future updates,
            while maintaining a clean and professional user experience.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              href="/"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:border-white"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
