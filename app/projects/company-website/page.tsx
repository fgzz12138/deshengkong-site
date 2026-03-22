"use client";

import Link from "next/link";
import { useState } from "react";

type PreviewMode = "contain" | "top";

type ZoomImageProps = {
  src: string;
  alt: string;
  heightClass?: string;
  previewMode?: PreviewMode;
};

function ZoomImage({
  src,
  alt,
  heightClass = "h-[360px]",
  previewMode = "contain",
}: ZoomImageProps) {
  const [open, setOpen] = useState(false);

  const previewClass =
    previewMode === "top"
      ? "h-full w-full object-cover object-top"
      : "h-full w-full object-contain";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative flex w-full ${heightClass} items-start justify-center overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 text-left`}
      >
        <img
          src={src}
          alt={alt}
          className={`${previewClass} transition duration-300 group-hover:scale-[1.02]`}
        />

        <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
        <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
          Click to expand
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-6 top-6 text-4xl text-white"
            aria-label="Close image preview"
          >
            ×
          </button>

          <div
            className="flex max-h-[92vh] max-w-[94vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={src}
              alt={alt}
              className="max-h-[92vh] max-w-[94vw] rounded-2xl bg-white object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function CompanyWebsitePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/"
        className="mb-10 inline-block text-sm text-gray-500 transition hover:text-black"
      >
        ← Back to Home
      </Link>

      <div className="space-y-16">
        {/* Header */}
        <section className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
            Web Project · Ongoing
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-black md:text-5xl">
            Corporate Website Development
          </h1>
          <p className="max-w-4xl text-lg leading-8 text-gray-600">
            A real-world internship project focused on website refinement,
            stakeholder feedback implementation, SEO setup, and custom page
            development within a WordPress-based workflow.
          </p>
        </section>

        {/* Hero Image */}
        <section className="relative overflow-hidden rounded-[32px] border border-gray-200 bg-gray-50">
          {/* Image */}
          <img
            src="/projectThumbnail/company2.png"
            alt="Corporate Website Development hero screenshot"
            className="h-[520px] w-full object-cover md:h-[720px]"
          />
        </section>

        {/* Overview */}
        <section className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-black">
              Project Summary
            </h2>
          </div>

          <div className="space-y-5 text-gray-600">
            <p className="leading-8">
              During my internship, I contributed to the development and
              refinement of a corporate website, focusing on UI implementation,
              content structuring, and user experience improvements.
            </p>
            <p className="leading-8">
              The project is still under active development and involves
              continuous iterations based on manager feedback and evolving
              business requirements.
            </p>
          </div>
        </section>

        {/* Contributions */}
        <section className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Contributions
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-black">
              What I Worked On
            </h2>
          </div>

          <ul className="space-y-3 text-gray-600 leading-8">
            <li>
              Translated manager feedback into actionable UI changes and layout
              refinements
            </li>
            <li>Improved spacing, visual hierarchy, and content readability</li>
            <li>
              Configured SEO keywords to improve page visibility and exposure
            </li>
            <li>
              Used AI tools to assist development and improve workflow
              efficiency
            </li>
            <li>
              Built custom page sections using HTML and CSS beyond CMS templates
            </li>
          </ul>
        </section>

        {/* Workflow */}
        <section className="space-y-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Process
            </p>
            <h2 className="mt-3 text-5xl font-semibold text-black">
              Work Flow
            </h2>
          </div>

          {/* Step 1 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-black">
              1. Defining and Implementing SEO Strategy
            </h3>

            <p className="max-w-4xl text-lg leading-8 text-gray-600">
              Worked with the manager to review and refine SEO-related content,
              including page titles, keywords, and descriptions. This involved
              aligning the wording with business goals while ensuring the
              content remains clear and relevant to user search intent.
            </p>

            <p className="max-w-4xl text-base leading-7 text-gray-500">
              After confirming the direction, I implemented the updates directly
              within the CMS by configuring the title, permalink, and meta
              description, helping improve search visibility and overall content
              structure.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <ZoomImage
                src="/ProjectImages/CompanySite/WorkFlow1.png"
                alt="SEO discussion with manager"
                heightClass="h-[360px] md:h-[420px]"
                previewMode="contain"
              />
              <ZoomImage
                src="/ProjectImages/CompanySite/WorkFlow2.png"
                alt="SEO configuration in CMS"
                heightClass="h-[360px] md:h-[420px]"
                previewMode="contain"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-black">
              2. Adding a Simple Report Request Option to the Form Workflow
            </h3>

            <p className="max-w-4xl text-lg leading-8 text-gray-600">
              Based on the manager’s request, I updated the enquiry form by
              adding a Simple Report option, allowing users to request
              supporting documentation directly during submission.
            </p>

            <p className="max-w-4xl text-base leading-7 text-gray-500">
              This improvement made the form flow more practical and
              business-oriented by connecting user input with a clearer
              follow-up outcome. The submitted enquiry could then trigger an
              email output that included the requested report as an attachment,
              making the process more complete and easier to understand.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <ZoomImage
                src="/ProjectImages/CompanySite/From.jpeg"
                alt="Simple report option added to the enquiry form"
                heightClass="h-[380px] md:h-[480px]"
                previewMode="top"
              />
              <ZoomImage
                src="/ProjectImages/CompanySite/Form1.png"
                alt="Submitted enquiry email with report attachment"
                heightClass="h-[380px] md:h-[480px]"
                previewMode="top"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-black">
              3. Translating Manager Requirements into a Structured Form Flow
            </h3>

            <p className="max-w-4xl text-lg leading-8 text-gray-600">
              Based on the manager’s requirements, I updated the enquiry form to
              better reflect the intended workflow. This included restructuring
              input fields and introducing a simple report request option,
              allowing users to clearly communicate their needs while aligning
              the form with business objectives.
            </p>

            <p className="max-w-4xl text-base leading-7 text-gray-500">
              The update improved usability and clarity, making the submission
              flow more intuitive and easier to understand from a user
              perspective.
            </p>

            {/* 🔥 按钮在这里 */}
            <div>
              <a
                href="https://ultimaite-stratarobotics.com/drone-inspection/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                View Live Page →
              </a>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <ZoomImage
                src="/ProjectImages/CompanySite/Feedback1.jpeg"
                alt="Form before refinement"
                heightClass="h-[380px] md:h-[480px]"
                previewMode="top"
              />
              <ZoomImage
                src="/ProjectImages/CompanySite/Feedback.jpeg"
                alt="Form after refinement"
                heightClass="h-[380px] md:h-[480px]"
                previewMode="top"
              />
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-black">
              4. Working on New Content Direction and Ongoing Site Updates
            </h3>

            <p className="max-w-4xl text-lg leading-8 text-gray-600">
              Continued developing newly assigned sections based on the
              manager’s latest direction, including content updates, visual
              adjustments, and structural improvements across the site.
            </p>

            <p className="max-w-4xl text-base leading-7 text-gray-500">
              This stage reflects the ongoing nature of the project, where the
              website is continuously refined through iteration, evolving
              requirements, and live production updates.
            </p>

            <div>
              <a
                href="https://ultimaite-stratarobotics.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                View Live Site →
              </a>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <ZoomImage
                src="/ProjectImages/CompanySite/Feedback2.png"
                alt="Ongoing site development screenshot 1"
                heightClass="h-[360px] md:h-[460px]"
                previewMode="top"
              />
              <ZoomImage
                src="/ProjectImages/CompanySite/Feedback3.png"
                alt="Ongoing site development screenshot 2"
                heightClass="h-[360px] md:h-[460px]"
                previewMode="top"
              />
            </div>
          </div>
        </section>

        {/* Learning */}
        <section className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Reflection
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-black">
              Learning & Growth
            </h2>
          </div>

          <p className="text-gray-600 leading-8">
            Strengthened my ability to work in a real-world development
            environment with continuous feedback and iteration. Progressively
            transitioned from CMS editing to custom development while improving
            efficiency through AI-assisted workflows.
          </p>
        </section>

        {/* Next Steps */}
        <section className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Next Steps
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-black">
              Ongoing Development
            </h2>
          </div>

          <ul className="space-y-3 text-gray-600 leading-8">
            <li>Complete remaining pages and unfinished sections</li>
            <li>Improve mobile responsiveness</li>
            <li>Enhance SEO structure</li>
            <li>Expand custom-coded sections</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
