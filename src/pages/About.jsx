import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);

  const skills = [
    "React", "Next.js", "GSAP", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Firebase", "SQL", "TypeScript", "LangChain", "RAG Pipelines", "Figma"
  ];


  const projects = ["Calculator App (MERN)", "Chat App (Socket.IO)", "Portfolio Website", "Weather App", "To-do List"];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-image", {
        opacity: 0,
        x: -60,
        duration: 1.2,
        ease: "power3.out"
      });

      gsap.from(".about-content > *", {
        opacity: 0,
        x: 60,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });

      gsap.from(".skill-tag", {
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 90%"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-screen bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-slate-50 pt-32 pb-32 px-6 sm:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-24">
        
        {/* Image Section */}
        <div className="about-image w-full lg:w-1/3 sticky top-32">
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <img 
              src="images/profile.png" 
              alt="Adya Archita" 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = "https://via.placeholder.com/600x800?text=Adya+Archita"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
          </div>
        </div>

        {/* Content Section */}
        <div className="about-content flex-1 space-y-12">
          <header>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8">
              The Journey.
            </h1>
            <p className="text-2xl font-medium tracking-tight leading-relaxed text-slate-800 dark:text-slate-200">
              A software engineer sculpting intangible structures that shape our technological world.
            </p>
          </header>

          <div className="space-y-8 text-lg font-medium leading-relaxed tracking-tight text-slate-500 dark:text-slate-400">
            <p>
              As a full-stack developer, I specialize in bridging the gap between design and high-performance engineering. From React and GSAP on the frontend to Node.js and MongoDB on the backend, I build seamless digital experiences with clean architecture and efficient code.
            </p>
            <p>
              I believe that aesthetics and functionality are not mutually exclusive. My passion lies in building intuitive interfaces that feel alive, using motion and precision to create meaningful user journeys.
            </p>
          </div>

          <div className="skills-container space-y-6 pt-8 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Core Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800 text-sm font-bold tracking-tight hover:bg-[#E2725B] hover:text-white hover:border-[#E2725B] transition-all duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Education</h3>
              <p className="text-xl font-bold tracking-tight">B.Tech in Computer Science</p>
              <p className="text-slate-500 text-sm font-medium">Focusing on high-performance computing and user-centric design.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Notable Mentions</h3>
              <ul className="space-y-2 text-slate-500 text-sm font-medium">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2725B]" />
                  Built 10+ scalable MERN applications
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2725B]" />
                  Active contributor to open-source UI libraries
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E2725B]" />
                  Participated in national-level hackathons
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

