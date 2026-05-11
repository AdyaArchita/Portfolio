import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
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
  const containerRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [charsLeft, setCharsLeft] = useState(200);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });

  useEffect(() => setCharsLeft(200 - form.message.length), [form.message]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".contact-form", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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

  const socialLinks = [
    { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
    { icon: <FaXTwitter />, url: "https://x.com", label: "Twitter" },
    { icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
    { icon: <FaYoutube />, url: "https://youtube.com", label: "YouTube" },
    { icon: <FaGithub />, url: "https://github.com", label: "GitHub" },
  ];

  return (
    <section 
      ref={containerRef}
      className="min-h-screen bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-slate-50 pt-32 pb-32 px-6 sm:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">
        
        <div className="contact-header lg:w-1/2 space-y-12">
          <header className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
              Let's build <br/> something.
            </h1>
            <p className="text-2xl font-medium tracking-tight text-slate-500 dark:text-slate-400">
              Have a question or a project in mind? I'm always open to discussing new opportunities.
            </p>
          </header>

          <div className="space-y-4 pt-12 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Connect</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, i) => (
                <a 
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-lg hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all duration-300"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-form lg:w-1/2">
          <form 
            onSubmit={handleSubmit}
            className="space-y-8 bg-slate-50 dark:bg-slate-900/50 p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800"
          >
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Full Name</label>
              <input
                type="text"
                placeholder="What's your name?"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-4 px-1 focus:border-[#E2725B] outline-none transition-all dark:text-white"
              />
              {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Email Address</label>
              <input
                type="email"
                placeholder="Where can I reach you?"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-4 px-1 focus:border-[#E2725B] outline-none transition-all dark:text-white"
              />
              {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Message</label>
              <textarea
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-slate-200 dark:border-slate-800 py-4 px-1 focus:border-[#E2725B] outline-none transition-all dark:text-white resize-none"
              />
              <div className="flex justify-between mt-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">{charsLeft} characters remaining</p>
                {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full py-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all hover:pr-12 overflow-hidden"
            >
              <span>Send Message</span>
              <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
            </button>

            {submitted && (
              <p className="text-[#E2725B] text-center font-bold text-sm tracking-widest uppercase animate-pulse">
                Message Sent Successfully
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

