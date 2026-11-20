import { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { Menu, X } from "lucide-react";

const ADMIN_ENABLED = import.meta.env.VITE_ENABLE_ADMIN === "true";

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isAuthenticated = localStorage.getItem("token");

  // About is now included + all routes are lowercase
  const navLinks = [
    { name: "Home",     path: "/" },
    { name: "About",    path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Contact",  path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
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
                className={({ isActive }) =>
                  `text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-accent ${
                    isActive ? "text-accent" : "text-muted"
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
                  `text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-accent ${
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
                className="text-lg hover:scale-110 transition-transform"
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
              className="text-lg"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="text-text"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-bg border-b border-border transition-all duration-500 overflow-hidden ${
          isOpen ? "max-h-[400px] opacity-100 py-8" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive ? "text-accent" : "text-muted"
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
                  `text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
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
  );
}
