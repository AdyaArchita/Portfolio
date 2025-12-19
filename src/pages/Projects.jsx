import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const myProjects = [
  {
    id: 1,
    title: "NagarSaarthi",
    description: "An advanced air quality monitoring dashboard for Delhi. It provides real-time pollution metrics and utilizes ML to predict air quality trends for the coming days.",
    tags: ["React", "Tailwind CSS", "ML", "Python", "MongoDB"],
    image: "/images/nagarsaarthi.jpg", 
    slug: "nagarsaarthi",
    year: "2025"
  },
  {
    id: 2,
    title: "HackwithZairza Repo",
    description: "An Open Source contribution hub for Hacktoberfest. Specialized in Telegram Bot development, automated tools, and community management.",
    tags: ["Telegram API", "Node.js", "Open Source"],
    image: "/images/hackwithzairza.jpg",
    slug: "hack-with-zairza",
    year: "2025"
  },
  {
    id: 3,
    title: "Zairzest 4.0 Clone",
    description: "A pixel-perfect recreation of the Zairzest 4.0 technical fest website. Focused on high-performance animations and glassmorphism UI.",
    tags: ["React", "Tailwind CSS", "Node.js","MongoDB" ],
    image: "/images/zairzest.jpg",
    slug: "zairzest-clone",
    year: "2025"
  },
  {
    id: 4,
    title: "SkyCast Weather",
    description: "A sleek weather application fetching data from OpenWeatherMap. Features dynamic backgrounds that change based on the weather conditions.",
    tags: ["API Integration", "JavaScript", "CSS3"],
    image: "/images/weather.jpg",
    slug: "weather-app",
    year: "2025"
  },
  {
    id: 5,
    title: "Neumorphic Calculator",
    description: "A functional calculator featuring a modern Neumorphic design language. Supports complex operations with a satisfying soft-UI feel.",
    tags: ["UI/UX", "React", "Logic", "MongoDB"],
    image: "/images/calculator.jpg",
    slug: "calculator-app",
    year: "2025"
  }
];

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold font-k2d mb-4"
          >
            <span className="bg-gradient-to-r from-orange-800 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg font-lato">
            Explore my latest works, ranging from environmental AI dashboards to interactive frontend clones.
          </p>
        </header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {myProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
            >

              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/400x250?text=Project+Preview"; }}
                />

                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-[10px] font-bold text-orange-600 dark:text-orange-400 shadow-sm">
                  {project.year}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors mb-3 font-k2d">
                  {project.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-auto mb-8">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border border-orange-100/50 dark:border-orange-800/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center text-sm font-bold text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 transition-all group/link"
                >
                  VIEW FULL CASE STUDY
                  <span className="ml-2 transform group-hover/link:translate-x-2 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}