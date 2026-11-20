import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { achievements } from "../data/achievements";
import { projects } from "../data/projects";
import GitHubStats from "../components/sections/GitHubStats";
import GroupedSkills from "../components/sections/GroupedSkills";

gsap.registerPlugin(ScrollTrigger);

const education = {
  degree: "B.Tech in Computer Science",
  institution: "Odisha University of Technology & Research (OUTR), Bhubaneswar",
};

const pendingConfirmations = [
  {
    title: "Hack With Zairza — community tooling",
    detail:
      "TODO: Confirm — the current draft lists a contributor role and community-tooling work. Confirm the project, role, period, and outcome before publishing.",
  },
  {
    title: "Zairza Technical Society — platform redesign",
    detail:
      "TODO: Confirm — the current draft uses “Frontend Architect” and includes an unverified performance result. Confirm the title, scope, and result before publishing.",
  },
  {
    title: "NagarSaarthi — AQI/LSTM claim",
    detail:
      "TODO: Confirm — the current draft links an AQI-prediction model to NagarSaarthi, but its current repository description is about waste reporting. Confirm whether this is a separate project or remove the entry.",
  },
];

export default function About() {
  const containerRef = useRef(null);
  const [profileWebp, setProfileWebp] = useState(true);
  const [profileAvailable, setProfileAvailable] = useState(true);
  const featuredProjects = projects
    .filter((project) => project.status === "featured")
    .slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-image", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(".about-content > *", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });

      gsap.from(".timeline-item", {
        scrollTrigger: { trigger: ".timeline-section", start: "top 85%" },
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-bg text-text pt-32 pb-0 px-6 sm:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <header className="about-content mb-16 max-w-3xl">
          <h1 className="mb-6 text-6xl font-bold tracking-tighter md:text-8xl">
            About.
          </h1>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-muted md:text-xl">
            I&apos;m a Computer Science student at OUTR building full-stack and
            AI-driven web applications, with interests in machine learning,
            AI agents, and frontend engineering.
          </p>
        </header>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="about-content space-y-16">
            <section aria-labelledby="education-heading" className="space-y-4">
              <h2
                id="education-heading"
                className="text-xs font-bold uppercase tracking-[0.2em] text-muted"
              >
                Education
              </h2>
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <h3 className="text-xl font-bold tracking-tight">
                  {education.degree}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {education.institution}
                </p>
              </div>
            </section>

            <section aria-labelledby="selected-projects-heading" className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2
                    id="selected-projects-heading"
                    className="text-xs font-bold uppercase tracking-[0.2em] text-muted"
                  >
                    Selected Projects
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    A few explorations from my current project portfolio.
                  </p>
                </div>
                <Link
                  to="/projects"
                  className="text-sm font-bold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  All projects
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {featuredProjects.map((project) => (
                  <article
                    key={project.slug}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <h3 className="text-lg font-bold tracking-tight">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {project.shortDesc}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                      {project.tags.slice(0, 4).map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-4 text-sm">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-accent underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          Live
                        </a>
                      )}
                      {project.links.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-muted underline-offset-4 hover:text-text hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          Repository
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="about-achievements-heading" className="space-y-6">
              <h2
                id="about-achievements-heading"
                className="text-xs font-bold uppercase tracking-[0.2em] text-muted"
              >
                Achievements
              </h2>
              <ol className="space-y-4">
                {achievements.map((achievement) => (
                  <li
                    key={achievement.title}
                    className="rounded-2xl border border-border bg-surface p-6"
                  >
                    <h3 className="font-bold text-text">{achievement.title}</h3>
                    <p className="mt-2 text-sm font-bold text-accent">
                      {achievement.result}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {achievement.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </section>

            <section
              aria-labelledby="projects-hackathons-heading"
              className="timeline-section space-y-6"
            >
              <div>
                <h2
                  id="projects-hackathons-heading"
                  className="text-xs font-bold uppercase tracking-[0.2em] text-muted"
                >
                  Projects &amp; Hackathons
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The following draft entries need confirmation before they can
                  be presented as verified work.
                </p>
              </div>
              <ul className="space-y-4">
                {pendingConfirmations.map((item) => (
                  <li
                    key={item.title}
                    className="timeline-item rounded-2xl border border-border bg-surface p-6"
                  >
                    <h3 className="font-bold text-text">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-label="Technical skills">
              <GroupedSkills />
            </section>
          </div>

          {profileAvailable && (
            <div className="about-image mx-auto w-full max-w-[320px] lg:sticky lg:top-32">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-surface">
                <picture className="block h-full w-full">
                  {profileWebp && (
                    <source type="image/webp" srcSet="/profile.webp" />
                  )}
                  <img
                    src="/profile.png"
                    alt="Adya Archita Pattnaik"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="1000"
                    className="h-full w-full object-cover"
                    onError={() => {
                      if (profileWebp) {
                        setProfileWebp(false);
                        return;
                      }

                      console.warn("Unable to load About profile image: /profile.png");
                      setProfileAvailable(false);
                    }}
                  />
                </picture>
              </div>
            </div>
          )}
        </div>

        <section aria-label="GitHub activity" className="mb-32 mt-20 border-t border-border pt-16">
          <GitHubStats />
        </section>
      </div>
    </section>
  );
}
