import { useContext, useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const ADMIN_ENABLED = import.meta.env.VITE_ENABLE_ADMIN === "true";

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { pathname } = useLocation();
  const activeRoute = pathname.startsWith("/projects/") ? "/projects" : pathname;
  const [activeSection, setActiveSection] = useState(activeRoute);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const isAuthenticated = localStorage.getItem("token");

  // About is now included + all routes are lowercase
  const navLinks = [
    { name: "Home",     path: "/" },
    { name: "About",    path: "/about" },
    { name: "View Projects", path: "/projects" },
    { name: "Contact",  path: "/contact" },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(Math.round(latest * 100));
  });

  useEffect(() => {
    setScrolled(window.scrollY > 20);
    setActiveSection(activeRoute);

    const section = document.querySelector("[data-nav-section]");
    if (!section || !("IntersectionObserver" in window)) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(section.dataset.navSection || activeRoute);
        }
      },
      { rootMargin: "-10% 0px -80% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [activeRoute]);

  return (
    <>
      <motion.div
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(scrollProgress)}
        className="fixed left-0 top-0 z-[60] h-0.5 bg-accent"
        style={
          prefersReducedMotion
            ? { width: `${scrollProgress}%` }
            : { scaleX: smoothProgress, transformOrigin: "0% 50%" }
        }
      />
      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-4 bg-bg border-b border-border"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="flex justify-between items-center">

            {/* Brand */}
            <Link to="/" className="text-xl font-bold tracking-tighter text-text">
              ADYA ARCHITA.
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-12 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                className={() =>
                  `link-underline font-mono text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-accent ${
                    activeSection === link.path ? "text-accent" : "text-muted"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {ADMIN_ENABLED && isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `link-underline font-mono text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 hover:text-accent ${
                    isActive ? "text-accent" : "text-muted"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            <div className="flex items-center gap-6 pl-6 border-l border-border">
              <button
                onClick={toggleTheme}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                className="text-lg transition-transform motion-safe:hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>

              {ADMIN_ENABLED && (
                isAuthenticated ? (
                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/";
                    }}
                    className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-surface text-accent border border-border hover:bg-accent hover:text-on-accent hover:border-accent transition-all"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/admin"
                    className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest bg-surface text-text border border-border hover:border-accent transition-all"
                  >
                    Admin
                  </NavLink>
                )
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-6">
            <button
              onClick={toggleTheme}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          id="mobile-navigation"
          aria-hidden={!isOpen}
          className={`md:hidden absolute top-full left-0 w-full bg-bg border-b border-border transition-all duration-500 overflow-hidden ${
            isOpen ? "visible max-h-[400px] opacity-100 py-8" : "invisible max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setIsOpen(false)}
              className={() =>
                `link-underline font-mono text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                activeSection === link.path ? "text-accent" : "text-muted"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {ADMIN_ENABLED && (isAuthenticated ? (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `link-underline font-mono text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                    isActive ? "text-accent" : "text-muted"
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
                className="text-xs font-bold uppercase tracking-[0.2em] text-accent"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="text-xs font-bold uppercase tracking-[0.2em] text-text"
            >
              Admin
            </NavLink>
          ))}
        </div>
        </div>
      </nav>
    </>
  );
}
