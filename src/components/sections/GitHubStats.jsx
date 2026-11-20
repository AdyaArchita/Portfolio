import { useState, useEffect } from "react";
import { site } from "../../data/site";
import Reveal from "../motion/Reveal";

/**
 * Fetches public GitHub stats for the username in src/data/site.js.
 * Displays: public repos, followers, stars, top language.
 * Shows loading skeleton and graceful error state.
 */
export default function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${site.github}`),
          fetch(`https://api.github.com/users/${site.github}/repos?per_page=100`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const user = await userRes.json();
        const repos = await reposRes.json();

        // Calculate total stars and find most-used language
        const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
        const langMap = {};
        repos.forEach((r) => {
          if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
        });
        const topLang = Object.entries(langMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

        if (!cancelled) {
          setStats({
            repos: user.public_repos,
            followers: user.followers,
            stars: totalStars,
            topLang,
          });
          setStatus("ready");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  const statItems = stats
    ? [
        { label: "Public Repos",   value: stats.repos },
        { label: "Followers",      value: stats.followers },
        { label: "Total Stars",    value: stats.stars },
        { label: "Top Language",   value: stats.topLang },
      ]
    : [];

  return (
    <div className="space-y-8">
      <Reveal as="div" className="flex items-center gap-4">
        <h3 className="section-kicker">06 / GITHUB ACTIVITY</h3>
        <a
          href={`https://github.com/${site.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-mono text-xs font-medium text-accent tracking-widest"
        >
          @{site.github} →
        </a>
      </Reveal>

      {status === "loading" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-6 rounded-2xl bg-surface border border-border h-24" />
          ))}
        </div>
      )}

      {status === "error" && (
        <p className="text-muted text-sm font-medium">
          Could not load GitHub stats. Check your connection or try again later.
        </p>
      )}

      {status === "ready" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((item, index) => (
            <Reveal
              as="div"
              key={item.label}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-colors duration-300 group"
              stagger={0.08}
              index={index}
            >
              <p className="font-display text-3xl font-bold tracking-tighter text-text group-hover:text-accent transition-colors">
                {item.value}
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-muted mt-2">
                {item.label}
              </p>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
