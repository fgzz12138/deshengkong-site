"use client";

import Link from "next/link";
import { useState } from "react";

/* =========================
   IMAGE COMPONENT
========================= */
function ZoomImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative h-[360px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 text-left"
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
        />

        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur">
          Click to expand
        </span>
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

          <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] rounded-xl bg-white object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
/* =========================
   PAGE
========================= */
export default function EziSightPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/"
        className="mb-10 inline-block text-sm text-gray-500 hover:text-black"
      >
        ← Back to Home
      </Link>

      <div className="space-y-24">
        {/* HERO */}
        <section className="space-y-6">
          <p className="text-sm uppercase tracking-[0.25em] text-gray-500">
            Frontend Case Study · Migration Project
          </p>

          <h1 className="text-4xl font-bold md:text-6xl">
            EziSight Website Migration & Frontend Rebuild
          </h1>

          <p className="max-w-4xl text-lg text-gray-600 leading-8">
            A frontend-focused project exploring the migration of a Wix-based
            website into a scalable Next.js application with improved
            flexibility, UI control, and reusable component architecture.
          </p>
        </section>

        {/* =========================
            PRODUCT SYSTEM
        ========================= */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">Product System</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <ZoomImage
                src="/ProjectImages/EziSight/product.png"
                alt="Product listing"
              />
              <p className="mt-3 text-sm text-gray-500 leading-6">
                Product listing page built with a grid layout, supporting
                filtering, clear product hierarchy, and direct cart interaction.
              </p>
            </div>

            <div>
              <ZoomImage
                src="/ProjectImages/EziSight/product-1.png"
                alt="Product detail"
              />
              <p className="mt-3 text-sm text-gray-500 leading-6">
                Product detail page featuring image switching, quantity
                selection, and structured product information for improved
                usability.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            CART
        ========================= */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">Cart Interaction</h2>

          <ZoomImage src="/ProjectImages/EziSight/cart.png" alt="Cart system" />

          <p className="max-w-3xl text-sm text-gray-500 leading-6">
            Shopping cart system with real-time updates, quantity control, and
            order summary calculation. Demonstrates state management across
            different pages.
          </p>
        </section>

        {/* =========================
            USER
        ========================= */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">User Authentication</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <ZoomImage
                src="/ProjectImages/EziSight/login.png"
                alt="Login page"
              />
              <p className="mt-3 text-sm text-gray-500 leading-6">
                Login interface allowing users to access account features.
                Includes test account flow for demonstration.
              </p>
            </div>

            <div>
              <ZoomImage
                src="/ProjectImages/EziSight/login-1.png"
                alt="Account page"
              />
              <p className="mt-3 text-sm text-gray-500 leading-6">
                Account dashboard displaying user information and actions,
                simulating a basic user session experience.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            FORM
        ========================= */}
        <section className="space-y-8">
          <h2 className="text-3xl font-semibold">Enquiry & Form Flow</h2>

          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <ZoomImage src="/ProjectImages/EziSight/form.png" alt="Form" />
              <p className="mt-3 text-sm text-gray-500 leading-6">
                Enquiry form designed with structured input fields to collect
                user data and simulate real business workflows.
              </p>
            </div>

            <div>
              <ZoomImage
                src="/ProjectImages/EziSight/form-1.png"
                alt="Email result"
              />
              <p className="mt-3 text-sm text-gray-500 leading-6">
                Form submissions are processed via backend integration and sent
                as structured emails, demonstrating a full submission workflow.
              </p>
            </div>
          </div>
        </section>

        {/* =========================
            RESULT
        ========================= */}
        <section className="space-y-6 rounded-[32px] bg-black p-8 text-white md:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-white/60">
            Result
          </p>

          <h2 className="text-3xl font-semibold md:text-4xl">
            Built a complete frontend system with structured UI and user
            interaction.
          </h2>

          <p className="max-w-4xl text-white/70 leading-8">
            This project demonstrates my ability to rebuild and structure a
            commercial website into a scalable frontend system, focusing on UI
            consistency, component reuse, and user experience.
          </p>

          <div className="flex gap-3 pt-4 flex-wrap">
            <a
              href="https://github.com/fgzz12138/ezisight-site"
              target="_blank"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black"
            >
              View Source Code →
            </a>

            <Link
              href="/"
              className="rounded-full border border-white/30 px-5 py-3 text-sm font-medium text-white"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
