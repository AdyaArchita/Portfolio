import { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext();

/**
 * Theme provider:
 * 1. Reads system preference on first load
 * 2. Persists choice in localStorage
 * 3. Applies `dark` class to <html> only (body sync handled in App.jsx)
 */
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // 1. Check persisted preference
    const stored = localStorage.getItem("theme-preference");
    if (stored !== null) return stored === "dark";
    // 2. Fall back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Apply class to <html>
    document.documentElement.classList.toggle("dark", darkMode);
    // Persist
    localStorage.setItem("theme-preference", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Convenience hook
export const useTheme = () => useContext(ThemeContext);
