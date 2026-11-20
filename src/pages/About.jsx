import { useState } from "react";
import { Link } from "react-router-dom";
import { achievements } from "../data/achievements";
import { projects } from "../data/projects";
import GitHubStats from "../components/sections/GitHubStats";
import GroupedSkills from "../components/sections/GroupedSkills";
import Reveal from "../components/motion/Reveal";

const education = {
  degree: "B.Tech in Computer Science",
  institution: "Odisha University of Technology & Research (OUTR), Bhubaneswar",
};

export default function About() {
  const [profileWebp, setProfileWebp] = useState(true);
  const [profileAvailable, setProfileAvailable] = useState(true);
  const featuredProjects = projects
    .filter((project) => project.status === "featured")
    .slice(0, 3);

  return (
    <section
      data-nav-section="/about"
      className="min-h-screen bg-bg text-text pt-32 pb-0 px-6 sm:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <header className="about-content mb-16 max-w-3xl">
          <p className="section-kicker mb-4">01 / ABOUT</p>
          <Reveal
            as="h1"
            className="font-display mb-6 text-6xl font-bold tracking-tighter md:text-8xl"
          >
            About.
          </Reveal>
          <Reveal
            as="p"
            className="prose-copy max-w-2xl text-base font-medium leading-relaxed text-muted md:text-xl"
          >
            Computer Science student at OUTR building full-stack and AI-driven
            apps, exploring ML, AI agents, and frontend engineering.
          </Reveal>
        </header>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="about-content space-y-16">
            <section aria-labelledby="education-heading" className="space-y-4">
              <p className="section-kicker">02 / EDUCATION</p>
              <Reveal
                as="h2"
                id="education-heading"
                className="font-display text-2xl font-semibold text-text"
              >
                Education
              </Reveal>
              <Reveal as="div" className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <h3 className="text-xl font-bold tracking-tight">
                  {education.degree}
                </h3>
                <p className="prose-copy mt-2 text-base leading-relaxed text-muted">
                  {education.institution}
                </p>
              </Reveal>
            </section>

            <section aria-labelledby="selected-projects-heading" className="space-y-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="section-kicker">03 / SELECTED PROJECTS</p>
                  <Reveal
                    as="h2"
                    id="selected-projects-heading"
                    className="font-display mt-2 text-2xl font-semibold text-text"
                  >
                    Selected Projects
                  </Reveal>
                  <Reveal as="p" className="prose-copy mt-2 text-base text-muted">
                    A few explorations from my current project portfolio.
                  </Reveal>
                </div>
                <Link
                  to="/projects"
                  className="link-underline font-mono text-xs font-medium text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                >
                  All projects
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {featuredProjects.map((project, index) => (
                  <Reveal
                    as="article"
                    key={project.slug}
                    className="rounded-2xl border border-border bg-surface p-6"
                    stagger={0.08}
                    index={index}
                  >
                    <h3 className="text-lg font-bold tracking-tight">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="link-underline hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    <p className="prose-copy mt-2 text-base leading-relaxed text-muted">
                      {project.shortDesc}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                      {project.tags.slice(0, 4).map((tag) => (
                        <li
                          key={tag}
                          className="font-mono rounded-full border border-border px-3 py-1 text-[10px] text-muted"
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
                          className="link-underline font-mono text-xs font-medium text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          Live
                        </a>
                      )}
                      {project.links.repo && (
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline font-mono text-xs font-medium text-muted hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          Repository
                        </a>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            <section aria-labelledby="about-achievements-heading" className="space-y-6">
              <p className="section-kicker">04 / ACHIEVEMENTS</p>
              <Reveal
                as="h2"
                id="about-achievements-heading"
                className="font-display text-2xl font-semibold text-text"
              >
                Achievements
              </Reveal>
              <ol className="space-y-4">
                {achievements.map((achievement, index) => (
                  <Reveal
                    as="li"
                    key={achievement.title}
                    className="rounded-2xl border border-border bg-surface p-6"
                    stagger={0.08}
                    index={index}
                  >
                    <h3 className="font-display text-lg font-semibold text-text">{achievement.title}</h3>
                    <p className="font-mono mt-2 text-xs font-medium text-accent">
                      {achievement.result}
                    </p>
                    <p className="prose-copy mt-2 text-base leading-relaxed text-muted">
                      {achievement.detail}
                    </p>
                  </Reveal>
                ))}
              </ol>
            </section>

            <section aria-label="Technical skills">
              <GroupedSkills />
            </section>
          </div>

          {profileAvailable && (
            <Reveal as="div" className="about-image mx-auto w-full max-w-[320px] lg:sticky lg:top-32">
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
            </Reveal>
          )}
        </div>

        <section aria-label="GitHub activity" className="mb-32 mt-20 border-t border-border pt-16">
          <GitHubStats />
        </section>
      </div>
    </section>
  );
}
