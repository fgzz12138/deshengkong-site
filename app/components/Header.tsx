"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-gray-900"
          >
            Desheng Kong
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-sm text-gray-600 sm:flex">
            <Link href="/" className="transition hover:text-black">
              Home
            </Link>
            <Link href="/about" className="transition hover:text-black">
              About
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition hover:bg-gray-100 sm:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-5 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-black transition-all duration-300 ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-6 bg-black transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-6 bg-black transition-all duration-300 ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 sm:hidden ${
            open ? "max-h-40 pb-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-3 text-sm text-gray-700">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="transition hover:text-black"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="transition hover:text-black"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
