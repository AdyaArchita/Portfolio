import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { projects } from "../data/projects";
import { ExternalLink, Github, Play } from "lucide-react";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, Flip);

const FILTER_CATEGORIES = ["All", "AI Agents", "Full-Stack", "ML", "Frontend"];

export default function Projects() {
  const containerRef = useRef(null);
  const previousLayout = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const prefersReducedMotion = usePrefersReducedMotion();

  const featuredProjects = projects.filter(
    (project) =>
      project.status === "featured" &&
      (activeCategory === "All" || project.categories.includes(activeCategory))
  );
  const moreProjects = projects.filter((p) => p.status === "more");

  const filterProjects = (category) => {
    if (category === activeCategory) return;
    if (!prefersReducedMotion) {
      previousLayout.current = Flip.getState(".project-card");
    }
    setActiveCategory(category);
  };

  useLayoutEffect(() => {
    if (!previousLayout.current) return;
    if (prefersReducedMotion) {
      previousLayout.current = null;
      return;
    }
    const animation = Flip.from(previousLayout.current, {
      duration: 0.4,
      ease: "power2.out",
      absolute: true,
      prune: true,
    });
    previousLayout.current = null;
    return () => animation.kill();
  }, [activeCategory, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".projects-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // Batch Animation for Featured Cards
      ScrollTrigger.batch(".project-card", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", overwrite: true }
          );
        },
        once: true,
      });

      // Batch Animation for Compact Row
      ScrollTrigger.batch(".compact-project-card", {
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", overwrite: true }
          );
        },
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="bg-bg min-h-screen py-32 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="projects-header mb-16">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-text">
            Recent Work
          </h1>
          <p className="text-muted max-w-3xl text-xl font-medium leading-relaxed tracking-tight">
            A selection of projects that explore the intersection of design,
            technology, and user experience.
          </p>
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
                className={`rounded-full border px-5 py-3 text-xs font-bold uppercase tracking-widest transition-colors focus-visible ${
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
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card group flex flex-col rounded-3xl border border-border bg-surface p-8 transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-accent"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tighter text-text group-hover:text-accent transition-colors duration-300">
                  <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                </h2>
                <span className="shrink-0 rounded-full border border-border px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted">
                  {project.categories[0]}
                </span>
              </div>

              <p className="mb-8 flex-grow text-base font-medium leading-relaxed tracking-tight text-text">
                {project.shortDesc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full bg-bg border border-border text-muted"
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
                      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-accent-hover transition-colors focus-visible"
                      aria-label={`View live site for ${project.title}`}
                    >
                      <ExternalLink size={14} /> Live
                    </a>
                    {project.note && (
                      <span className="text-[10px] text-muted tracking-widest uppercase ml-1">
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
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text hover:text-accent transition-colors focus-visible"
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
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text hover:text-accent transition-colors focus-visible"
                    aria-label={`View demo for ${project.title}`}
                  >
                    <Play size={14} /> Demo
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* MORE PROJECTS */}
        <div className="space-y-12 mb-32">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted border-b border-border pb-4">
            More Explorations
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {moreProjects.map((project) => (
              <article
                key={project.id}
                className="compact-project-card group flex flex-col md:flex-row md:items-center justify-between p-6 bg-surface border border-border rounded-2xl hover:border-accent/30 transition-colors duration-300 gap-6"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <h4 className="text-xl font-bold text-text group-hover:text-accent transition-colors">
                      <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-bg border border-border text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-muted tracking-tight">
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
              </article>
            ))}
          </div>
        </div>

        {/* ALL PROJECTS LINK */}
        <div className="flex justify-center">
          <a
            href="https://github.com/AdyaArchita"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-10 py-5 rounded-full bg-surface text-text border border-border font-bold uppercase tracking-[0.2em] text-xs hover:border-accent transition-colors flex items-center gap-3 focus-visible"
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