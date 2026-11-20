import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Preloader() {
  // Show only once per session
  const alreadySeen = sessionStorage.getItem("preloader-seen");
  const [progress, setProgress] = useState(alreadySeen ? 100 : 0);
  const [statusIndex, setStatusIndex] = useState(0);
  const containerRef = useRef(null);

  const statuses = [
    "Initializing Core Modules",
    "Optimizing AI Service Layer",
    "Fetching Creative Assets",
    "Bundling System Logic",
    "Finalizing Interface",
    "Ready",
  ];

  useEffect(() => {
    // If reduced motion or already seen this session, skip immediately
    if (prefersReducedMotion || sessionStorage.getItem("preloader-seen")) {
      if (containerRef.current) containerRef.current.style.display = "none";
      sessionStorage.setItem("preloader-seen", "1");
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 10) + 2, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nextStatus = Math.min(
      Math.floor((progress / 100) * statuses.length),
      statuses.length - 1
    );
    setStatusIndex(nextStatus);

    if (progress === 100) {
      sessionStorage.setItem("preloader-seen", "1");
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        },
      });

      tl.to(".status-text", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power2.in",
      })
        .to(
          ".progress-number",
          { scale: 1.5, opacity: 0, duration: 0.8, ease: "power4.inOut" },
          "-=0.3"
        )
        .to(".preloader-panel", {
          height: 0,
          duration: 1,
          stagger: { each: 0.1, from: "center" },
          ease: "power4.inOut",
        });
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="preloader-container fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Shutter Panels — intentional inversion: dark overlay in light, white in dark */}
      <div className="preloader-panel absolute top-0 left-0 w-full h-1/2 bg-slate-900 dark:bg-white z-20" />
      <div className="preloader-panel absolute bottom-0 left-0 w-full h-1/2 bg-slate-900 dark:bg-white z-20" />

      {/* Accent Layers */}
      <div
        className="preloader-panel absolute top-0 left-0 w-full h-1/2 bg-accent z-10"
        style={{ transform: "translateY(-2px)" }}
      />
      <div
        className="preloader-panel absolute bottom-0 left-0 w-full h-1/2 bg-accent z-10"
        style={{ transform: "translateY(2px)" }}
      />

      <div className="relative z-30 flex flex-col items-center px-6">
        <div className="mb-2">
          <h2 className="progress-number text-white dark:text-slate-900 text-7xl sm:text-8xl md:text-9xl font-bold tracking-tighter tabular-nums">
            {progress}
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1px] bg-accent" />
            <p className="status-text text-white/40 dark:text-slate-500 text-xs uppercase tracking-[0.5em] font-bold min-w-[200px] text-center">
              {statuses[statusIndex]}
            </p>
            <span className="w-8 h-[1px] bg-accent" />
          </div>

          {/* Progress Bar */}
          <div className="w-48 h-[1px] bg-white/10 dark:bg-black/10 relative overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
