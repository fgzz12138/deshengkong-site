"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="font-semibold tracking-tight">
            Desheng Kong
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <Link href="/projects" className="hover:text-black">
              Projects
            </Link>
            <Link href="/about" className="hover:text-black">
              About
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-5 w-6">
              <span
                className={`absolute left-0 top-0 h-0.5 w-6 bg-black transition-all ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-0.5 w-6 bg-black transition-all ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-6 bg-black transition-all ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${open ? "block" : "hidden"} sm:hidden pb-4`}>
          <nav className="flex flex-col gap-3 text-sm text-gray-700">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="hover:text-black"
            >
              Home
            </Link>
            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className="hover:text-black"
            >
              Projects
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="hover:text-black"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
