import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { allSkills } from "../data/skills";
import GitHubStats from "../components/sections/GitHubStats";
import GroupedSkills from "../components/sections/GroupedSkills";

gsap.registerPlugin(ScrollTrigger);

const education = {
  degree: "B.Tech in Computer Science",
  institution: "CET Bhubaneswar",
  year: "2022 – Present",
  detail: "Focusing on high-performance computing and user-centric design.",
};

const experience = [
  {
    role: "Open Source Contributor",
    org: "Hack With Zairza",
    period: "2025",
    description: "Architected Telegram automation bots and community-management tooling for a month-long hackathon, onboarding 100+ developers.",
  },
  {
    role: "Frontend Architect",
    org: "Zairza Technical Society",
    period: "2024",
    description: "Led the redesign and implementation of the society's public-facing platform using React and Tailwind, improving mobile performance by ~40%.",
  },
  {
    role: "AI/ML Developer",
    org: "Personal Research",
    period: "2024",
    description: "Trained and deployed an LSTM model for real-time AQI prediction; integrated it into a React dashboard (NagarSaarthi).",
  },
];

export default function About() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-image", {
        opacity: 0,
        x: -60,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".about-content > *", {
        opacity: 0,
        x: 60,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".skill-tag", {
        scrollTrigger: { trigger: ".skills-container", start: "top 90%" },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
      });

      gsap.from(".timeline-item", {
        scrollTrigger: { trigger: ".timeline-section", start: "top 85%" },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-bg text-primary pt-32 pb-0 px-6 sm:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Hero Row */}
        <div className="flex flex-col lg:flex-row items-start gap-24 mb-32">
          {/* Image */}
          <div className="about-image w-full lg:w-1/3 sticky top-32">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-surface border border-border">
              <img
                src="/images/profile.webp"
                alt="Adya Archita Pattnaik"
                loading="lazy"
                width="800"
                height="1000"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "/images/placeholder.svg"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            </div>
          </div>

          {/* Bio */}
          <div className="about-content flex-1 space-y-12">
            <header>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
                The Journey.
              </h1>
              <p className="text-2xl font-medium tracking-tight leading-relaxed text-primary/90">
                A software engineer sculpting intangible structures that shape our
                technological world.
              </p>
            </header>

            <div className="space-y-8 text-lg font-medium leading-relaxed tracking-tight text-muted">
              <p>
                As a full-stack developer, I specialize in bridging the gap between
                design and high-performance engineering. From React and GSAP on the
                frontend to Node.js and MongoDB on the backend, I build seamless
                digital experiences with clean architecture and efficient code.
              </p>
              <p>
                I believe that aesthetics and functionality are not mutually exclusive.
                My passion lies in building intuitive interfaces that feel alive, using
                motion and precision to create meaningful user journeys.
              </p>
            </div>

            <div className="skills-container space-y-6 pt-8 border-t border-border">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                Core Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {allSkills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-tag px-6 py-3 rounded-full border border-border text-sm font-bold tracking-tight hover:bg-accent hover:text-bg hover:border-accent transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
                  Education
                </h3>
                <p className="text-xl font-bold tracking-tight">{education.degree}</p>
                <p className="text-muted text-sm font-medium">{education.institution} · {education.year}</p>
                <p className="text-muted text-sm font-medium">{education.detail}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Experience / Timeline */}
        <div className="timeline-section mb-32 space-y-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
            Experience & Achievements
          </h2>
          <div className="relative space-y-0">
            {/* Vertical line */}
            <div className="absolute left-[5px] top-3 bottom-3 w-[1px] bg-border" />

            {experience.map((item, i) => (
              <div key={i} className="timeline-item relative pl-12 pb-16">
                {/* Dot */}
                <div className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-accent bg-bg" />

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-4">
                    <h3 className="text-xl font-bold tracking-tighter text-primary">
                      {item.role}
                    </h3>
                    <span className="text-xs font-bold text-muted uppercase tracking-widest">
                      @ {item.org}
                    </span>
                    <span className="ml-auto text-xs font-bold text-accent uppercase tracking-widest">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-muted font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grouped Skills */}
        <div className="mb-32 pt-16 border-t border-border">
          <GroupedSkills />
        </div>

        {/* GitHub Stats */}
        <div className="mb-32 pt-16 border-t border-border">
          <GitHubStats />
        </div>

      </div>
    </section>
  );
}
