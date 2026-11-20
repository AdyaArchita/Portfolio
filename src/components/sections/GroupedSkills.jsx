import { groupedSkills } from "../../data/skills";

/**
 * Displays skills grouped by category (Frontend / Backend / AI-ML / Tools)
 * in a grid with hover states.
 */
export default function GroupedSkills() {
  return (
    <div className="space-y-8">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
        Proficiency
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {groupedSkills.map((category) => (
          <div key={category.group} className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-accent">
              {category.group}
            </h4>
            <ul className="space-y-3">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="group flex items-center gap-3 text-sm font-medium text-muted hover:text-primary transition-colors cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-accent transition-colors flex-shrink-0" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
