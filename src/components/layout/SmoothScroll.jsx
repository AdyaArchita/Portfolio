import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

let activeLenis = null;

export function scrollToTop() {
  if (activeLenis) {
    activeLenis.scrollTo(0);
    return;
  }

  window.scrollTo({ top: 0, behavior: "instant" });
}

export default function SmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (time) => 1 - Math.pow(1 - time, 4),
      smoothWheel: true,
      anchors: true,
    });

    activeLenis = lenis;

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = null;
    };
  }, [prefersReducedMotion]);

  return null;
}
