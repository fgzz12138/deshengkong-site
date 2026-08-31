const learningTags = [
  "LangGraph Multi-Agent",
  "MCP",
  "n8n",
  "Production RAG Evals",
];

export default function CurrentlyLearning() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
        Currently Learning
      </p>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
        Currently deepening my agent engineering practice — working through
        LangGraph multi-agent patterns, MCP server development, n8n workflow
        automation, and a production-grade NL2SQL agent case study
        (metadata-driven retrieval, vector + full-text indexing).
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {learningTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs text-gray-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
