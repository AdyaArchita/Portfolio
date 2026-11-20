import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as allProjects } from "../data/projects";
import { skillCategories } from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const bentoRef = useRef(null);
  const magneticRefs = useRef([]);

  // Show first 3 project titles in the bento
  const featuredTitles = allProjects.slice(0, 3).map((p) => p.title);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Split Text Reveal (Line by line)
      const splitLines = gsap.utils.toArray(".split-line");
      splitLines.forEach((line) => {
        gsap.from(line, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
          },
        });
      });

      // 2. Magnetic Buttons
      magneticRefs.current.forEach((btn) => {
        if (!btn) return;
        const moveBtn = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
        };
        const resetBtn = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        };
        btn.addEventListener("mousemove", moveBtn);
        btn.addEventListener("mouseleave", resetBtn);
      });

      // 3. Parallax Profile
      const handleParallax = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;
        gsap.to(".parallax-bg", { x: xPos * 0.5, y: yPos * 0.5, duration: 0.6 });
        gsap.to(".parallax-img", { x: -xPos * 0.3, y: -yPos * 0.3, duration: 0.6 });
      };
      window.addEventListener("mousemove", handleParallax);

      // 4. Dynamic Counter
      const counters = gsap.utils.toArray(".count-up");
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        gsap.to(counter, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: { trigger: counter, start: "top 90%" },
        });
      });

      // 5. Bento Entrance
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

      // 6. Refresh ScrollTrigger after preloader exit
      setTimeout(() => ScrollTrigger.refresh(), 1000);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const addToMagnetic = (el) => {
    if (el && !magneticRefs.current.includes(el)) {
      magneticRefs.current.push(el);
    }
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-bg text-primary pt-32 pb-32 px-6 sm:px-12 flex flex-col items-center selection:bg-accent selection:text-bg"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-24">

        {/* Left: Content */}
        <div className="flex flex-col gap-10 w-full lg:w-3/5 items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-6">
            <div className="overflow-hidden">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.8] text-primary split-line">
                Designing Digital <br />
                <span className="text-accent italic">Experiences.</span>
              </h1>
            </div>
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl font-medium tracking-tight text-muted max-w-xl leading-relaxed split-line">
                I'm Adya Archita Pattnaik, a Full-Stack Engineer specialized in
                building high-performance, AI-driven web applications.
              </p>
            </div>
          </div>

          <div className="hero-btns flex flex-col sm:flex-row gap-8 items-center">
            {/* Intentional inversion CTA: dark in light mode, white in dark mode */}
            <Link
              ref={addToMagnetic}
              to="/contact"
              className="group relative px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-transform duration-500 hover:scale-105"
            >
              Start a Project
            </Link>

            <a
              ref={addToMagnetic}
              href="/resume.pdf"
              download="Adya_Archita_Pattnaik_CV.pdf"
              className="px-12 py-6 rounded-full border border-border font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2 hover:bg-surface transition-transform duration-500"
            >
              Resume 2025
            </a>
          </div>

          <div className="hero-stats flex flex-wrap gap-10 lg:gap-20 pt-16 border-t border-border w-full justify-center lg:justify-start">
            <div>
              <p className="text-5xl font-bold tracking-tighter flex items-baseline">
                <span className="count-up" data-target="15">0</span>
                <span className="text-accent">+</span>
              </p>
              <p className="text-xs uppercase tracking-[0.4em] font-bold text-muted mt-3">
                Projects Delivered
              </p>
            </div>
            <div>
              <p className="text-5xl font-bold tracking-tighter flex items-baseline">
                <span className="count-up" data-target="3">0</span>
                <span className="text-accent">+</span>
              </p>
              <p className="text-xs uppercase tracking-[0.4em] font-bold text-muted mt-3">
                Years Experience
              </p>
            </div>
          </div>
        </div>

        {/* Right: Parallax Visual */}
        <div className="w-full lg:w-2/5 order-1 lg:order-2">
          <div className="relative aspect-[4/5] max-w-sm mx-auto">
            <div className="parallax-bg absolute inset-0 bg-surface rounded-[3.5rem] rotate-6 border border-border" />
            <div className="parallax-img relative h-full w-full bg-surface rounded-[3.5rem] overflow-hidden border border-border shadow-2xl">
              <img
                src="/images/profile.webp"
                alt="Adya Archita"
                loading="lazy"
                width="800"
                height="1000"
                className="w-full h-full object-cover transition-all duration-1000"
                onError={(e) => { e.target.src = "/images/placeholder.svg"; }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div
        ref={bentoRef}
        className="max-w-7xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-12 gap-8 w-full"
      >
        {/* Selected Works */}
        <div className="bento-item md:col-span-5 p-12 rounded-[3rem] bg-surface/20 backdrop-blur-2xl border border-border/50 flex flex-col justify-between group hover:border-accent/40 transition-all duration-500 shadow-xl">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-muted mb-12">
              Selected Works
            </h3>
            <div className="space-y-8">
              {featuredTitles.map((title, i) => (
                <div key={i} className="flex items-center gap-6 group/item cursor-pointer">
                  <div className="w-3 h-3 rounded-full border border-border group-hover/item:bg-accent group-hover/item:border-accent transition-all duration-300" />
                  <p className="text-xl font-medium tracking-tight text-muted group-hover/item:text-primary transition-colors">
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

        {/* Expertise — intentional inversion card */}
        <div className="bento-item md:col-span-7 p-12 rounded-[3rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col shadow-2xl relative overflow-hidden">
          <h3 className="text-xs font-bold uppercase tracking-[0.5em] opacity-40 mb-14">
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
                      className="text-lg font-bold tracking-tighter opacity-80 hover:opacity-100 hover:translate-x-1 transition-all cursor-default"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-16 border-t border-white/10 dark:border-black/5">
            <p className="text-4xl md:text-5xl font-bold tracking-tighter leading-[0.9] max-w-xl">
              Engineering{" "}
              <span className="opacity-40 italic">Future-Ready</span> <br />
              Digital Ecosystems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}