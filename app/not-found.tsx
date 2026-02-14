"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-10">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.18)] sm:max-w-2xl sm:p-10">
        {/* watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none font-extrabold tracking-tight text-black/5 text-[140px] sm:text-[200px]">
            404
          </span>
        </div>

        {/* content */}
        <div className="relative">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            System message
          </p>

          <h1 className="mt-3 text-3xl font-bold text-black sm:text-5xl">
            Error 404
          </h1>

          <div className="mt-5 space-y-2 font-mono text-xs text-gray-700 sm:text-sm">
            <p>&gt; Page not found.</p>
            <p>&gt; Resource unavailable.</p>
            <p className="text-black">&gt; Working on it...</p>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm text-white transition hover:opacity-80"
            >
              Return Home →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
