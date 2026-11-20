import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as allProjects } from "../data/projects";
import { achievements } from "../data/achievements";
import { skillCategories } from "../data/skills";
import { site } from "../data/site";
import { useMagneticButton } from "../hooks/useMagneticButton";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const bentoRef = useRef(null);
  const [profileAvailable, setProfileAvailable] = useState(true);
  const [profileUseWebp, setProfileUseWebp] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const addToMagnetic = useMagneticButton();
  const prefersReducedMotion = usePrefersReducedMotion();
  const roles = ["Full-Stack", "AI Agents", "Data & ML"];

  const featuredTitles = allProjects
    .filter((project) => project.status === "featured")
    .slice(0, 3)
    .map((project) => project.title);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bentoRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      setTimeout(() => ScrollTrigger.refresh(), 1000);
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [roles.length, prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-bg text-text pt-32 pb-32 px-6 sm:px-12 flex flex-col items-center selection:bg-accent selection:text-on-accent"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-24">

        {/* Left: Content */}
        <div className="flex flex-col gap-10 w-full lg:w-3/5 items-center lg:items-start text-center lg:text-left order-1 lg:order-1">
          <div className="space-y-6">
            <div className="overflow-hidden">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-text">
                <span className="hero-word" style={{ "--hero-word-delay": "0ms" }}>Designing</span>{" "}
                <span className="hero-word" style={{ "--hero-word-delay": "170ms" }}>Digital</span>
                <br />
                <span className="hero-word text-accent italic" style={{ "--hero-word-delay": "340ms" }}>
                  Experiences.
                </span>
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl font-medium tracking-tight text-muted max-w-xl leading-relaxed">
                I&apos;m Adya Archita Pattnaik, a B.Tech Computer Science student building full-stack and AI-driven web applications.
              </p>
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-muted">
                Focus:{" "}
                <span key={roles[roleIndex]} className="role-word text-text">
                  {roles[roleIndex]}
                </span>
              </p>
            </div>
          </div>

          <div className="hero-btns flex flex-col sm:flex-row gap-8 items-center">
            <Link
              ref={addToMagnetic}
              to="/projects"
              className="group relative px-10 py-5 bg-accent text-on-accent rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-colors hover:bg-accent-hover"
            >
              View Projects
            </Link>

            <a
              ref={addToMagnetic}
              href={site.resumePath}
              download="Adya-Archita-Pattnaik-Resume.pdf"
              className="px-10 py-5 rounded-full border border-border text-text font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2 bg-transparent hover:border-accent transition-colors"
            >
              Resume
            </a>
          </div>

          <div className="hero-stats grid w-full grid-cols-1 gap-6 border-t border-border pt-8 sm:grid-cols-3">
            <div>
              <p className="text-3xl font-bold tracking-tighter text-accent">{allProjects.length}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-muted">Projects listed</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tighter text-accent">98.70 percentile</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-muted">Naukri Campus Young Turks</p>
            </div>
            <div>
              <p className="text-3xl font-bold tracking-tighter text-accent">Top 15k</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-muted">Google Big Code</p>
            </div>
          </div>
        </div>

        {/* Right: Profile Image */}
        {profileAvailable && (
          <div className="w-full lg:w-2/5 order-2 lg:order-2">
            <div className="relative aspect-[4/5] w-full max-w-[320px] lg:max-w-sm mx-auto rounded-3xl overflow-hidden border border-border bg-surface">
              <picture className="block h-full w-full">
                {profileUseWebp && (
                  <source type="image/webp" srcSet="/profile.webp" />
                )}
                <img
                  src="/profile.png"
                  alt="Adya Archita Pattnaik"
                  loading="eager"
                  width="800"
                  height="1000"
                  className="h-full w-full object-cover"
                  onError={() => {
                    if (profileUseWebp) {
                      setProfileUseWebp(false);
                      return;
                    }

                    console.warn("Unable to load hero profile image: /profile.png");
                    setProfileAvailable(false);
                  }}
                />
              </picture>
            </div>
          </div>
        )}
      </div>

      <section aria-labelledby="home-achievements" className="mx-auto mt-20 w-full max-w-7xl">
        <h2 id="home-achievements" className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-muted">
          Achievements
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {achievements.map((achievement) => (
            <article key={achievement.title} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="text-base font-bold text-text">{achievement.title}</h3>
              <p className="mt-3 text-sm font-bold text-accent">{achievement.result}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{achievement.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Bento Grid */}
      <div
        ref={bentoRef}
        className="max-w-7xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 w-full"
      >
        {/* Selected Works */}
        <div className="bento-item md:col-span-5 p-12 rounded-[3rem] bg-surface border border-border flex flex-col justify-between group hover:border-accent/40 transition-all duration-500">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-muted mb-12">
              Selected Works
            </h3>
            <div className="space-y-8">
              {featuredTitles.map((title, i) => (
                <div key={i} className="flex items-center gap-6 group/item cursor-pointer">
                  <div className="w-3 h-3 rounded-full border border-border group-hover/item:bg-accent group-hover/item:border-accent transition-all duration-300" />
                  <p className="text-xl font-medium tracking-tight text-muted group-hover/item:text-text transition-colors">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 flex justify-start">
            <Link
              to="/projects"
              className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] text-accent"
            >
              Explore All
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </Link>
          </div>
        </div>

        {/* Expertise */}
        <div className="bento-item md:col-span-7 p-12 rounded-[3rem] bg-surface text-text flex flex-col border border-border relative overflow-hidden">
          <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-muted mb-14">
            Core Expertise
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {skillCategories.map((cat, i) => (
              <div key={i} className="space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-accent">
                  {cat.title}
                </h4>
                <ul className="space-y-4">
                  {cat.skills.map((skill, si) => (
                    <li
                      key={si}
                      className="text-lg font-bold tracking-tighter hover:translate-x-1 transition-all cursor-default"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-16 border-t border-border">
            <p className="text-4xl md:text-5xl font-bold tracking-tighter leading-[0.9] max-w-xl">
              Engineering{" "}
              <span className="text-muted italic">Future-Ready</span> <br />
              Digital Ecosystems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}