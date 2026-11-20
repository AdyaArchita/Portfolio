import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap } from "gsap";
import { projects } from "../data/projects";

const caseStudies = {
  nagarsaarthi: {
    problem:
      "Citizens need a way to report waste issues, while municipal authorities need visibility into reports and hotspots.",
    approach:
      "NagarSaarthi combines image-based citizen reporting, the EcoSort chatbot, interactive maps, and municipal dashboards.",
  },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const headerRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(".hero-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
      if (project.image) {
        gsap.from(".project-image-box", {
          scale: 1.05,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      }
    }, headerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 pt-32 text-center text-muted">
        <p className="mb-8 text-2xl font-bold tracking-tighter">Project Not Found</p>
        <Link
          to="/projects"
          className="text-xs font-bold uppercase tracking-widest text-accent hover:underline underline-offset-4"
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const caseStudy = caseStudies[project.slug];
  const imageSrc = project.image
    ? project.image.replace(/\.(png|jpe?g)$/i, ".webp")
    : null;

  return (
    <div ref={headerRef} className="min-h-screen bg-bg pb-0">
      <section className="relative px-6 pt-32 sm:px-12">
        <div className="hero-content mx-auto mb-24 max-w-7xl space-y-8">
          <Link
            to="/projects"
            className="inline-block text-xs font-bold uppercase tracking-widest text-accent hover:underline underline-offset-4"
          >
            ← All Projects
          </Link>
          <h1 className="max-w-4xl text-6xl font-bold tracking-tighter text-text md:text-8xl lg:text-9xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-muted md:text-3xl">
            {project.shortDesc}
          </p>
          <div className="flex flex-wrap gap-8 pt-4">
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-[0.2em] text-accent"
              >
                View Source →
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-[0.2em] text-text hover:text-accent transition-colors"
              >
                Live Demo →
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold uppercase tracking-[0.2em] text-text hover:text-accent transition-colors"
              >
                Demo →
              </a>
            )}
          </div>
        </div>

        {imageSrc && (
          <div className="project-image-box relative mx-auto aspect-video max-w-7xl overflow-hidden rounded-3xl border border-border bg-surface">
            <img
              src={imageSrc}
              alt={`${project.title} project`}
              loading="lazy"
              width="1920"
              height="1080"
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.src = "/placeholder.svg";
              }}
            />
          </div>
        )}
      </section>

      <section className="mx-auto mt-32 grid max-w-7xl grid-cols-1 gap-16 px-6 pb-32 sm:px-12 lg:grid-cols-12 lg:gap-24">
        <div className="space-y-20 lg:col-span-8">
          <div className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Overview</h2>
            <p className="text-xl font-medium leading-relaxed tracking-tight text-text">
              {project.content || project.shortDesc}
            </p>
          </div>

          {caseStudy && (
            <>
              <div className="space-y-6 border-t border-border pt-12">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Problem</h2>
                <p className="text-xl font-medium leading-relaxed tracking-tight text-text">
                  {caseStudy.problem}
                </p>
              </div>
              <div className="space-y-6 border-t border-border pt-12">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Approach</h2>
                <p className="text-xl font-medium leading-relaxed tracking-tight text-text">
                  {caseStudy.approach}
                </p>
              </div>
            </>
          )}
        </div>

        <aside className="space-y-6 pt-12 lg:col-span-4 lg:pt-0">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">Stack</h2>
          <ul className="flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-surface px-4 py-2 text-xs font-bold uppercase tracking-widest text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
