import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa6";
import { api } from "../services/api";

export default function Contact() {
  const { darkMode } = useContext(ThemeContext);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [charsLeft, setCharsLeft] = useState(200);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  useEffect(() => setCharsLeft(200 - form.message.length), [form.message]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ name: "", email: "", message: "" });

    let valid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }
    if (form.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
      valid = false;
    } else if (form.message.length > 200) {
      newErrors.message = "Message must not exceed 200 characters.";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      await api.post("/contact", form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setErrors((prev) => ({ ...prev, message: "Failed to send message" }));
    }
  };

  return (
    <section
      id="contact"
      className={`min-h-screen bg-cover bg-center p-6 sm:p-12 flex items-center justify-center transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
      style={{ backgroundImage: "url('/assets/images/contact-bg.jpg')" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl backdrop-blur-md 
                   bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200"
      >
        <h2 className="text-4xl font-bold mb-6 border-b-4 inline-block border-orange-500 pb-2 text-center text-orange-500">
          Contact Me
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 rounded-lg border transition-colors duration-300
                         bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-600
                         dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 rounded-lg border transition-colors duration-300
                         bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-600
                         dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={200}
              placeholder="Your Message (min 10 characters)"
              className="w-full p-3 rounded-lg border transition-colors duration-300
                         bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-600
                         dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
            />
            <p className="text-sm">{charsLeft} characters left</p>
            {errors.message && (
              <p className="text-red-400 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 transition px-6 py-3 rounded-lg text-white font-semibold"
          >
            Send
          </button>

          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 text-lg font-semibold mt-2 text-center"
            >
              ✅ Message submitted successfully!
            </motion.p>
          )}
        </form>

        {/* Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold mb-4 text-center">Let’s Connect</h3>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <FaFacebookF />, url: "https://facebook.com/yourusername", label: "Facebook", bg: "hover:bg-blue-600" },
              { icon: <FaXTwitter />, url: "https://x.com/yourusername", label: "Twitter / X", bg: "hover:bg-black" },
              { icon: <FaLinkedinIn />, url: "https://linkedin.com/in/yourusername", label: "LinkedIn", bg: "hover:bg-blue-700" },
              { icon: <FaInstagram />, url: "https://instagram.com/yourusername", label: "Instagram", bg: "hover:bg-[#E1306C]" },
              { icon: <FaYoutube />, url: "https://youtube.com/yourchannel", label: "YouTube", bg: "hover:bg-red-600" },
              { icon: <FaGithub />, url: "https://github.com/yourusername", label: "GitHub", bg: "hover:bg-gray-800" },
            ].map(({ icon, url, label, bg }) => (
              <motion.a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 rounded-full bg-gray-800 text-white 
                           dark:bg-gray-700 dark:text-gray-200 ${bg} 
                           hover:text-white transition duration-300`}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
