import Link from "next/link";
import { projects } from "./content/projects";

export default function Home() {
  const featured = projects.slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <section className="max-w-3xl">
          <p className="text-sm text-gray-500">Desheng Kong</p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-gray-900">
            Front-end Developer <br />& Game Developer
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            I build modern web applications and indie games. Focused on clean
            UI, performance, and user experience.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-xl bg-black px-5 py-3 text-sm text-white transition hover:opacity-85 hover:-translate-y-0.5"
            >
              View Projects
            </Link>

            <Link
              href="/about"
              className="rounded-xl border px-5 py-3 text-sm transition hover:bg-gray-100 hover:-translate-y-0.5"
            >
              About Me
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="my-20 h-px w-full bg-gray-200" />

        {/* Featured */}
        <section>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Featured Projects
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                A few selected works. See more in Projects.
              </p>
            </div>

            <Link
              href="/projects"
              className="text-sm text-gray-600 hover:text-black"
            >
              View all →
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-tight group-hover:underline">
                    {p.title}
                  </h3>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                    {p.category}
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-600">{p.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border bg-gray-50 px-3 py-1 text-xs text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 text-sm text-gray-500">View details →</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
