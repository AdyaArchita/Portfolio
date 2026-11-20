import { groupedSkills } from "../../data/skills";
import Reveal from "../motion/Reveal";

/**
 * Displays skills grouped by category (Frontend / Backend / AI-ML / Tools)
 * in a grid with hover states.
 */
export default function GroupedSkills() {
  return (
    <div className="space-y-8">
      <p className="section-kicker">05 / SKILLS</p>
      <Reveal as="h2" className="font-display text-2xl font-semibold text-text">
        Technical Skills
      </Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {groupedSkills.map((category, index) => (
          <Reveal
            as="div"
            key={category.group}
            className="space-y-4"
            stagger={0.08}
            index={index}
          >
            <h4 className="font-mono text-xs font-medium uppercase tracking-widest text-accent">
              {category.group}
            </h4>
            <ul className="space-y-3">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="group flex items-center gap-3 font-mono text-xs text-muted hover:text-text transition-colors cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent transition-colors flex-shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
