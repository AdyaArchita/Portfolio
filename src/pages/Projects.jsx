import { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { ExternalLink, Github, Play } from "lucide-react";
import Reveal from "../components/motion/Reveal";

const FILTER_CATEGORIES = ["All", "AI Agents", "Full-Stack", "ML", "Frontend"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const featuredProjects = projects.filter(
    (project) =>
      project.status === "featured" &&
      (activeCategory === "All" || project.categories.includes(activeCategory))
  );
  const moreProjects = projects.filter((p) => p.status === "more");

  const filterProjects = (category) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
  };

  return (
    <section data-nav-section="/projects" className="bg-bg min-h-screen py-32 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="projects-header mb-16">
          <p className="section-kicker mb-4">01 / PROJECTS</p>
          <Reveal
            as="h1"
            className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-text"
          >
            Recent Work
          </Reveal>
          <Reveal
            as="p"
            className="prose-copy text-muted max-w-3xl text-xl font-medium leading-relaxed tracking-tight"
          >
            A selection of projects that explore the intersection of design,
            technology, and user experience.
          </Reveal>
        </header>

        <div className="mb-12 flex flex-wrap gap-3" role="group" aria-label="Filter featured projects">
          {FILTER_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => filterProjects(category)}
                className={`font-mono rounded-full border px-5 py-3 text-xs font-medium uppercase tracking-widest transition-colors focus-visible ${
                  isActive
                    ? "border-accent bg-accent text-on-accent hover:bg-accent-hover"
                    : "border-border bg-transparent text-text hover:border-accent"
                }`}
              >
                {category === "All" ? "All projects" : category}
              </button>
            );
          })}
        </div>

        {/* FEATURED PROJECTS */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10 mb-32">
          {featuredProjects.map((project, index) => (
            <Reveal
              as="article"
              key={project.id}
              layout
              stagger={0.08}
              index={index}
              className="project-card group flex flex-col rounded-3xl border border-border bg-surface p-8 transition-[transform,border-color] duration-500 motion-safe:hover:-translate-y-1.5 hover:border-accent"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <h2 className="min-w-0 flex-1 break-words text-2xl font-bold tracking-tighter text-text group-hover:text-accent transition-colors duration-300">
                  <Link className="link-underline" to={`/projects/${project.slug}`}>{project.title}</Link>
                </h2>
                <span className="font-mono shrink-0 rounded-full border border-border px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-muted">
                  {project.categories[0]}
                </span>
              </div>

              <p className="prose-copy mb-8 flex-grow text-base font-medium leading-relaxed tracking-tight text-text">
                {project.shortDesc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono px-3 py-1.5 text-[10px] font-medium uppercase tracking-widest rounded-full bg-bg border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-auto pt-6 border-t border-border">
                {project.links.live && (
                  <div className="flex items-center gap-2">
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline font-mono flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent hover:text-accent-hover transition-colors focus-visible"
                      aria-label={`View live site for ${project.title}`}
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                    {project.note && (
                      <span className="font-mono text-[10px] text-muted tracking-widest uppercase ml-1">
                        ({project.note})
                      </span>
                    )}
                  </div>
                )}
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-mono flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-text hover:text-accent transition-colors focus-visible"
                    aria-label={`View repository for ${project.title}`}
                  >
                    <Github size={14} /> Repo
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline font-mono flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-text hover:text-accent transition-colors focus-visible"
                    aria-label={`View demo for ${project.title}`}
                  >
                    <Play size={14} /> Demo
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* MORE PROJECTS */}
        <div className="space-y-12 mb-32">
          <p className="section-kicker">02 / MORE EXPLORATIONS</p>
          <Reveal
            as="h3"
            className="font-display text-2xl font-semibold text-text border-b border-border pb-4"
          >
            More Explorations
          </Reveal>
          <div className="grid grid-cols-1 gap-6">
            {moreProjects.map((project, index) => (
              <Reveal
                as="article"
                key={project.id}
                layout
                stagger={0.08}
                index={index}
                className="compact-project-card group flex flex-col md:flex-row md:items-center justify-between p-6 bg-surface border border-border rounded-2xl transition-[transform,border-color] duration-500 motion-safe:hover:-translate-y-1.5 hover:border-accent gap-6"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <h4 className="text-xl font-bold text-text group-hover:text-accent transition-colors">
                      <Link className="link-underline" to={`/projects/${project.slug}`}>{project.title}</Link>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono px-2 py-1 text-[10px] font-medium uppercase tracking-widest rounded-md bg-bg border border-border text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="prose-copy text-base font-medium leading-relaxed text-muted tracking-tight">
                    {project.shortDesc}
                  </p>
                </div>

                <div className="flex items-center gap-6 md:pl-6 md:border-l border-border">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors focus-visible"
                      aria-label={`View live site for ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {project.links.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-text transition-colors focus-visible"
                      aria-label={`View repository for ${project.title}`}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-text transition-colors focus-visible"
                      aria-label={`View demo for ${project.title}`}
                    >
                      <Play size={18} />
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ALL PROJECTS LINK */}
        <div className="flex justify-center">
          <a
            href="https://github.com/AdyaArchita"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-5 rounded-full bg-surface text-text border border-border font-mono font-medium uppercase tracking-[0.2em] text-xs hover:border-accent transition-colors flex items-center gap-3 focus-visible"
          >
            <Github size={16} />
            All projects on GitHub
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}