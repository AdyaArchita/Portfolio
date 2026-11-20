import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import { ExternalLink, Github, Play } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);

  const featuredProjects = projects.filter((p) => p.status === "featured");
  const moreProjects = projects.filter((p) => p.status === "more");

  useEffect(() => {
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
  }, []);

  return (
    <section ref={containerRef} className="bg-bg min-h-screen py-32 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="projects-header mb-32">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-text">
            Recent Work
          </h1>
          <p className="text-muted max-w-3xl text-xl font-medium leading-relaxed tracking-tight">
            A selection of projects that explore the intersection of design,
            technology, and user experience.
          </p>
        </header>

        {/* FEATURED PROJECTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-32">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card group flex flex-col p-10 bg-surface border border-border rounded-3xl hover:border-accent/40 transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-text tracking-tighter group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h2>
                {project.category && (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-muted border border-border rounded-full">
                    {project.category}
                  </span>
                )}
              </div>

              <p className="text-text/90 text-lg font-medium leading-relaxed tracking-tight mb-8 flex-grow">
                {project.hook}
              </p>

              {(project.measured || project.safeguards) && (
                <div className="space-y-4 mb-10">
                  {project.measured && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-muted block mb-1">
                        Measured
                      </span>
                      <p className="text-sm font-medium text-text/80">{project.measured}</p>
                    </div>
                  )}
                  {project.safeguards && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-muted block mb-1">
                        Safeguards
                      </span>
                      <p className="text-sm font-medium text-text/80">{project.safeguards}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8">
                {project.stack.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full bg-bg border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-6 mt-auto pt-6 border-t border-border">
                {project.tryIt?.live && (
                  <div className="flex items-center gap-2">
                    <a
                      href={project.tryIt.live}
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
                {project.tryIt?.repo && (
                  <a
                    href={project.tryIt.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text hover:text-accent transition-colors focus-visible"
                    aria-label={`View repository for ${project.title}`}
                  >
                    <Github size={14} /> Repo
                  </a>
                )}
                {project.tryIt?.demo && (
                  <a
                    href={project.tryIt.demo}
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
                      {project.title}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.slice(0, 5).map((tag) => (
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
                    {project.hook}
                  </p>
                </div>

                <div className="flex items-center gap-6 md:pl-6 md:border-l border-border">
                  {project.tryIt?.live && (
                    <a
                      href={project.tryIt.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-accent transition-colors focus-visible"
                      aria-label={`View live site for ${project.title}`}
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  {project.tryIt?.repo && (
                    <a
                      href={project.tryIt.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted hover:text-text transition-colors focus-visible"
                      aria-label={`View repository for ${project.title}`}
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.tryIt?.demo && (
                    <a
                      href={project.tryIt.demo}
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