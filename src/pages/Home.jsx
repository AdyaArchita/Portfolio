import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const bentoRef = useRef(null);
  const magneticRefs = useRef([]);

  const projects = [
    "CareerOps (AI Kanban)",
    "NagarSaarthi (Predictive AQI)",
    "Automated Orchestration"
  ];

  const skillCategories = [
    {
      title: "Architecture",
      skills: ["MERN Stack", "Next.js", "TypeScript", "Prisma", "PostgreSQL"]
    },
    {
      title: "Intelligence",
      skills: ["Python", "Flask", "LangChain", "Gemini AI", "RAG Pipelines"]
    },
    {
      title: "Creative",
      skills: ["Figma", "GSAP", "Tailwind CSS", "UI Engineering", "Three.js"]
    }
  ];


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
          }
        });
      });

      // 2. Magnetic Buttons
      magneticRefs.current.forEach((btn) => {
        if (!btn) return;
        const moveBtn = (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        };
        const resetBtn = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
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
          scrollTrigger: {
            trigger: counter,
            start: "top 90%",
          }
        });
      });

      // 5. Bento Entrance - More robust reveal
      gsap.fromTo(".bento-item", 
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
            toggleActions: "play none none none"
          }
        }
      );


      // 6. Refresh ScrollTrigger after a short delay to account for preloader exit
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1000);


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
      className="min-h-screen bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-slate-50 pt-32 pb-32 px-6 sm:px-12 flex flex-col items-center selection:bg-[#E2725B] selection:text-white"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-24">
        
        {/* Left: Content */}
        <div className="flex flex-col gap-10 w-full lg:w-3/5 items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
          <div className="space-y-6">
            <div className="overflow-hidden">

              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.8] text-slate-900 dark:text-white split-line">
                Designing Digital <br/> 
                <span className="text-[#E2725B] italic">Experiences.</span>
              </h1>

            </div>
            <div className="overflow-hidden">
              <p className="text-xl md:text-2xl font-medium tracking-tight text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed split-line">
                I'm Adya Archita Pattnaik, a Full-Stack Engineer specialized in building high-performance, AI-driven web applications.
              </p>
            </div>
          </div>

          <div className="hero-btns flex flex-col sm:flex-row gap-8 items-center">
            <Link
              ref={addToMagnetic}
              to="/contact"
              className="group relative px-12 py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] transition-transform duration-500 hover:scale-105"
            >
              Start a Project
            </Link>


            <a 
              ref={addToMagnetic}
              href="/resume.pdf" 
              download="Adya_Archita_Pattnaik_CV.pdf"
              className="px-12 py-6 rounded-full border border-slate-200 dark:border-slate-800 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-transform duration-500"
            >
              Resume 2025
            </a>
          </div>

          <div className="hero-stats flex flex-wrap gap-10 lg:gap-20 pt-16 border-t border-slate-100 dark:border-slate-800 w-full justify-center lg:justify-start">

            <div>
              <p className="text-5xl font-bold tracking-tighter flex items-baseline">
                <span className="count-up" data-target="15">0</span>
                <span className="text-[#E2725B]">+</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 mt-3">Projects Delivered</p>
            </div>
            <div>
              <p className="text-5xl font-bold tracking-tighter flex items-baseline">
                <span className="count-up" data-target="3">0</span>
                <span className="text-[#E2725B]">+</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-400 mt-3">Years Experience</p>
            </div>
          </div>
        </div>

        {/* Right: Parallax Visual */}
        <div className="w-full lg:w-2/5 order-1 lg:order-2">
          <div className="relative aspect-[4/5] max-w-sm mx-auto">
            {/* Background Layer */}
            <div className="parallax-bg absolute inset-0 bg-slate-100 dark:bg-slate-900 rounded-[3.5rem] rotate-6 border border-slate-200 dark:border-slate-800" />
            
            {/* Main Image Layer */}
            <div className="parallax-img relative h-full w-full bg-slate-200 dark:bg-slate-800 rounded-[3.5rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl">
              <img 
                src="images/profile.png" 
                alt="Adya Archita" 
                className="w-full h-full object-cover transition-all duration-1000"
                onError={(e) => { e.target.src = "https://via.placeholder.com/600x800?text=AP"; }}
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
        {/* Selected Works - Small/Wide Bento */}
        <div className="bento-item md:col-span-5 p-12 rounded-[3rem] bg-white/5 dark:bg-slate-900/30 backdrop-blur-2xl border border-slate-100/50 dark:border-white/10 flex flex-col justify-between group hover:border-[#E2725B]/40 transition-all duration-500 shadow-xl">
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-400 mb-12">Selected Works</h3>
            <div className="space-y-8">
              {projects.map((p, i) => (
                <div key={i} className="flex items-center gap-6 group/item cursor-pointer">
                  <div className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-700 group-hover/item:bg-[#E2725B] group-hover/item:border-[#E2725B] transition-all duration-300" />
                  <p className="text-xl font-medium tracking-tight text-slate-600 dark:text-slate-400 group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors">{p}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 flex justify-start">
            <Link to="/projects" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E2725B]">
              Explore All 
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>
          </div>
        </div>

        {/* Expertise - Large/Primary Bento */}
        <div className="bento-item md:col-span-7 p-12 rounded-[3rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex flex-col shadow-2xl relative overflow-hidden">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-40 mb-14">Core Expertise</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {skillCategories.map((cat, i) => (
              <div key={i} className="space-y-6">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#E2725B] dark:text-[#E2725B]">{cat.title}</h4>
                <ul className="space-y-4">
                  {cat.skills.map((skill, si) => (
                    <li key={si} className="text-lg font-bold tracking-tighter opacity-80 hover:opacity-100 hover:translate-x-1 transition-all cursor-default">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-16 border-t border-white/10 dark:border-black/5">
            <p className="text-4xl md:text-5xl font-bold tracking-tighter leading-[0.9] max-w-xl">
              Engineering <span className="opacity-40 italic">Future-Ready</span> <br/> Digital Ecosystems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}