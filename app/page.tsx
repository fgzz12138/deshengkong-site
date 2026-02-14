export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-gray-500">Desheng Kong</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Front-end Developer & Game Dev
        </h1>
        <div className="mt-8 flex gap-3">
          <a
            href="/projects"
            className="rounded-xl bg-black px-4 py-2 text-white"
          >
            View Projects
          </a>
          <a href="/about" className="rounded-xl border px-4 py-2">
            About Me
          </a>
        </div>
      </div>
    </main>
  );
}
