import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Ensure Tailwind "dark:" classes work
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="sr-only"
        />
        <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 flex items-center">
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${
              darkMode ? "translate-x-6" : ""
            }`}
          />
        </div>
        <span className="text-sm text-black dark:text-white">
          {darkMode ? "Dark" : "Light"}
        </span>
      </label>
    </div>
  );
}
