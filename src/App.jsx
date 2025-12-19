import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail"; 
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";

import AOS from "aos";
import "aos/dist/aos.css";

function AppContent() {
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.style.backgroundColor = "#111827"; 
    } else {
      document.body.classList.remove("dark");
      document.body.style.backgroundColor = "#f9fafb"; 
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/Projects" element={<Projects />} />
        <Route path="/Projects/:slug" element={<ProjectDetail />} />
        
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true, 
    });
  }, []);

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}