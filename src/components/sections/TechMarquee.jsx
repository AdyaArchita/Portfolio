import { skillCategories } from "../../data/skills";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

export default function TechMarquee() {
  const prefersReducedMotion = usePrefersReducedMotion();
  if (prefersReducedMotion) return null;

  const skills = skillCategories.flatMap((category) => category.skills);

  return (
    <div className="tech-marquee my-16" aria-hidden="true">
      <div className="tech-marquee-track">
        {[...skills, ...skills].map((skill, index) => (
          <span className="tech-marquee-item" key={`${skill}-${index}`}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
