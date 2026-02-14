"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { projects, ProjectCategory } from "../content/projects";

const filters: Array<"All" | ProjectCategory> = ["All", "Web", "Game"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const list = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
            <p className="mt-3 max-w-2xl text-gray-600">
              Web apps and indie games — each project has its own page.
            </p>
          </div>

          <div className="inline-flex rounded-2xl border bg-white p-1">
            {filters.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={[
                    "px-4 py-2 text-sm rounded-xl transition",
                    active
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {f}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group rounded-2xl border bg-white p-6 transition hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold leading-tight group-hover:underline">
                  {p.title}
                </h2>
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
      </div>
    </main>
  );
}
