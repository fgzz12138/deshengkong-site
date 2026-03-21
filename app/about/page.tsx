import { Github, Linkedin, Instagram } from "lucide-react";
export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Hero */}
        <section className="max-w-3xl">
          <p className="text-sm text-gray-500">About</p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900">
            Front-end Developer <br />& Game Developer
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            I’m Desheng Kong, based in Melbourne. I focus on building modern,
            clean, and user-friendly web applications, as well as exploring
            interactive experiences through game development.
          </p>
        </section>

        {/* Divider */}
        <div className="my-20 h-px w-full bg-gray-200" />

        {/* About Content */}
        <section className="grid gap-12 lg:grid-cols-2">
          {/* Left */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Background</h2>
            <p className="mt-4 text-gray-600 leading-7">
              I have been developing projects using React, Next.js, and
              TypeScript, focusing on building structured, scalable, and
              visually clean interfaces. Alongside web development, I also work
              on indie game projects using Unity, where I explore gameplay
              mechanics and interaction design.
            </p>

            <p className="mt-4 text-gray-600 leading-7">
              During my internship, I contributed to the development of a
              corporate website, improving layout structure and user experience.
              This experience helped me better understand real-world project
              workflows and collaboration.
            </p>
          </div>

          {/* Right Card */}
          <div className="rounded-3xl border bg-white p-8">
            <h2 className="text-sm font-semibold text-gray-900">
              Skills & Tools
            </h2>

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
                  className="rounded-full border bg-gray-50 px-3 py-1 text-xs text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-8 space-y-2 text-sm text-gray-600">
              <p>📍 Melbourne, Australia</p>
              <p>💼 Open to front-end opportunities</p>
              <p>🎮 Interested in web & game development</p>
            </div>
          </div>
        </section>

        {/* CTA + Resume Combined */}
        <section className="mt-28">
          <div className="relative overflow-hidden rounded-[32px] bg-black px-6 py-20 text-white sm:px-10 md:px-16 md:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/75">
                Get In Touch
              </p>

              <h2 className="mt-6 text-4xl font-semibold uppercase leading-none tracking-tight sm:text-5xl md:text-6xl">
                Let’s Work Together
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                I’m currently open to front-end and web development
                opportunities. You can explore my work, download my resume, or
                reach out directly.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <a
                  href="desheng.kong408@gmail.com"
                  className="rounded-xl bg-blue-600 px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
                >
                  Contact Me
                </a>

                <a
                  href="https://www.canva.com/design/DAF64MusKZ8/oEofvk4M5rg5i2jC4OtKEQ/view?utm_content=DAF64MusKZ8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h491bd4eea6"
                  download
                  className="rounded-xl bg-white px-8 py-4 text-sm font-semibold uppercase tracking-wide text-black transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  Preview CV
                </a>
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
          </div>
        </section>
      </div>
    </main>
  );
}
