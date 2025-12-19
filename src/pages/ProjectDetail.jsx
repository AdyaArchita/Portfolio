import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const myProjects = [
  {
    title: "NagarSaarthi",
    description: "An advanced air quality monitoring dashboard for Delhi.",
    content: "NagarSaarthi was born out of the necessity to address the rising pollution levels in Delhi. The platform integrates OpenWeather and Central Pollution Control Board (CPCB) APIs to fetch live data. The core feature is a Long Short-Term Memory (LSTM) neural network model that analyzes historical trends to predict AQI for the next 48 hours. The UI is built with React and Highcharts for smooth data visualization.",
    tags: ["React", "ML", "Python", "MongoDB"],
    image: "/images/nagarsaarthi.jpg",
    slug: "nagarsaarthi",
    author: "Full Stack Developer & AI/ML Enthusiast",
    date: "2025",
    link: "https://github.com/AdyaArchita/NagarSaarthi"
  },
  {
    title: "HackwithZairza Repo",
    description: "Open Source hub for Hacktoberfest focusing on Telegram Bot development.",
    content: "During Hacktoberfest, I contributed to the HackwithZairza repository, focusing on enhancing the community's Telegram Bot. My contributions included implementing a 'Resource Finder' command and automating participant verification using Node-Telegram-Bot-API. I also optimized the project's CI/CD pipeline.",
    tags: ["Telegram API", "Python", "Open Source"],
    image: "/images/hackwithzairza.jpg",
    slug: "hack-with-zairza",
    author: "Contributor",
    date: "2025",
    link: "https://github.com/zairza/hackwithzairza"
  },
  {
    title: "Zairzest 4.0 Clone",
    description: "A pixel-perfect recreation of the Zairzest 4.0 technical fest website.",
    content: "This project was a deep dive into advanced CSS and Framer Motion. I recreated the complex glassmorphism effects and the interactive timeline used in the official Zairzest 4.0 site. The clone is fully responsive and optimized for mobile devices.",
    tags: ["React", "Tailwind", "Node.js", "MongoDB"],
    image: "/images/zairzest.jpg",
    slug: "zairzest-clone",
    author: "Frontend Developer",
    date: "2025",
    link: "https://github.com/AdyaArchita/Zairzest2"
  },
  {
    title: "SkyCast Weather",
    description: "A sleek, minimalist weather application.",
    content: "SkyCast uses the Geolocation API to detect user location automatically and provide hyper-local weather data. I implemented a dynamic UI system where the background color and icons change based on weather codes. The app uses Tailwind CSS for its clean, modern look.",
    tags: ["API Integration", "JavaScript", "CSS3"],
    image: "/images/weather.jpg",
    slug: "weather-app",
    author: "Full-Stack Developer",
    date: "2025",
    link: "https://github.com/AdyaArchita/WebDev/tree/main/Weather"
  },
  {
    title: "Neumorphic Calculator",
    description: "Functional calculator app with a modern Neumorphic design language.",
    content: "This project focused on the Neumorphism design trend, which uses soft shadows to create a 3D effect. Beyond aesthetics, I built a robust calculation engine that handles order of operations and edge cases like decimal overflow.",
    tags: ["UI/UX", "React", "Logic", "MongoDB"],
    image: "/images/calculator.jpg",
    slug: "calculator-app",
    author: "Full-Stack Developer",
    date: "2025",
    link: "https://github.com/AdyaArchita/Calculator"
  }
];

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = myProjects.find((p) => p.slug === slug);
    setProject(found);
  }, [slug]);

  if (!project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-500 font-k2d">
        <p className="text-2xl mb-4">Project Not Found</p>
        <Link to="/projects" className="text-orange-500 hover:text-orange-600 transition font-bold">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen pb-20 selection:bg-orange-200 dark:selection:bg-orange-900">
      <div className="relative h-[45vh] md:h-[55vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = "https://via.placeholder.com/1200x600?text=Project+Preview"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-gray-900/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/projects" className="inline-block text-orange-400 font-bold uppercase tracking-widest text-xs mb-4 hover:text-orange-300 transition-colors">
                ← Back to Projects
              </Link>
              <h1 className="text-4xl md:text-7xl font-extrabold text-gray-900 dark:text-white font-k2d leading-tight">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 font-k2d flex items-center">
              <span className="w-8 h-1 bg-orange-500 mr-4 rounded-full"></span>
              Project Overview
            </h2>
            <div className="prose prose-lg prose-orange dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 font-lato leading-relaxed">
              <p className="whitespace-pre-line">{project.content}</p>
            </div>
          </motion.div>

          <motion.aside 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-2">Role</h4>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">{project.author}</p>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-2">Completion Date</h4>
                  <p className="text-gray-900 dark:text-white font-semibold text-lg">{project.date}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.2em] mb-3">Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg text-xs font-bold border border-orange-100 dark:border-orange-800/50">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100 dark:border-gray-700" />

                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  View Source Code
                </a>
              </div>
            </div>
          </motion.aside>

        </div>
      </div>
    </div>
  );
}