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
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        return () => {};
      }

      const moveBtn = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const clamp = (value) => Math.max(-8, Math.min(8, value * 0.16));
        gsap.to(btn, {
          x: clamp(x),
          y: clamp(y),
          duration: 0.25,
          ease: "power2.out",
          overwrite: true,
        });
      };

      const resetBtn = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.45,
          ease: "elastic.out(1, 0.3)",
          overwrite: true,
        });
      };

      btn.addEventListener("mousemove", moveBtn);
      btn.addEventListener("mouseleave", resetBtn);

      return () => {
        btn.removeEventListener("mousemove", moveBtn);
        btn.removeEventListener("mouseleave", resetBtn);
        gsap.killTweensOf(btn);
        gsap.set(btn, { clearProps: "transform" });
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
