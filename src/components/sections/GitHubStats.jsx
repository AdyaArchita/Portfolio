import { useState, useEffect } from "react";
import { site } from "../../data/site";

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
      <div className="flex items-center gap-4">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
          GitHub Activity
        </h3>
        <a
          href={`https://github.com/${site.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-accent hover:underline underline-offset-4 tracking-widest"
        >
          @{site.github} →
        </a>
      </div>

      {status === "loading" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-6 rounded-2xl bg-surface border border-border animate-pulse h-24" />
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
          {statItems.map((item) => (
            <div
              key={item.label}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all duration-300 group"
            >
              <p className="text-3xl font-bold tracking-tighter text-text group-hover:text-accent transition-colors">
                {item.value}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-muted mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
