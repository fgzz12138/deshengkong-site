import Link from "next/link";

export default function CompanyWebsitePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-gray-500 hover:text-black"
      >
        ← Back to Home
      </Link>

      <div className="space-y-8">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-500">
            Web Project
          </p>
          <h1 className="text-4xl font-bold text-black">
            Corporate Website Development
          </h1>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200">
          <img
            src="/projectThumbnail/company2.png"
            alt="Corporate Website Development"
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
          <section className="space-y-6 text-gray-700 leading-8">
            <div>
              <h2 className="mb-3 text-2xl font-semibold text-black">
                Overview
              </h2>
              <p>
                During my internship, I contributed to the development and
                refinement of a corporate website, focusing on content
                structure, layout optimization, and overall user experience.
                This project helped me understand how real-world business
                websites are planned, adjusted, and improved based on both
                branding and usability needs.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold text-black">
                What I Worked On
              </h2>
              <p>
                My work mainly involved adjusting page layouts, improving visual
                hierarchy, refining section spacing, and supporting responsive
                behavior across different screen sizes. I also assisted with
                content updates and page management through WordPress, helping
                ensure the website remained clear, maintainable, and aligned
                with design expectations.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-2xl font-semibold text-black">
                What I Learned
              </h2>
              <p>
                This experience strengthened my practical understanding of HTML,
                CSS, and CMS-based workflows. It also gave me experience working
                in a more realistic production environment, where feedback,
                iteration, and attention to content presentation were just as
                important as writing code.
              </p>
            </div>
          </section>

          <aside className="space-y-6 rounded-2xl border border-gray-200 p-6">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-black">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {["WordPress", "HTML", "CSS"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-300 px-3 py-1 text-sm text-gray-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-black">Focus</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>UI layout refinement</li>
                <li>Content structure improvement</li>
                <li>Responsive adjustment</li>
                <li>WordPress content updates</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
