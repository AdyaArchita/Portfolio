const projectRecords = [
  // FEATURED PROJECTS
  {
    id: 1,
    title: "KhataAgent",
    hook: "AI financial reconciliation engine: matches unstructured Indian tax invoices against a structured ledger.",
    category: "AI / Fintech",
    measured: null, // TODO(adya): precision/recall from scripts/evaluate.py
    safeguards: "AST sandbox + human-in-the-loop review",
    tryIt: {
      live: null, // TODO(adya): add live link if available
      repo: null, // TODO(adya): add repo link if available
      demo: null, // TODO(adya): add demo link if available
    },
    stack: ["LangGraph", "FastAPI", "SQLite", "React", "Gemini"],
    status: "featured",
    // Fallbacks for ProjectDetail.jsx
    slug: "khataagent",
    image: null,
  },
  {
    id: 2,
    title: "MetaHeck (BankKYCAuditEnv)",
    hook: "OpenEnv-compliant RL environment where an agent acts as a KYC/AML fraud analyst.",
    category: "RL / Security",
    measured: null, // TODO(adya): baseline agent scores
    safeguards: "Procedural ground truth prevents memorization.",
    tryIt: {
      live: null, // TODO(adya): add Hugging Face space link
      repo: null, // TODO(adya): add repo link
      demo: null, // TODO(adya): add demo link
    },
    stack: ["FastAPI", "Docker", "Hugging Face"],
    status: "featured",
    slug: "metaheck",
    image: null,
  },
  {
    id: 3,
    title: "IntelAI",
    hook: "Industrial knowledge assistant over SOPs, maintenance logs and P&IDs.",
    category: "AI Assistant",
    measured: "Target: search time cut to under 90 seconds",
    safeguards: "Role-based access control L1 to L3 enforced at database level",
    tryIt: {
      live: null, // TODO(adya): add live link
      repo: null, // TODO(adya): add repo link
      demo: null, // TODO(adya): add demo link
    },
    stack: ["Next.js 16", "LangGraph", "Jina", "Neo4j", "Whisper", "MongoDB"],
    status: "featured",
    slug: "intelai",
    image: null,
  },
  {
    id: 4,
    title: "CogniBot (Grid07)",
    hook: "Cognitive routing + RAG with prompt-injection defense.",
    category: "RAG / Security",
    measured: null, // TODO(adya): add measured metric
    safeguards: "Persona-first prompt + XML boundary tags + explicit directive.",
    tryIt: {
      live: null, // TODO(adya): add live link
      repo: null, // TODO(adya): add repo link
      demo: null, // TODO(adya): add demo link
    },
    stack: ["ChromaDB", "sentence-transformers", "LangGraph"],
    status: "featured",
    slug: "cognibot",
    image: null,
  },
  {
    id: 5,
    title: "Distribut (Prowider Lead Distribution)",
    hook: "Concurrency-safe lead allocation.",
    category: "Backend / Systems",
    measured: "Concurrency stress test.",
    safeguards: "Row locks, idempotency key, automatic rollback.",
    tryIt: {
      live: null, // TODO(adya): add live link
      repo: null, // TODO(adya): add repo link
      demo: null, // TODO(adya): add demo link
    },
    stack: ["Next.js App Router", "PostgreSQL", "Prisma", "SWR"],
    status: "featured",
    slug: "distribut",
    image: null,
  },
  {
    id: 6,
    title: "JobTracker",
    hook: "AI-assisted job application tracker (MERN + TypeScript).",
    category: "Full Stack",
    measured: null, // TODO(adya): add measured metric if any
    safeguards: null, // TODO(adya): add safeguards if any
    tryIt: {
      live: "https://jobtracker-frontend-574d.onrender.com",
      repo: "https://github.com/AdyaArchita/JobTracker",
      demo: null, // TODO(adya): add demo link if any
    },
    stack: ["MERN", "TypeScript", "JWT", "@dnd-kit", "React Query", "OpenAI"],
    status: "featured",
    note: "May take ~30s to wake",
    slug: "jobtracker",
    image: null,
  },

  // MORE PROJECTS
  {
    id: 7,
    title: "StateWeave",
    hook: "Educational visualization of Hebbian-style bounded memory vs Transformer KV-cache growth.",
    category: "Visualization",
    measured: null,
    safeguards: null,
    tryIt: {
      live: null, // TODO(adya): add live link
      repo: null, // TODO(adya): add repo link
      demo: null, // TODO(adya): add demo link
    },
    stack: ["React"],
    status: "more",
    slug: "stateweave",
  },
  {
    id: 8,
    title: "VoixAI",
    hook: "Fully local voice-controlled agent with file action confirmation.",
    category: "AI Agent",
    measured: null,
    safeguards: null,
    tryIt: {
      live: null, // TODO(adya): add live link
      repo: null, // TODO(adya): add repo link
      demo: null, // TODO(adya): add demo link
    },
    stack: ["faster-whisper", "Ollama"],
    status: "more",
    slug: "voixai",
  },
  {
    id: 9,
    title: "AutoStream",
    hook: "LangGraph sales agent with RAG + stateful lead capture (FAISS, ~54ms retrieval).",
    category: "AI Agent",
    measured: null,
    safeguards: null,
    tryIt: {
      live: null, // TODO(adya): add live link
      repo: null, // TODO(adya): add repo link
      demo: null, // TODO(adya): add demo link
    },
    stack: ["LangGraph", "FAISS"],
    status: "more",
    slug: "autostream",
  },
  {
    id: 10,
    title: "NagarSaarthi",
    hook: "Frontend prototype waste-reporting UI with chatbot and maps.",
    content:
      "Citizens can report waste issues with images, use the EcoSort chatbot, and view reports on interactive maps. Municipal dashboards support hotspot monitoring.",
    category: "Frontend",
    measured: null,
    safeguards: null,
    tryIt: {
      live: "https://adyaarchita.github.io/NagarSaarthi",
      repo: null, // TODO(adya): add repo link
      demo: null, // TODO(adya): add demo link
    },
    stack: ["React"],
    status: "more",
    slug: "nagarsaarthi",
  },
];

export const projects = projectRecords.map((project) => {
  const { hook, stack, tryIt, ...record } = project;

  return {
    ...record,
    shortDesc: project.shortDesc || hook || project.title,
    content: project.content || hook || project.shortDesc || project.title,
    tags: Array.isArray(project.tags) ? project.tags : Array.isArray(stack) ? stack : [],
    links: {
      live: project.links?.live ?? tryIt?.live ?? null,
      repo: project.links?.repo ?? tryIt?.repo ?? null,
      demo: project.links?.demo ?? tryIt?.demo ?? null,
    },
    image: typeof project.image === "string" ? project.image : null,
  };
});
