// src/components/Navbar.jsx
import { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const isAuthenticated = localStorage.getItem("token");

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/Projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Brand / Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-orange-600 dark:text-orange-400"
          >
            Adya A. Pattnaik
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `hover:text-orange-500 ${
                    isActive
                      ? "text-orange-600 font-semibold"
                      : "text-gray-800 dark:text-gray-200"
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
                  className={({ isActive }) =>
                    `hover:text-orange-500 ${
                      isActive
                        ? "text-orange-600 font-semibold"
                        : "text-gray-800 dark:text-gray-200"
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
                  className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/admin"
                className="bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-500"
              >
                Admin
              </NavLink>
            )}

            {/* Theme Toggle (Desktop) */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1 rounded-md border dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </div>

          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle (Mobile, always visible) */}
            <button
              onClick={toggleTheme}
              className="px-2 py-1 rounded-md border dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-gray-200"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-3 shadow-lg overflow-hidden"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block hover:text-orange-500 ${
                    isActive
                      ? "text-orange-600 font-semibold"
                      : "text-gray-800 dark:text-gray-200"
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
                    `block hover:text-orange-500 ${
                      isActive
                        ? "text-orange-600 font-semibold"
                        : "text-gray-800 dark:text-gray-200"
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
                  className="block w-full text-left bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block bg-orange-600 text-white px-3 py-1 rounded-md hover:bg-orange-500"
              >
                Admin
              </NavLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
