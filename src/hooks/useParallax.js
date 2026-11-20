import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * Applies a mouse-parallax effect to `.parallax-bg` and `.parallax-img`
 * elements within the page. Call inside a useEffect or at component level.
 *
 * @returns {() => void} cleanup function (removes the mousemove listener)
 */
export function useParallax() {
  useEffect(() => {
    const handleParallax = (e) => {
      const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
      const yPos = (e.clientY / window.innerHeight - 0.5) * 40;

      gsap.to(".parallax-bg", { x: xPos * 0.5, y: yPos * 0.5, duration: 0.6 });
      gsap.to(".parallax-img", { x: -xPos * 0.3, y: -yPos * 0.3, duration: 0.6 });
    };

    window.addEventListener("mousemove", handleParallax);
    return () => window.removeEventListener("mousemove", handleParallax);
  }, []);
}
