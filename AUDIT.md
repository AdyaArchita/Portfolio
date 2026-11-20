# Portfolio Audit

> Re-generated after the portfolio refresh and accessibility work.

## Application

| Area | Current implementation |
|---|---|
| UI | React 18.3.1, Vite 7.1.3, Tailwind CSS 3.4.17 |
| Routing | React Router DOM 6.30.1; lazy-loaded page routes |
| Typography | Local Fraunces, Inter, and JetBrains Mono via `@fontsource` |
| Motion | Lenis 1.3.27, Framer Motion 12.23.12, GSAP 3.15.0 (magnetic CTA) |
| Data | Static site, social, skill, achievement, and project records under `src/data/` |
| External services | GitHub public API for profile stats; EmailJS when configured |

### Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Home | Hero, profile image, achievements, selected projects, skills |
| `/about` | About | Education, selected projects, achievements, GitHub stats, skills |
| `/projects` | Projects | Featured projects, category filters, additional projects |
| `/projects/:slug` | Project detail | Direct slug lookup with a not-found state |
| `/contact` | Contact | Validated contact form, email copy, social links |
| `/admin` | Admin login | Available only when `VITE_ENABLE_ADMIN=true` |
| `/dashboard` | Dashboard | Admin-enabled and token-gated |
| `*` | Not found | Fallback for unknown paths |

The project catalogue contains ten normalized records: six featured and four
additional projects. Missing live/demo URLs remain `null`; the UI does not
invent links. The six featured entries are KhataAgent, MetaHeck, IntelAI,
Distribut, JobTracker, and NagarSaarthi; together they cover agentic AI,
full-stack products, transactional backend work, and a civic-facing project.
All ten records have repository URLs. JobTracker and NagarSaarthi have live
URLs; no project has a separate demo URL.

## Theme and color audit

The shared tokens are defined as CSS variables in `src/styles.css` and exposed
through `theme.extend.colors` in `tailwind.config.js`.

| Token | Dark | Light |
|---|---|---|
| `bg` | `#141211` | `#FAF6F1` |
| `surface` | `#1D1A18` | `#F2ECE4` |
| `border` | `#2B2622` | `#E3D9CE` |
| `text` | `#EDE6DD` | `#1F1A17` |
| `muted` | `#9A918A` | `#6B6259` |
| `accent` | `#E0714A` | `#AE4724` |
| `accent-hover` | `#EC8A64` | `#943B1C` |
| `on-accent` | `#141211` | `#FAF6F1` |

The theme toggle persists the user's choice and otherwise follows the system
preference. The browser theme-color metadata supplies the requested light and
dark background colors.

Contrast ratios were calculated from the token values using the WCAG relative
luminance formula. The lowest tested normal-text pair is light-theme accent on
surface at **4.80:1**; dark-theme muted on surface is **5.60:1**. Body text,
muted text, accent links, and CTA text/background combinations tested are all
at least 4.5:1.

A source scan found no off-palette Tailwind color utilities or unmapped
hard-coded colors in application styling. The theme-color metadata and
standalone favicon use literal colors that exactly match the `bg` and `accent`
tokens; the metadata and standalone SVG cannot consume the app's CSS variables.
The obsolete `public/placeholder.svg` asset was removed.

## Images and metadata

| Asset | Details |
|---|---|
| `public/profile.webp` | 800 × 1000, 19,264 bytes; eager hero image |
| `public/profile.png` | PNG fallback for the hero image |
| `public/og-image.png` | 1200 × 630 social preview image |
| `public/Adya-Archita-Pattnaik-Resume.pdf` | Resume download |
| `public/favicon.svg` | Palette-matched “A” monogram |

The hero references `/profile.webp` with `/profile.png` as fallback, explicit
dimensions, descriptive alt text, and a graceful hide-and-warn error path.
Open Graph and Twitter metadata point to the existing social preview image.

## Accessibility and responsive behavior

- A keyboard-visible skip link targets the main content; navigation landmarks
  have labels and the mobile menu exposes expanded/hidden state.
- Keyboard focus indicators, semantic headings/sections, labeled form controls,
  and accessible contact-form error descriptions are present.
- The preloader and route-loading spinner are removed. Lenis, the marquee, and
  reveal/magnetic motion respect `prefers-reduced-motion`.
- The hero stacks its text and image below the `lg` breakpoint, keeps the image
  at a 4:5 ratio, and avoids horizontal overflow at 360, 768, and 1440 pixels.
- Fraunces, Inter, and JetBrains Mono load locally with `font-display: swap`.
- React Quill styles are lazy-loaded with the Dashboard route rather than the
  main application entry.

## Production bundle snapshot

Fresh `npm run build` output (Vite 7.1.3):

| Output | Raw | Gzip |
|---|---:|---:|
| Main JS entry | 322.69 kB | 105.55 kB |
| Main CSS | 29.08 kB | 6.35 kB |
| Dashboard JS (largest chunk) | 246.99 kB | 66.15 kB |
| Dashboard-only CSS | 22.05 kB | 3.51 kB |
| Admin Login JS | 2.26 kB | 0.94 kB |
| Home page JS | 79.11 kB | 30.55 kB |
| Projects page JS | 8.00 kB | 2.38 kB |

The editor and admin routes are lazy-loaded. The main entry is 16.19 kB gzip
larger than the previous snapshot (89.36 kB), remaining under the requested
approximately 40 kB added-JavaScript budget. Local fonts are emitted as
standalone WOFF/WOFF2 assets. The refreshed Browserslist database produces no
build warning.

## External configuration and operational notes

- `VITE_API_URL` overrides the API base URL; otherwise it defaults to
  `http://localhost:5000/api`.
- Contact uses EmailJS only when its service, template, and public-key
  variables are configured; otherwise it opens a prefilled `mailto:` message.
- `.env.example` documents the frontend settings and defaults
  `VITE_ENABLE_ADMIN=false`.
- On `/dashboard`, `setAuthToken` reads the stored token before the initial
  `GET /posts`; the shared Axios instance then sends that
  `Authorization: Bearer ...` header with dashboard `GET`, `POST`, `PUT`, and
  `DELETE` calls. Cookie credentials (`withCredentials`) are not configured.
- Admin routes are disabled unless `VITE_ENABLE_ADMIN=true`. The backend must
  validate the bearer token and authorize every protected endpoint; the UI
  route guard is not a security boundary.
- `npm run dev`, `npm run build`, and `npm run preview` are available. No test
  or lint script is defined in `package.json`.

## Unverified content

Unverified draft entries have been removed from rendered pages and preserved
in [`docs/TODO-unverified.md`](docs/TODO-unverified.md). The published
NagarSaarthi description remains focused on waste reporting and related civic
features. Achievement claims currently shown on Home were confirmed by the
owner during the previous refresh.
