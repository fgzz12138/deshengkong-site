"use client";
import Link from "next/link";
import Image from "next/image";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./content/projects";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function Home() {
  const webProjects = projects.filter((p) => p.category === "Web");
  const gameProjects = projects.filter((p) => p.category === "Game");
  const artProjects = projects.filter((p) => p.category === "3D");

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
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
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                const section = document.getElementById("projects");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xl bg-black px-5 py-3 text-sm text-white transition hover:-translate-y-0.5 hover:opacity-85"
            >
              View Projects
            </Link>

            <Link
              href="/about"
              className="rounded-xl border px-5 py-3 text-sm transition hover:-translate-y-0.5 hover:bg-gray-100"
            >
              About Me
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="my-20 h-px w-full bg-gray-200" />

        {/* About / Skills */}
        <section className="mt-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                About
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900">
                Building clean digital experiences
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
                I’m a front-end developer and game development learner based in
                Melbourne. I enjoy building modern websites, interactive user
                experiences, and creative digital projects with a strong focus
                on clarity, usability, and visual presentation.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
                My work spans web development, game projects, and 3D artwork,
                which helps me combine technical implementation with design
                thinking.
              </p>
            </div>

            <div className="rounded-3xl border bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                Core Skills
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "JavaScript",
                  "Tailwind CSS",
                  "WordPress",
                  "Unity",
                  "C#",
                  "Blender",
                  "Maya",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8 space-y-3 text-sm text-gray-600">
                <p>Based in Melbourne</p>
                <p>Open to front-end and creative development roles</p>
                <p>
                  Interested in web, UI, and interactive digital experiences
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="projects" className="mt-20">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              Projects
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Selected works across web, game, and 3D.
            </p>
          </div>

          {/* Web */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-gray-900">Web</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {webProjects.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
          </div>

          {/* Game */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-900">Game</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {gameProjects.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
          </div>

          {/* 3D Artworks */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold text-gray-900">
              3D Artworks
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artProjects.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* CTA */}
      <section className="mt-28">
        <div className="relative overflow-hidden rounded-[32px] bg-black px-6 py-20 text-white sm:px-10 md:px-16 md:py-24">
          {/* subtle background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
              Get In Touch
            </p>

            <h2 className="mt-6 max-w-4xl text-4xl font-semibold uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl">
              Let’s Build Something
              <br />
              Great Together
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              I’m currently open to front-end, web, and creative development
              opportunities. Let’s talk about how I can contribute to your team
              or project.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="desheng.kong408@gmail.com"
                className="rounded-xl bg-blue-600 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                Contact Me
              </a>

              <a
                href="/Desheng_Kong_CV.pdf"
                download
                className="rounded-xl bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="relative z-10 mt-10 flex justify-center gap-8 text-white/70">
            <a
              href="https://github.com/fgzz12138"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white hover:scale-110"
            >
              <Github className="h-6 w-6" />
            </a>

            <a
              href="https://www.linkedin.com/in/desheng-kong/"
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-white hover:scale-110"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
