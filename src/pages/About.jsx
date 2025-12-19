import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";

export default function About() {
  const { darkMode } = useContext(ThemeContext);

  const skills = [
    "React",
    "Tailwind CSS",
    "Python",
    "Java",
    "JavaScript",
    "Node.js",
    "Express",
    "MongoDB",
    "HTML",
    "SQL",
  ];

  const Projects = ["Calculator App (MERN)", "Chat App (Socket.IO)", "Portfolio Website", "Weather App", "To-do List"];

  return (
    <section
      className={`py-20 px-6 min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-black text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <motion.div
        className={`max-w-6xl mx-auto md:flex md:items-center md:gap-12 shadow-xl rounded-2xl p-8 md:p-12 transition-colors duration-500 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >

        <motion.div
          className="mb-8 md:mb-0 flex justify-center md:justify-start"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src="images/profile.png"
            alt="Profile"
            className="w-40 h-40 md:w-64 md:h-64 object-cover rounded-full shadow-2xl border-4 border-indigo-500"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>

        <motion.div
          className="text-center md:text-left flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6 border-b-4 inline-block border-orange-500 pb-2">
            About Me
          </h2>

          <p
            className={`text-lg leading-relaxed mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            A software engineer, the modern-day architect of digital realms,
            navigates the ethereal landscapes of code, sculpting intangible
            structures that shape our technological world.
          </p>
          <p
            className={`text-lg leading-relaxed mb-4 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            As a full stack developer, I’m skilled in both frontend and backend
            technologies, including React, Tailwind CSS, Node.js, Express, and
            MongoDB. My experience allows me to bridge design and development,
            delivering seamless web applications from concept to deployment with
            clean architecture and efficient code.
          </p>
          <p
            className={`text-lg leading-relaxed mb-6 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            With a basic understanding of UI/UX principles and a passion for
            building clean, efficient interfaces, I bring creative vision and
            technical expertise to every project I touch. I strive to create
            intuitive and meaningful user experiences that balance aesthetics
            and functionality.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4 mb-6">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm cursor-pointer transition-colors duration-300 ${
                  darkMode
                    ? "bg-indigo-800 text-indigo-100"
                    : "bg-indigo-100 text-indigo-800"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div
              className={`p-6 rounded-xl shadow-md transition-colors ${
                darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-900"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">Education</h3>
              <p>B.Tech in Computer Science</p>
            </div>
            <div
              className={`p-6 rounded-xl shadow-md transition-colors ${
                darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-900"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">Achievements</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Built multiple Projects with React & Tailwind CSS</li>
                <li>Partcipated in various hackathons</li>
                <li>Contributed to open-source Projects</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <div
              className={`p-6 rounded-xl shadow-md transition-colors ${
                darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-900"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">Projects</h3>
              <ul className="grid gap-3">
                {Projects.map((p, i) => (
                  <motion.li
                    key={i}
                    className={`p-3 rounded-lg shadow-sm transition cursor-pointer ${
                      darkMode
                        ? "bg-indigo-900 text-indigo-100"
                        : "bg-indigo-50 text-indigo-800"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    {p}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
