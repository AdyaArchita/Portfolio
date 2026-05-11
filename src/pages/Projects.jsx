import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const myProjects = [
  {
    id: 1,
    title: "CareerOps",
    description: "An enterprise-grade, strictly typed application engineered to orchestrate complex career lifecycles. Designed a custom React Kanban interface for seamless state management, backed by a robust Node.js ecosystem featuring custom middleware, rate-limiting, and a dedicated AI service layer for intelligent data extraction.",
    tags: ["TypeScript", "React", "Node.js", "AI Service Layer", "State Management"],
    image: "/images/nagarsaarthi.jpg", // Keeping existing images for now as placeholders
    slug: "career-ops",
    year: "2025"
  },
  {
    id: 2,
    title: "NagarSaarthi",
    description: "An advanced environmental intelligence dashboard predicting Air Quality Indices. Trained and deployed a predictive LSTM neural network, integrating it seamlessly into a high-performance React frontend to deliver real-time environmental monitoring and data analytics.",
    tags: ["Python", "LSTM Neural Networks", "React", "Data Visualization"],
    image: "/images/nagarsaarthi.jpg",
    slug: "nagarsaarthi",
    year: "2025"
  },
  {
    id: 3,
    title: "Zairza",
    description: "A high-performance, glassmorphic platform engineered for the university technical society. Focused on fluid UI/UX interactions, responsive component architecture, and a modern frontend ecosystem to handle high-traffic community events and technical fests.",
    tags: ["React", "Tailwind CSS", "Frontend Architecture", "UI Engineering"],
    image: "/images/zairzest.jpg",
    slug: "zairzest-clone",
    year: "2025"
  },
  {
    id: 4,
    title: "Automated Community Orchestration",
    description: "Core open-source contribution for a flagship month-long hackathon event. Architected automated community management tools and resource-finding algorithms leveraging the Telegram API to support asynchronous collaboration and seamless developer onboarding.",
    tags: ["Python", "Telegram API", "Open Source", "Workflow Automation"],
    image: "/images/hackwithzairza.jpg",
    slug: "hack-with-zairza",
    year: "2025"
  },
  {
    id: 5,
    title: "Soft-UI Neumorphic Engine",
    description: "A functional computational interface built on the modern Neumorphic design language. Focuses heavily on satisfying soft-UI micro-interactions, robust mathematical logic, and advanced CSS state architecture.",
    tags: ["React", "CSS Architecture", "UI/UX Logic", "State Handling"],
    image: "/images/calculator.jpg",
    slug: "calculator-app",
    year: "2025"
  }
];


export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".projects-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      // Batch Animation for Project Cards
      ScrollTrigger.batch(".project-card", {
        onEnter: (elements) => {
          gsap.fromTo(elements, 
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", overwrite: true }
          );
        },
        once: true
      });

      // Parallax effect for card images
      gsap.utils.toArray(".project-image").forEach((image) => {
        gsap.to(image, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: image.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white dark:bg-[#0A0A0A] min-h-screen py-32 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="projects-header mb-32">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-slate-900 dark:text-white">
            Recent Work
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-3xl text-xl font-medium leading-relaxed tracking-tight">
            A selection of projects that explore the intersection of design, technology, and user experience.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {myProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group flex flex-col bg-transparent"
            >
              <Link to={`/projects/${project.slug}`} className="block overflow-hidden rounded-3xl aspect-[4/3] bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-image w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-100"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/800x600?text=Project+Preview"; }}
                />
              </Link>

              <div className="pt-10 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tighter group-hover:text-[#E2725B] transition-colors duration-300">
                    {project.title}
                  </h2>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">
                    {project.year}
                  </span>
                </div>

                <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg font-medium leading-relaxed tracking-tight line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="group/link inline-flex items-center text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white transition-all"
                >
                  Explore Project
                  <span className="ml-4 transform group-hover/link:translate-x-2 transition-transform duration-500">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}