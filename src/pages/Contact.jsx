import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";
import { socialLinks } from "../data/social";
import { site } from "../data/site";

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || "";
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY   || "";
const USE_EMAILJS      = Boolean(EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_KEY);

export default function Contact() {
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [charsLeft, setCharsLeft] = useState(200);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [copyStatus, setCopyStatus] = useState("idle");

  useEffect(() => setCharsLeft(200 - form.message.length), [form.message]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
      gsap.from(".contact-form", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopyStatus("copied");
    } catch (error) {
      console.error("Could not copy contact email.", error);
      setCopyStatus("error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ name: "", email: "", message: "" });

    // Client-side validation
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

    setStatus("sending");

    try {
      if (USE_EMAILJS) {
        // EmailJS path — reads keys from .env (no backend needed)
        await emailjs.sendForm(
          EMAILJS_SERVICE,
          EMAILJS_TEMPLATE,
          formRef.current,
          EMAILJS_KEY
        );
      } else {
        // Graceful degradation: open mailto link so the message is never lost
        const mailtoLink = `mailto:${site.email}?subject=Portfolio%20Contact%20from%20${encodeURIComponent(
          form.name
        )}&body=${encodeURIComponent(form.message)}%0A%0AFrom%3A%20${encodeURIComponent(form.email)}`;
        window.open(mailtoLink, "_blank");
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-bg text-text pt-32 pb-32 px-6 sm:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24">

        {/* Left: Info + Socials */}
        <div className="contact-header lg:w-1/2 space-y-12">
          <header className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight">
              Let&apos;s build <br /> something.
            </h1>
            <p className="text-2xl font-medium tracking-tight text-muted">
              Have a question or a project in mind? I&apos;m always open to
              discussing new opportunities.
            </p>
          </header>

          <div className="space-y-4 pt-12 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Email
            </h3>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${site.email}`}
                className="text-lg font-semibold text-text hover:text-accent transition-colors"
              >
                {site.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-widest text-text hover:border-accent transition-colors"
              >
                Copy email
              </button>
              {copyStatus === "copied" && (
                <span role="status" className="text-xs text-muted">Email copied.</span>
              )}
              {copyStatus === "error" && (
                <span role="alert" className="text-xs text-muted">
                  Could not copy. Select the email address to copy it.
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-12 border-t border-border">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              Connect
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-lg hover:bg-accent hover:text-on-accent hover:border-accent transition-all duration-300"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="contact-form lg:w-1/2">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8 bg-surface p-12 rounded-[2.5rem] border border-border"
          >
            {/* EmailJS expects input names to match template variables */}
            <div className="space-y-2">
              <label
                htmlFor="contact-name"
                className="text-xs font-bold uppercase tracking-widest text-muted px-1"
              >
                Full Name
              </label>
              <input
                id="contact-name"
                name="user_name"
                type="text"
                placeholder="What's your name?"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b border-border py-4 px-1 focus:border-accent focus:outline-none transition-all"
              />
              {errors.name && (
                <p role="alert" className="text-accent text-xs mt-2">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-email"
                className="text-xs font-bold uppercase tracking-widest text-muted px-1"
              >
                Email Address
              </label>
              <input
                id="contact-email"
                name="user_email"
                type="email"
                placeholder="Where can I reach you?"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b border-border py-4 px-1 focus:border-accent focus:outline-none transition-all"
              />
              {errors.email && (
                <p role="alert" className="text-accent text-xs mt-2">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-xs font-bold uppercase tracking-widest text-muted px-1"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-border py-4 px-1 focus:border-accent focus:outline-none transition-all resize-none"
              />
              <div className="flex justify-between mt-2">
                <p className="text-xs text-muted uppercase tracking-widest">
                  {charsLeft} characters remaining
                </p>
                {errors.message && (
                  <p role="alert" className="text-accent text-xs">{errors.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group relative w-full py-6 bg-accent text-on-accent rounded-full font-bold uppercase tracking-[0.2em] text-xs transition-all hover:bg-accent-hover hover:pr-12 overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>
                {status === "sending" ? "Sending…" : "Send Message"}
              </span>
              {status !== "sending" && (
                <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  →
                </span>
              )}
            </button>

            {/* Status feedback */}
            {status === "success" && (
              <p role="status" className="text-accent text-center font-bold text-sm tracking-widest uppercase animate-pulse">
                {USE_EMAILJS ? "Message Sent Successfully ✓" : "Opening your email client…"}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-accent text-center font-bold text-sm tracking-widest uppercase">
                Something went wrong. Please try again.
              </p>
            )}
            {!USE_EMAILJS && status === "idle" && (
              <p className="text-muted text-center text-xs tracking-widest">
                Email service not configured — form will open your mail app.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
