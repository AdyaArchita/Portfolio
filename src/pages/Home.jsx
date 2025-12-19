import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

export default function Home() {

  const Projects = [
    "NagarSaarthi (AQI Predictor)", 
    "Zairzest 4.0 Clone", 
    "HackwithZairza Bot",
    "SkyCast Weather App"
  ];
  
  const skills = ["JavaScript", "React", "C++", "Python", "Node.js", "MongoDB", "Framer Motion", "Tailwind CSS", "Git"];

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-24 pb-12 px-6 sm:px-12 flex flex-col items-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-12">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-8 w-full md:max-w-2xl items-center md:items-start text-center md:text-left"
        >
          <div>
            <p className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-300">
              Hi! I am
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 font-k2d">
              Adya Archita Pattnaik
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-k2d bg-gradient-to-r from-orange-800 via-orange-500 to-orange-600 bg-clip-text text-transparent leading-tight break-words w-full">
              Full-Stack Developer
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 py-3 rounded-lg text-white font-bold font-lato bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 hover:scale-105 transition-transform duration-300 shadow-lg shadow-orange-500/20"
            >
              Hire Me
            </button>

            <a 
              href="/resume.pdf" 
              download="Adya_Archita_Pattnaik_CV.pdf"
              className="px-6 py-3 rounded-lg font-bold font-lato border-2 flex items-center gap-2 text-gray-700 dark:text-gray-300 border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
            >
              <FaDownload className="text-sm" />
              Download CV
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 p-4 rounded-lg bg-black/5 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between sm:flex-col sm:pr-6 sm:border-r border-gray-400 w-full sm:w-auto">
              <p className="text-orange-500 text-xl sm:text-2xl font-extrabold font-k2d">
                10+
              </p>
              <p className="font-bold font-lato text-sm">Projects Done</p>
            </div>
            <div className="flex justify-between sm:flex-col w-full sm:w-auto">
              <p className="text-orange-500 text-xl sm:text-2xl font-extrabold font-k2d">
                7+
              </p>
              <p className="font-bold font-lato text-sm">Skills Acquired</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">

        <motion.div 
          whileHover={{ y: -5 }}
          className="p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-xl font-bold mb-4 text-orange-500 font-k2d uppercase tracking-wider">Recent Work</h3>
          <ul className="space-y-3">
            {Projects.map((p, i) => (
              <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                {p}
              </li>
            ))}
          </ul>
        </motion.div>

       <motion.div 
  whileHover={{ y: -5 }}
  className="p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
>
  <h3 className="text-xl font-bold mb-4 text-orange-500 font-k2d uppercase tracking-wider">Tech Stack</h3>
  <div className="flex flex-wrap gap-3">
    {skills.map((s, i) => (
      <motion.span
        key={i}
        whileHover={{ scale: 1.05 }}
        className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 border border-orange-400/50 cursor-default"
      >
        {s}
      </motion.span>
    ))}
  </div>
</motion.div>
      </div>
    </section>
  );
}