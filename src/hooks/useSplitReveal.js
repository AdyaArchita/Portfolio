import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates elements with a split-line text reveal (y:100 → 0, opacity 0 → 1)
 * triggered by ScrollTrigger when each line enters the viewport.
 *
 * Elements must have the class `.split-line` and be inside containerRef.
 *
 * @param {React.RefObject} containerRef
 */
export function useSplitReveal(containerRef) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".split-line");
      lines.forEach((line) => {
        gsap.from(line, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: line, start: "top 90%" },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
}
