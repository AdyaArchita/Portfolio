import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { gsap } from "gsap";

const myProjects = [
  {
    title: "CareerOps",
    description: "AI-Enhanced Kanban Architecture",
    content: "An enterprise-grade, strictly typed application engineered to orchestrate complex career lifecycles. Designed a custom React Kanban interface for seamless state management, backed by a robust Node.js ecosystem featuring custom middleware, rate-limiting, and a dedicated AI service layer for intelligent data extraction.",
    tags: ["TypeScript", "React", "Node.js", "AI Service Layer", "State Management"],
    image: "/images/nagarsaarthi.jpg",
    slug: "career-ops",
    author: "Full Stack Engineer",
    date: "2025",
    link: "https://github.com/AdyaArchita/JobTracker"
  },
  {
    title: "NagarSaarthi",
    description: "Predictive AQI Intelligence",
    content: "An advanced environmental intelligence dashboard predicting Air Quality Indices. Trained and deployed a predictive LSTM neural network, integrating it seamlessly into a high-performance React frontend to deliver real-time environmental monitoring and data analytics.",
    tags: ["Python", "LSTM Neural Networks", "React", "Data Visualization"],
    image: "/images/nagarsaarthi.jpg",
    slug: "nagarsaarthi",
    author: "AI/ML Developer",
    date: "2025",
    link: "https://github.com/AdyaArchita/NagarSaarthi"
  },
  {
    title: "Zairza",
    description: "TechSoc Ecosystem",
    content: "A high-performance, glassmorphic platform engineered for the university technical society. Focused on fluid UI/UX interactions, responsive component architecture, and a modern frontend ecosystem to handle high-traffic community events and technical fests.",
    tags: ["React", "Tailwind CSS", "Frontend Architecture", "UI Engineering"],
    image: "/images/zairzest.jpg",
    slug: "zairzest-clone",
    author: "Frontend Architect",
    date: "2025",
    link: "https://github.com/AdyaArchita/Zairzest2"
  },
  {
    title: "Automated Community Orchestration",
    description: "Core open-source contribution for a flagship month-long hackathon event.",
    content: "Architected automated community management tools and resource-finding algorithms leveraging the Telegram API to support asynchronous collaboration and seamless developer onboarding.",
    tags: ["Python", "Telegram API", "Open Source", "Workflow Automation"],
    image: "/images/hackwithzairza.jpg",
    slug: "hack-with-zairza",
    author: "Open Source Contributor",
    date: "2025",
    link: "https://github.com/zairza-cetb/HackWithZairza"
  },
  {
    title: "Soft-UI Neumorphic Engine",
    description: "Functional computational interface built on Neumorphic design.",
    content: "A functional computational interface built on the modern Neumorphic design language. Focuses heavily on satisfying soft-UI micro-interactions, robust mathematical logic, and advanced CSS state architecture.",
    tags: ["React", "CSS Architecture", "UI/UX Logic", "State Handling"],
    image: "/images/calculator.jpg",
    slug: "calculator-app",
    author: "UI/UX Developer",
    date: "2025",
    link: "https://github.com/AdyaArchita/Calculator"
  }
];


export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const headerRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = myProjects.find((p) => p.slug === slug);
    setProject(found);
  }, [slug]);

  useEffect(() => {
    if (project) {
      const ctx = gsap.context(() => {
        gsap.from(".hero-content > *", {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out"
        });
        
        gsap.from(".project-image-box", {
          scale: 1.1,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out"
        });
      }, headerRef);
      return () => ctx.revert();
    }
  }, [project]);

  if (!project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-[#0A0A0A] text-slate-500 pt-32">
        <p className="text-2xl mb-8 font-bold tracking-tighter">Project Not Found</p>
        <Link to="/projects" className="text-[#E2725B] hover:underline underline-offset-4 font-bold text-xs uppercase tracking-widest">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div ref={headerRef} className="bg-white dark:bg-[#0A0A0A] min-h-screen pb-32">
      {/* Hero Section */}
      <section className="relative pt-32 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto hero-content space-y-8 mb-24">
          <Link to="/projects" className="inline-block text-[#E2725B] font-bold uppercase tracking-widest text-[10px] hover:underline underline-offset-4">
            ← Case Studies
          </Link>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9] text-slate-900 dark:text-white max-w-4xl">
            {project.title}
          </h1>
          <p className="text-2xl md:text-3xl font-medium tracking-tight text-slate-500 dark:text-slate-400 max-w-3xl leading-tight">
            {project.description}
          </p>
        </div>

        <div className="max-w-7xl mx-auto project-image-box relative aspect-video rounded-[3rem] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = "https://via.placeholder.com/1200x600?text=Project+Preview"; }}
          />
        </div>
      </section>

      {/* Details Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 mt-32 grid grid-cols-1 lg:grid-cols-12 gap-24">
        <div className="lg:col-span-8 space-y-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Overview</h2>
          <div className="text-xl font-medium leading-relaxed tracking-tight text-slate-700 dark:text-slate-300 space-y-8">
            <p className="whitespace-pre-line">{project.content}</p>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-12 pt-12 lg:pt-0">
          <div className="space-y-10">
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Role</h4>
              <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{project.author}</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Year</h4>
              <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{project.date}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Stack</h4>
              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-[#E2725B]"
              >
                Launch Repository
                <span className="ml-4 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}