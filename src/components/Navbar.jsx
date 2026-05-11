// src/components/Navbar.jsx
import { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAuthenticated = localStorage.getItem("token");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/Projects" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "py-4 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800" 
        : "py-8 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex justify-between items-center">

          {/* Brand / Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white"
          >
            ADYA ARCHITA.
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-12 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#E2725B] ${
                    isActive
                      ? "text-[#E2725B]"
                      : "text-slate-500 dark:text-slate-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-[#E2725B] ${
                    isActive
                      ? "text-[#E2725B]"
                      : "text-slate-500 dark:text-slate-400"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            <div className="flex items-center gap-6 pl-6 border-l border-slate-100 dark:border-slate-800">
              <button
                onClick={toggleTheme}
                className="text-lg hover:scale-110 transition-transform"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                  }}
                  className="px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"
                >
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/admin"
                  className="px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-80 transition-all"
                >
                  Admin
                </NavLink>
              )}
            </div>
          </div>

          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              className="text-lg"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 dark:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0A0A0A] border-b border-slate-100 dark:border-slate-800 transition-all duration-500 overflow-hidden ${
        isOpen ? "max-h-[400px] opacity-100 py-8" : "max-h-0 opacity-0 py-0"
      }`}>
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? "text-[#E2725B]"
                    : "text-slate-500 dark:text-slate-400"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? "text-[#E2725B]"
                      : "text-slate-500 dark:text-slate-400"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="text-xs font-bold uppercase tracking-[0.2em] text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold uppercase tracking-[0.2em] text-slate-900 dark:text-white"
            >
              Admin
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

