import { Link } from "react-router-dom";
import { socialLinks } from "../../data/social";
import { site } from "../../data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-bg border-t border-border px-6 sm:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">

          {/* Brand + tagline */}
          <div className="space-y-4 max-w-xs">
            <Link to="/" className="text-xl font-bold tracking-tighter text-text">
              {site.brandName}
            </Link>
            <p className="text-sm text-muted font-medium leading-relaxed">
              {site.tagline} — Building interfaces that feel alive.
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-x-16 gap-y-4">
              {[
                { label: "Home",     path: "/" },
                { label: "About",    path: "/about" },
                { label: "View Projects", path: "/projects" },
                { label: "Contact",  path: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.path}
                    className="link-underline font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + Resume */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-colors duration-300"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>

            <a
              href={site.resumePath}
              download="Adya-Archita-Pattnaik-Resume.pdf"
              className="link-underline inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted tracking-widest">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted tracking-widest">
            Built with React + GSAP + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
