const projectRecords = [
  {
    id: 1,
    title: "KhataAgent",
    slug: "khataagent",
    shortDesc: "Matches unstructured Indian tax invoices against a structured ledger.",
    content:
      "A LangGraph reconciliation engine compares tax invoices with a ledger. A Quant Agent uses safe Python execution in an AST sandbox, with human review for uncertain matches.",
    categories: ["AI Agents", "Full-Stack"],
    tags: ["LangGraph", "FastAPI", "SQLite", "React", "Gemini"],
    status: "featured",
    links: {
      live: null, // TODO: Add a verified live link if available.
      repo: "https://github.com/AdyaArchita/KhataAgent",
      demo: null, // TODO: Add a verified demo link if available.
    },
    image: null,
  },
  {
    id: 2,
    title: "MetaHeck (BankKYCAuditEnv)",
    slug: "metaheck",
    shortDesc: "An OpenEnv KYC/AML environment for AI agents.",
    content:
      "The procedurally generated environment asks agents to investigate customer profiles, transaction ledgers, and watchlists before making compliance decisions.",
    categories: ["AI Agents", "ML"],
    tags: ["FastAPI", "Docker", "Hugging Face"],
    status: "featured",
    links: {
      live: null, // TODO: Add a verified live link if available.
      repo: "https://github.com/AdyaArchita/MetaHeck",
      demo: null, // TODO: Add a verified demo link if available.
    },
    image: null,
  },
  {
    id: 3,
    title: "IntelAI",
    slug: "intelai",
    shortDesc: "An industrial knowledge assistant for SOPs, maintenance logs, and P&IDs.",
    content:
      "The assistant brings industrial documents into a queryable system with retrieval, graph context, answer verification, and role-based access controls.",
    categories: ["AI Agents", "Full-Stack"],
    tags: ["Next.js", "LangGraph", "Jina", "Neo4j", "Whisper", "MongoDB"],
    status: "featured",
    links: {
      live: null, // TODO: Add a verified live link if available.
      repo: "https://github.com/AdyaArchita/IntelAI",
      demo: null, // TODO: Add a verified demo link if available.
    },
    image: null,
  },
  {
    id: 4,
    title: "CogniBot (Grid07)",
    slug: "cognibot",
    shortDesc: "Persona routing, RAG, and prompt-injection defense.",
    content:
      "The system combines vector-based persona matching, LangGraph orchestration, and a RAG defense that treats user input as data rather than instructions.",
    categories: ["AI Agents"],
    tags: ["ChromaDB", "sentence-transformers", "LangGraph"],
    status: "more",
    links: {
      live: null, // TODO: Add a verified live link if available.
      repo: "https://github.com/AdyaArchita/CogniBot",
      demo: null, // TODO: Add a verified demo link if available.
    },
    image: null,
  },
  {
    id: 5,
    title: "Distribut (Prowider Lead Distribution)",
    slug: "distribut",
    shortDesc: "Concurrency-safe lead allocation with transactional round-robin assignment.",
    content:
      "The system uses PostgreSQL transactions and row-level locks for lead assignment, with database constraints and idempotency keys to protect against duplicate processing.",
    categories: ["Full-Stack"],
    tags: ["Next.js", "PostgreSQL", "Prisma", "SWR"],
    status: "featured",
    links: {
      live: null, // TODO: Add a verified live link if available.
      repo: "https://github.com/AdyaArchita/Distribut",
      demo: null, // TODO: Add a verified demo link if available.
    },
    image: null,
  },
  {
    id: 6,
    title: "JobTracker",
    slug: "jobtracker",
    shortDesc: "A Kanban job-application tracker with AI-assisted insights.",
    content:
      "The MERN application tracks job applications and offers AI-assisted job-match scoring, cover-letter hooks, and tailored resume bullets.",
    categories: ["Full-Stack", "AI Agents"],
    tags: ["MERN", "TypeScript", "JWT", "@dnd-kit", "React Query", "OpenAI"],
    status: "featured",
    note: "The live demo may take about 30 seconds to wake.",
    links: {
      live: "https://jobtracker-frontend-574d.onrender.com",
      repo: "https://github.com/AdyaArchita/JobTracker",
      demo: null, // TODO: Add a verified demo link if available.
    },
    image: null,
  },
  {
    id: 7,
    title: "StateWeave",
    slug: "stateweave",
    shortDesc: "Interactive visualization of bounded Hebbian memory vs Transformer KV-cache growth.",
    content:
      "An educational artifact that visualizes linear KV-cache growth against fixed-size Hebbian memory. It does not implement the full BDH algorithm.",
    categories: ["ML", "Frontend"],
    tags: ["React"],
    status: "more",
    links: {
      live: null, // TODO: Add a verified live link if available.
      repo: "https://github.com/AdyaArchita/StateWeave",
      demo: null, // TODO: Add a verified demo link if available.
    },
    image: null,
  },
  {
    id: 8,
    title: "VoixAI",
    slug: "voixai",
    shortDesc: "A local voice agent with confirmation-gated file actions.",
    content:
      "The assistant transcribes and classifies voice commands locally, asks for confirmation before file actions, and restricts file operations to its output directory.",
    categories: ["AI Agents"],
    tags: ["faster-whisper", "Ollama"],
    status: "more",
    links: {
      live: null, // TODO: Add a verified live link if available.
      repo: "https://github.com/AdyaArchita/VoixAI",
      demo: null, // TODO: Add a verified demo link if available.
    },
    image: null,
  },
  {
    id: 9,
    title: "AutoStream",
    slug: "autostream",
    shortDesc: "A LangGraph conversational agent with RAG and stateful lead capture.",
    content:
      "The conversational agent uses a local knowledge base to answer product questions and collects lead details across multiple turns.",
    categories: ["AI Agents"],
    tags: ["LangGraph", "FAISS"],
    status: "more",
    links: {
      live: null, // TODO: Add a verified live link if available.
      repo: "https://github.com/AdyaArchita/AutoStream",
      demo: null, // TODO: Add a verified demo link if available.
    },
    image: null,
  },
  {
    id: 10,
    title: "NagarSaarthi",
    slug: "nagarsaarthi",
    shortDesc: "Citizen-focused waste reporting with an EcoSort chatbot and interactive maps.",
    content:
      "Citizens can report waste issues with images, use the EcoSort chatbot, and view reports on interactive maps. Municipal dashboards support hotspot monitoring.",
    categories: ["Frontend", "AI Agents"],
    tags: ["React", "Tailwind CSS", "React Router", "Leaflet"],
    status: "featured",
    links: {
      live: "https://adyaarchita.github.io/NagarSaarthi",
      repo: "https://github.com/AdyaArchita/NagarSaarthi",
      demo: null, // TODO: Add a verified demo link if available.
    },
    image: null,
  },
];

export const projects = projectRecords.map((project) => ({
  ...project,
  shortDesc: project.shortDesc?.trim() || project.title,
  content: project.content?.trim() || project.shortDesc?.trim() || project.title,
  tags: Array.isArray(project.tags) ? project.tags : [],
  categories: Array.isArray(project.categories) ? project.categories : [],
  links: {
    live: project.links?.live ?? null,
    repo: project.links?.repo ?? null,
    demo: project.links?.demo ?? null,
  },
  image: typeof project.image === "string" ? project.image : null,
}));
