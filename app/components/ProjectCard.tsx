import Link from "next/link";
import Image from "next/image";
import type { Project } from "../content/projects";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black/15 hover:shadow-2xl hover:shadow-black/10"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100">
        <Image
          src={p.thumbnail}
          alt={p.title}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Content */}
      <div className="p-6">
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
      </div>
    </Link>
  );
}
