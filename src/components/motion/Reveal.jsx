import { motion } from "framer-motion";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

export default function Reveal({
  as = "div",
  children,
  className,
  delay = 0,
  stagger = 0,
  index = 0,
  layout = false,
  ...props
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const Component = motion[as] || motion.div;
  const motionDelay = delay + stagger * index;

  return (
    <Component
      data-reveal=""
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: "easeOut",
        delay: prefersReducedMotion ? 0 : motionDelay,
      }}
      layout={layout && !prefersReducedMotion}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
