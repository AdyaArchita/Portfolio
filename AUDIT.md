# Portfolio Audit

> Re-generated after the portfolio refresh and accessibility work.

## Application

| Area | Current implementation |
|---|---|
| UI | React 18.3.1, Vite 7.1.3, Tailwind CSS 3.4.17 |
| Routing | React Router DOM 6.30.1; lazy-loaded page routes |
| Motion | GSAP 3.15.0 / ScrollTrigger and Framer Motion 12.23.12 |
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
| `text` | `#EDE6DF` | `#1F1A17` |
| `muted` | `#A39A90` | `#6B6259` |
| `accent` | `#E0714A` | `#AE4724` |
| `accent-hover` | `#EC8A64` | `#943B1C` |
| `on-accent` | `#141211` | `#FAF6F1` |

The theme toggle persists the user's choice and otherwise follows the system
preference. The browser theme-color metadata supplies the requested light and
dark background colors.

Contrast ratios were calculated from the token values using the WCAG relative
luminance formula. The lowest tested normal-text pair is light-theme accent on
surface at **4.80:1**; dark-theme muted on surface is **6.25:1**. Body text,
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
- The preloader is hidden from assistive technology and exits when complete;
  animation code and CSS respect `prefers-reduced-motion`.
- The hero stacks its text and image below the `lg` breakpoint, keeps the image
  at a 4:5 ratio, and avoids horizontal overflow at 375, 768, and 1440 pixels.
- React Quill styles are lazy-loaded with the Dashboard route rather than the
  main application entry.

## Production bundle snapshot

Fresh `npm run build` output (Vite 7.1.3):

| Output | Raw | Gzip |
|---|---:|---:|
| Main JS entry | 256.70 kB | 89.36 kB |
| Main CSS | 24.90 kB | 5.36 kB |
| Dashboard JS (largest chunk) | 246.99 kB | 66.15 kB |
| Dashboard-only CSS | 22.05 kB | 3.51 kB |
| Admin Login JS | 114.03 kB | 37.59 kB |
| Projects page JS | 33.10 kB | 12.07 kB |
| ScrollTrigger JS | 43.96 kB | 18.26 kB |

The editor and admin routes are lazy-loaded. The project curation/filter work
uses the existing animation dependencies and adds no new package. The build
reports that the local Browserslist database is 15 months old.

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
