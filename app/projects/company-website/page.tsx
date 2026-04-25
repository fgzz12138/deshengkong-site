"use client";

import Link from "next/link";
import { useState } from "react";

type PreviewMode = "contain" | "top" | "cover" | "left";

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
      : previewMode === "left"
      ? "h-full w-full object-cover object-[25%_center]"
      : previewMode === "cover"
      ? "h-full w-full object-cover object-center"
      : "h-full w-full object-contain";
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative flex w-full ${heightClass} items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 text-left`}
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

const completedPages = [
  {
    title: "Home Page",
    description:
      "Built and refined the main landing experience to introduce USR’s robotics, AI, energy, and smart building technology direction.",
    items: [
      "Hero messaging and business positioning",
      "Core technology sections",
      "Partner and CTA entry points",
      "Responsive layout refinement",
    ],
  },
  {
    title: "Solutions Page",
    description:
      "Created a solution-focused page presenting ARC integration, robotics, energy saving, and AI defect analysis as a complete smart building system.",
    items: [
      "ARC platform section",
      "Robotics integration content",
      "Energy saving solution block",
      "AI-powered defect detection section",
    ],
  },
  {
    title: "Robotics Page",
    description:
      "Built a detailed robotics product range page to explain different automation categories and how they support real building operations.",
    items: [
      "Robot category cards",
      "Partner display sections",
      "Deployment process",
      "Industry usage examples",
    ],
  },
  {
    title: "Industries Page",
    description:
      "Developed an industry-focused page showing how USR solutions apply across different business sectors.",
    items: [
      "Commercial real estate",
      "Healthcare facilities",
      "Hospitality and hotels",
      "Industrial and manufacturing",
    ],
  },
  {
    title: "About Page",
    description:
      "Designed the company story page to explain USR as an integrator and smart systems designer rather than only a product reseller.",
    items: [
      "Company positioning",
      "Design philosophy",
      "Integration-first message",
      "Consistent CTA section",
    ],
  },
  {
    title: "Contact / Book Assessment",
    description:
      "Improved the enquiry and consultation flow so visitors can contact the business or request a consultation more clearly.",
    items: [
      "Contact form flow",
      "Business enquiry structure",
      "Office address section",
      "Consultation CTA",
    ],
  },
  {
    title: "Drone Inspection Page",
    description:
      "Worked on a dedicated drone inspection page focused on AI defect detection, report requests, and inspection service enquiries.",
    items: [
      "Drone inspection service content",
      "Simple report request option",
      "Form workflow refinement",
      "Live page CTA",
    ],
  },
];

const contributions = [
  "Built multiple production website pages using WordPress, custom HTML, and custom CSS.",
  "Created reusable section structures and class naming patterns for consistent layouts across pages.",
  "Improved page hierarchy, spacing, CTA placement, and responsive presentation.",
  "Translated manager feedback into practical page updates and production-ready website changes.",
  "Structured content around business value, including automation, smart buildings, robotics, AI analysis, and energy saving.",
  "Updated enquiry form flows and added report request options for the drone inspection workflow.",
  "Refined SEO-related page titles, descriptions, keywords, and page structure inside the CMS.",
];

const challenges = [
  {
    title: "Working inside WordPress limitations",
    text: "The project required custom layouts while still working within a CMS environment, so I used custom HTML and CSS sections to go beyond standard template restrictions.",
  },
  {
    title: "Maintaining consistency across many pages",
    text: "Because the site expanded from a simple company site into multiple business pages, I focused on reusable layout patterns, consistent CTA sections, and shared visual direction.",
  },
  {
    title: "Turning broad business ideas into web content",
    text: "Many sections started from business discussions or manager feedback, so I needed to convert those requirements into clear page structure, headings, cards, and user flows.",
  },
  {
    title: "Balancing design and business communication",
    text: "The website needed to look modern while clearly explaining robotics, AI inspection, ARC integration, energy saving, and industry use cases to potential clients.",
  },
];

export default function CompanyWebsitePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/"
        className="mb-10 inline-block text-sm text-gray-500 transition hover:text-black"
      >
        ← Back to Home
      </Link>

      <div className="space-y-24">
        {/* Header */}
        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
            Real Client Project · WordPress · Custom HTML/CSS
          </p>

          <h1 className="max-w-5xl text-4xl font-bold tracking-tight text-black md:text-6xl">
            Ultimaite Strata Robotics Corporate Website
          </h1>

          <p className="max-w-4xl text-lg leading-8 text-gray-600">
            A real-world corporate website project for Ultimaite Strata
            Robotics, focused on smart building technology, robotics
            integration, AI-powered drone inspection, energy-saving solutions,
            and industry-specific service pages.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://ultimaite-stratarobotics.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              View Live Site →
            </a>

            <a
              href="https://ultimaite-stratarobotics.com/solutions/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-black transition hover:border-black"
            >
              View Solutions Page
            </a>
          </div>
        </section>

        {/* Project Overview */}
        <section className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-black md:text-4xl">
              Project Summary
            </h2>
          </div>

          <div className="max-w-4xl space-y-5 text-gray-600">
            <p className="leading-8">
              This project was developed during my internship and later expanded
              into a more complete corporate website. My work focused on
              transforming business requirements into clear website pages,
              improving visual hierarchy, building reusable custom sections, and
              making the site more suitable for client-facing presentation.
            </p>

            <p className="leading-8">
              The final website includes multiple completed sections such as
              Home, Solutions, Robotics, Industries, About, Contact, Book
              Assessment, and Drone Inspection. The site presents USR as a smart
              building and robotics integration company with services across
              automation, AI inspection, energy saving, and operational
              optimisation.
            </p>
          </div>
        </section>

        {/* Project Info */}
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Role</p>
            <h3 className="mt-2 text-lg font-semibold text-black">
              Frontend / Web Developer
            </h3>
          </div>

          <div className="rounded-3xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Platform</p>
            <h3 className="mt-2 text-lg font-semibold text-black">
              WordPress + Custom Code
            </h3>
          </div>

          <div className="rounded-3xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Focus</p>
            <h3 className="mt-2 text-lg font-semibold text-black">
              UI, Layout, Content
            </h3>
          </div>

          <div className="rounded-3xl border border-gray-200 p-6">
            <p className="text-sm text-gray-500">Status</p>
            <h3 className="mt-2 text-lg font-semibold text-black">
              Completed Core Pages
            </h3>
          </div>
        </section>

        {/* Completed Pages */}
        <section className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Completed Work
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-black md:text-4xl">
              Pages and Sections I Worked On
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {completedPages.map((page) => (
              <article
                key={page.title}
                className="rounded-3xl border border-gray-200 bg-white p-7"
              >
                <h3 className="text-xl font-semibold text-black">
                  {page.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {page.description}
                </p>

                <ul className="mt-5 space-y-2 text-sm leading-6 text-gray-500">
                  {page.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Screenshots */}
        <section className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Visual Preview
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-black md:text-4xl">
              Website Screenshots
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <ZoomImage
              src="/ProjectImages/CompanySite/screencapture-0.png"
              alt="USR homepage hero screenshot"
              heightClass="h-[360px] md:h-[460px]"
              previewMode="left"
            />

            <ZoomImage
              src="/ProjectImages/CompanySite/screencapture-1.png"
              alt="USR website page preview two"
              heightClass="h-[360px] md:h-[460px]"
              previewMode="top"
            />
          </div>
        </section>

        {/* Contributions */}
        <section className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              My Role
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-black md:text-4xl">
              What I Contributed
            </h2>
          </div>

          <ul className="max-w-3xl list-none space-y-4 text-[16px] leading-7 text-gray-600">
            {contributions.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Workflow */}
        <section className="space-y-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Process
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-black md:text-4xl">
              Development Workflow
            </h2>
          </div>

          {/* Step 1 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-black">
              1. SEO and Page Structure Setup
            </h3>

            <p className="max-w-4xl text-lg leading-8 text-gray-600">
              I helped review and refine SEO-related content, including page
              titles, keywords, meta descriptions, and permalink structure. The
              goal was to make the website easier to understand for both users
              and search engines.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <ZoomImage
                src="/ProjectImages/CompanySite/screencapture-2.png"
                alt="SEO discussion and planning"
                heightClass="h-[360px] md:h-[420px]"
                previewMode="left"
              />

              <ZoomImage
                src="/ProjectImages/CompanySite/WorkFlow2.png"
                alt="SEO setup inside CMS"
                heightClass="h-[360px] md:h-[420px]"
                previewMode="contain"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-8">
            <h3 className="text-2xl font-medium text-black">
              2. Custom Page Sections and Layout Refinement
            </h3>

            <p className="max-w-4xl text-lg leading-8 text-gray-600">
              Instead of relying solely on default WordPress templates, I built
              custom page sections using HTML and CSS to improve layout
              flexibility and visual consistency across the site.
            </p>

            <p className="max-w-4xl text-lg leading-8 text-gray-600">
              During the development process, I iterated on layouts based on
              stakeholder feedback. This involved refining content hierarchy,
              restructuring sections, and improving visual clarity to better
              communicate the product’s value.
            </p>

            {/* Images */}
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Initial Layout Implementation
                </p>
                <ZoomImage
                  src="/ProjectImages/CompanySite/Feedback1.jpeg"
                  alt="Initial layout before refinement"
                  heightClass="h-[380px] md:h-[480px]"
                  previewMode="top"
                />
              </div>

              <div>
                <p className="mb-2 text-sm text-gray-500">
                  Annotated Stakeholder Feedback
                </p>
                <ZoomImage
                  src="/ProjectImages/CompanySite/Feedback.jpeg"
                  alt="Annotated feedback for layout refinement"
                  heightClass="h-[380px] md:h-[480px]"
                  previewMode="top"
                />
              </div>
            </div>

            {/* Result explanation */}
            <p className="max-w-4xl text-base leading-7 text-gray-500">
              I translated this feedback into concrete UI improvements,
              including better spacing, clearer content grouping, improved
              section flow, and more consistent visual hierarchy across the
              page.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-black">
              3. Enquiry Form and Report Request Flow
            </h3>

            <p className="max-w-4xl text-lg leading-8 text-gray-600">
              For the drone inspection workflow, I updated the enquiry form by
              adding a Simple Report request option. This helped connect the
              website form with a clearer business outcome, allowing users to
              request supporting inspection material more directly.
            </p>

            <div>
              <a
                href="https://ultimaite-stratarobotics.com/drone-inspection/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                View Drone Inspection Page →
              </a>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <ZoomImage
                src="/ProjectImages/CompanySite/From.jpeg"
                alt="Simple report option added to enquiry form"
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

          {/* Step 4 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-medium text-black">
              4. Multi-Page Website Completion
            </h3>

            <p className="max-w-4xl text-lg leading-8 text-gray-600">
              After the initial website updates, I continued building out the
              remaining major pages, including Solutions, Robotics, Industries,
              About, and Contact. This helped turn the site into a more complete
              business website rather than a single landing page.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://ultimaite-stratarobotics.com/solutions/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-black transition hover:border-black"
              >
                Solutions
              </a>

              <a
                href="https://ultimaite-stratarobotics.com/robotics/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-black transition hover:border-black"
              >
                Robotics
              </a>

              <a
                href="https://ultimaite-stratarobotics.com/industries/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-black transition hover:border-black"
              >
                Industries
              </a>

              <a
                href="https://ultimaite-stratarobotics.com/About/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-black transition hover:border-black"
              >
                About
              </a>
            </div>
          </div>
        </section>

        {/* Challenges */}
        <section className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">
              Challenges
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-black md:text-4xl">
              Problems I Solved
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {challenges.map((challenge) => (
              <article
                key={challenge.title}
                className="rounded-3xl border border-gray-200 p-7"
              >
                <h3 className="text-xl font-semibold text-black">
                  {challenge.title}
                </h3>
                <p className="mt-4 leading-7 text-gray-600">{challenge.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Result */}
        <section className="space-y-6 rounded-[32px] bg-black p-8 text-white md:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            Result
          </p>

          <h2 className="max-w-4xl text-3xl font-semibold md:text-4xl">
            Delivered a complete multi-page corporate website for a real
            robotics and smart building business.
          </h2>

          <p className="max-w-4xl leading-8 text-white/70">
            The project helped me gain real production experience in website
            development, stakeholder feedback implementation, custom page
            building, SEO setup, CMS workflows, and business-focused UI
            presentation. It also strengthened my ability to convert broad
            business ideas into structured, user-facing web pages.
          </p>

          <div className="flex flex-wrap gap-3 pt-4">
            <a
              href="https://ultimaite-stratarobotics.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              Visit Live Website →
            </a>

            <Link
              href="/"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:border-white"
            >
              View More Projects
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
