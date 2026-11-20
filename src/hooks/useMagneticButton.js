import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

/**
 * Applies a magnetic pull effect to ref'd elements.
 * Returns an `addRef` callback to attach to each button ref prop.
 *
 * Usage:
 *   const addToMagnetic = useMagneticButton();
 *   <button ref={addToMagnetic}>...</button>
 */
export function useMagneticButton() {
  const refs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const cleanups = refs.current.map((btn) => {
      if (!btn) return () => {};

      const moveBtn = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
      };

      const resetBtn = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      };

      btn.addEventListener("mousemove", moveBtn);
      btn.addEventListener("mouseleave", resetBtn);

      return () => {
        btn.removeEventListener("mousemove", moveBtn);
        btn.removeEventListener("mouseleave", resetBtn);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, [prefersReducedMotion]);

  const addRef = (el) => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };

  return addRef;
}
