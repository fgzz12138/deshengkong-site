"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects } from "../../content/projects";

export default function ProjectDetail() {
  const pathname = usePathname();
  const slug = pathname.split("/").filter(Boolean).pop() || "";

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="p-10">
        <h1>Project not found</h1>
        <p>Slug: {slug || "empty"}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-black">
            ← Back Home
          </Link>
        </div>

        {/* 1. Hero */}
        <section className="rounded-3xl border bg-white p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-gray-500">
                {project.category}
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
                {project.title}
              </h1>

              {project.tagline && (
                <p className="mt-4 text-lg text-gray-600">{project.tagline}</p>
              )}

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

              <div className="mt-8 flex flex-wrap gap-3">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-85"
                  >
                    Play Demo
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    View Code
                  </a>
                )}

                {project.caseStudy && (
                  <a
                    href={project.caseStudy}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                  >
                    Case Study
                  </a>
                )}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border bg-gray-50">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 2. Overview */}
        {(project.overview || project.audience || project.problem) && (
          <section className="mt-10 rounded-3xl border bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {project.overview && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    What it is
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {project.overview}
                  </p>
                </div>
              )}

              {project.audience && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Who it is for
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {project.audience}
                  </p>
                </div>
              )}

              {project.problem && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Focus</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {project.problem}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 3. My Role */}
        {(project.team || project.role || project.timeframe) && (
          <section className="mt-10 rounded-3xl border bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight">My Role</h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {project.team && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Team</h3>
                  <p className="mt-2 text-sm text-gray-600">{project.team}</p>
                </div>
              )}

              {project.role && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Responsibility
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {project.role}
                  </p>
                </div>
              )}

              {project.timeframe && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Timeframe
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {project.timeframe}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 4. Key Features */}
        {project.features?.length ? (
          <section className="mt-10 rounded-3xl border bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Key Features
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border bg-gray-50 p-5"
                >
                  <h3 className="text-base font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Demo Video */}
        {project.demoVideo && (
          <section className="mt-10 rounded-3xl border bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Demo Video
            </h2>

            <div className="mt-6 overflow-hidden rounded-2xl border">
              <div className="aspect-video w-full">
                <iframe
                  src={project.demoVideo}
                  title={`${project.title} demo video`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        )}

        {/* 5. Process / Build */}
        {(project.process?.length || project.workflow || project.system) && (
          <section className="mt-10 rounded-3xl border bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Process / Build
            </h2>

            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              {project.process?.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Workflow Steps
                  </h3>
                  <ul className="mt-3 space-y-3 text-sm text-gray-600">
                    {project.process.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="space-y-6">
                {project.workflow && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Development Flow
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      {project.workflow}
                    </p>
                  </div>
                )}

                {project.system && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      System Thinking
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      {project.system}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 6. Challenges */}
        {(project.challenges?.length || project.improvements?.length) && (
          <section className="mt-10 rounded-3xl border bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Challenges
            </h2>

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              {project.challenges?.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Difficulties
                  </h3>
                  <ul className="mt-3 space-y-3 text-sm text-gray-600">
                    {project.challenges.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.improvements?.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    What I would improve
                  </h3>
                  <ul className="mt-3 space-y-3 text-sm text-gray-600">
                    {project.improvements.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {/* 7. Result / Reflection */}
        {(project.result || project.reflection || project.nextStep) && (
          <section className="mt-10 rounded-3xl border bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Result / Reflection
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {project.result && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Result
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {project.result}
                  </p>
                </div>
              )}

              {project.reflection && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Reflection
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {project.reflection}
                  </p>
                </div>
              )}

              {project.nextStep && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Next</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    {project.nextStep}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Extra images */}
        {project.images?.length ? (
          <section className="mt-10 rounded-3xl border bg-white p-8">
            <h2 className="text-2xl font-semibold tracking-tight">Gallery</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.images.map((img, index) => (
                <div
                  key={`${img}-${index}`}
                  className="overflow-hidden rounded-2xl border bg-gray-50"
                >
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* 8. CTA */}
        <section className="mt-10 rounded-3xl border bg-white p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Next Step</h2>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            Explore the project further through the available demo, source code,
            or return to the portfolio homepage.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-85"
              >
                Play Demo
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
              >
                View Code
              </a>
            )}

            <Link
              href="/"
              className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
