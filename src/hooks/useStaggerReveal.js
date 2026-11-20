import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals children staggered from y:offset → y:0, opacity 0 → 1.
 *
 * @param {React.RefObject} containerRef - Scoping ref for gsap.context()
 * @param {string} selector - CSS selector for the elements to animate
 * @param {object} opts - Optional overrides
 */
export function useStaggerReveal(containerRef, selector, opts = {}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        y: opts.y ?? 40,
        opacity: 0,
        duration: opts.duration ?? 1,
        stagger: opts.stagger ?? 0.2,
        ease: opts.ease ?? "power3.out",
        scrollTrigger: opts.scrollTrigger
          ? {
              trigger: opts.scrollTrigger,
              start: "top 90%",
              toggleActions: "play none none none",
            }
          : undefined,
        delay: opts.delay ?? 0,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
}
