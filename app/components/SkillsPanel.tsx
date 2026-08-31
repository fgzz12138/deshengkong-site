const skillGroups: { title: string; skills: string[]; className?: string }[] = [
  {
    title: "Agents & Orchestration",
    skills: ["LangChain", "LangGraph", "Multi-Agent Systems", "n8n"],
    className: "sm:col-span-2",
  },
  {
    title: "Knowledge & Retrieval",
    skills: ["RAG", "Vector Search (Qdrant)", "MCP"],
    className: "sm:row-span-2",
  },
  {
    title: "Voice & Interfaces",
    skills: ["STT/TTS"],
  },
  {
    title: "Core Stack",
    skills: ["Next.js", "TypeScript", "Python", "Docker"],
  },
];

export default function SkillsPanel() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black p-8 shadow-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="relative">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
          Core Skills
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className={`rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-white/20 hover:bg-white/[0.07] ${
                group.className ?? ""
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">
                {group.title}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs text-white/90"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-2 text-sm text-white/60">
          <p>Based in Melbourne</p>
          <p>Open to AI agent and applied AI development opportunities</p>
        </div>
      </div>
    </div>
  );
}
