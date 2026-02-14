import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "../../content/projects";

export default function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/projects"
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Back to Projects
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main */}
          <section className="lg:col-span-2">
            <div className="rounded-2xl border bg-white p-8">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-semibold tracking-tight">
                  {project.title}
                </h1>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                  {project.category}
                </span>
              </div>

              <p className="mt-4 text-gray-600">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border bg-gray-50 px-3 py-1 text-xs text-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {(project.demo || project.github) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-85"
                    >
                      Live / Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Side card */}
          <aside className="lg:col-span-1">
            <div className="rounded-2xl border bg-white p-8">
              <h2 className="text-sm font-semibold text-gray-900">
                Highlights
              </h2>

              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                {(project.highlights?.length
                  ? project.highlights
                  : [
                      "Add 2–4 bullet points here later",
                      "Focus on what you built and why it matters",
                      "Mention technical challenges and outcomes",
                    ]
                ).map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
