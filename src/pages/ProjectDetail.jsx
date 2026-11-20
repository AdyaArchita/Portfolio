import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { gsap } from "gsap";
import { projects } from "../data/projects";

// Case-study narrative keyed by slug; add more as needed
const caseStudies = {
  "career-ops": {
    problem:
      "Existing job-tracking solutions lacked deep customisation, real-time state synchronisation across multiple kanban lanes, and any AI-augmentation for application data extraction.",
    approach:
      "Built a fully typed React Kanban with drag-and-drop lanes, custom middleware for optimistic updates, and a Node.js AI service layer using LLM extraction for parsing job descriptions into structured data.",
    challenges:
      "Managing complex drag-and-drop state without a dedicated library while preserving TypeScript strict-mode throughout. Rate-limiting the AI service to stay within API cost budgets.",
    outcome:
      "Reduced manual job-entry time by ~70%. Custom Kanban now handles 200+ cards with no performance degradation.",
  },
  "nagarsaarthi": {
    problem:
      "Existing AQI dashboards provided no forecasting — only lagging indicators. Users couldn't proactively plan outdoor activities.",
    approach:
      "Trained a multi-variate LSTM network on 3 years of CPCB sensor data. Deployed the model as a Flask microservice, consumed by a React dashboard with real-time WebSocket updates.",
    challenges:
      "Handling missing sensor readings in the training data and avoiding overfitting on seasonal patterns. Tuning look-back window length for optimal prediction horizon.",
    outcome:
      "48-hour AQI forecasts with ~82% accuracy. Dashboard featured at a university research expo.",
  },
  "zairzest-clone": {
    problem:
      "The existing society site was built on a legacy CMS, loading in >6 seconds on mobile and impossible for non-technical club members to update.",
    approach:
      "Full redesign in React + Tailwind with a glassmorphic design language. Statically generated at build time, served from Vercel edge network.",
    challenges:
      "Preserving brand identity while modernising the visual language. Collaborating across 8 contributors on a shared component library.",
    outcome:
      "95+ Lighthouse performance score. Load time dropped from 6.2s to 1.1s. Club membership registrations increased 30% in the following semester.",
  },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = projects.find((p) => p.slug === slug);
    setProject(found || null);
  }, [slug]);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
      gsap.from(".project-image-box", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });
    }, headerRef);
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-bg text-muted pt-32">
        <p className="text-2xl mb-8 font-bold tracking-tighter">Project Not Found</p>
        <Link
          to="/projects"
          className="text-accent hover:underline underline-offset-4 font-bold text-xs uppercase tracking-widest"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const cs = caseStudies[slug];

  return (
    <div ref={headerRef} className="bg-bg min-h-screen pb-0">
      {/* Hero Section */}
      <section className="relative pt-32 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto hero-content space-y-8 mb-24">
          <Link
            to="/projects"
            className="inline-block text-accent font-bold uppercase tracking-widest text-xs hover:underline underline-offset-4"
          >
            ← Case Studies
          </Link>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-text max-w-4xl">
            {project.title}
          </h1>
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-muted max-w-3xl leading-tight">
            {project.shortDesc}
          </p>

          {/* Links row */}
          <div className="flex flex-wrap gap-8 pt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-accent"
              >
                View Source
                <span className="ml-3 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-text hover:text-accent transition-colors"
              >
                Live Demo
                <span className="ml-3 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </a>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto project-image-box relative aspect-video rounded-[3rem] overflow-hidden bg-surface border border-border">
          <img
            src={project.image.replace(/\.(png|jpg|jpeg)$/, '.webp')}
            alt={project.title}
            loading="lazy"
            width="1920"
            height="1080"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "/placeholder.svg"; }}
          />
        </div>
      </section>

      {/* Case Study Body */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 mt-32 grid grid-cols-1 lg:grid-cols-12 gap-24 pb-0">

        {/* Main narrative */}
        <div className="lg:col-span-8 space-y-20">
          {/* Overview */}
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Overview</h2>
            <p className="text-xl font-medium leading-relaxed tracking-tight text-text/80">
              {project.content}
            </p>
          </div>

          {cs && (
            <>
              {/* Problem */}
              <div className="space-y-6 pt-12 border-t border-border">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Problem</h2>
                <p className="text-xl font-medium leading-relaxed tracking-tight text-text/80">
                  {cs.problem}
                </p>
              </div>

              {/* Approach */}
              <div className="space-y-6 pt-12 border-t border-border">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Approach</h2>
                <p className="text-xl font-medium leading-relaxed tracking-tight text-text/80">
                  {cs.approach}
                </p>
              </div>

              {/* Challenges */}
              <div className="space-y-6 pt-12 border-t border-border">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Challenges</h2>
                <p className="text-xl font-medium leading-relaxed tracking-tight text-text/80">
                  {cs.challenges}
                </p>
              </div>

              {/* Outcome */}
              <div className="space-y-6 pt-12 border-t border-border">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Outcome</h2>
                <p className="text-xl font-medium leading-relaxed tracking-tight text-text/80">
                  {cs.outcome}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-12 pt-12 lg:pt-0">
          <div className="sticky top-32 space-y-10">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-muted uppercase tracking-[0.2em]">Role</h4>
              <p className="text-xl font-bold tracking-tight text-text">{project.role}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-muted uppercase tracking-[0.2em]">Year</h4>
              <p className="text-xl font-bold tracking-tight text-text">{project.year}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-muted uppercase tracking-[0.2em]">Stack</h4>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-surface border border-border rounded-full text-xs font-bold uppercase tracking-widest text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-border space-y-4">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center text-xs font-bold uppercase tracking-[0.2em] text-accent"
                >
                  Launch Repository
                  <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center text-xs font-bold uppercase tracking-[0.2em] text-text hover:text-accent transition-colors"
                >
                  Live Demo
                  <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}