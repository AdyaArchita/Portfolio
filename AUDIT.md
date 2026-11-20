# Portfolio Design & Feature Audit
> **Generated:** 2026-09-30 | **Status:** Read-only — no files were modified.

---

## STEP 1 — Project Overview & Tech Stack

### Stack
| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | **React** | 18.3.1 |
| Build Tool | **Vite** | 7.1.3 |
| Routing | **React Router DOM** | 6.30.1 |
| Styling | **Tailwind CSS** (class-based dark mode) | 3.4.17 |
| Animation | **GSAP** + ScrollTrigger | 3.15.0 |
| Animation (secondary) | **Framer Motion** | 12.23.12 |
| Scroll Anim Library | **AOS** (installed, unused) | 2.3.4 |
| HTTP Client | **Axios** | 1.11.0 |
| Rich Text Editor | **React Quill** | 2.0.0 |
| Icons | **React Icons** (fa6), **Lucide React** | 5.5.0 / 0.541.0 |
| Font | **Inter** (Google Fonts, all weights 100-900) | — |

### Folder Structure
```
Portfolio/
├── index.html                  ← Entry HTML (minimal, no OG tags)
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── public/
│   ├── images/
│   │   └── profile.png         ← Only 1 image (97 KB PNG)
│   └── resume.pdf              ← CV file (~57 KB)
└── src/
    ├── main.jsx                ← React entry, BrowserRouter
    ├── App.jsx                 ← Routes + ThemeProvider wrapper
    ├── styles.css              ← Global CSS + Google Fonts import
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Preloader.jsx
    │   ├── ThemeToggle.jsx     ← Defined but NOT used in App.jsx
    │   └── PostCard.jsx        ← Defined but NOT rendered anywhere
    ├── context/
    │   └── ThemeContext.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Projects.jsx
    │   ├── ProjectDetail.jsx
    │   ├── Contact.jsx
    │   ├── AdminLogin.jsx
    │   └── Dashboard.jsx
    └── services/
        └── api.js              ← Axios instance, baseURL env-driven
```

### Routes
| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Home.jsx` | Hero + Bento Grid |
| `/Projects` | `Projects.jsx` | Capital "P" — inconsistent casing |
| `/Projects/:slug` | `ProjectDetail.jsx` | — |
| `/about` | `About.jsx` | lowercase — inconsistent |
| `/contact` | `Contact.jsx` | lowercase |
| `/admin` | `AdminLogin.jsx` | Public admin portal |
| `/dashboard` | `Dashboard.jsx` | JWT-gated via localStorage |

---

## STEP 2 — Color Palette Audit

> No `:root` CSS variables are defined. All colors are hardcoded in Tailwind arbitrary values. No theme token exists.

### Color Palette Table

| Name | HEX | Role | File : Line |
|------|-----|------|-------------|
| Terracotta / Accent | `#E2725B` | Primary accent, CTA, active nav, hover | Home.jsx:154,190,197; About.jsx:91,108,112,116; Projects.jsx:129; ProjectDetail.jsx:101,113,171; Contact.jsx:141,153,165,182; Navbar.jsx:55,68,141; Preloader.jsx:85,86,98,102,108; Dashboard.jsx:80,150 |
| Near-Black (dark bg) | `#0A0A0A` | Dark mode page background | styles.css:22; Home.jsx:143; About.jsx:51; Projects.jsx:101; ProjectDetail.jsx:99,109; Contact.jsx:97; Dashboard.jsx:58 |
| White | `#FFFFFF` | Light mode page background | styles.css:16; all pages |
| Slate-900 text | `#0f172a` | Light mode body text | styles.css:17 |
| Slate-50 text | `#f8fafc` | Dark mode body text | styles.css:23 |
| Gray-100 (admin bg) | `#f3f4f6` | AdminLogin page background | AdminLogin.jsx:25 |
| Gray-900 (admin dark) | `#111827` | AdminLogin dark background | AdminLogin.jsx:25 |
| Gray-800 (admin card) | `#1f2937` | AdminLogin card dark | AdminLogin.jsx:27 |
| Indigo-600 (admin btn) | `#4f46e5` | Admin login button (inconsistent) | AdminLogin.jsx:56 |
| Indigo-500 (hover) | `#6366f1` | Admin button hover | AdminLogin.jsx:56 |
| Orange gradient start | `#ea580c` | PostCard title gradient (orphaned) | PostCard.jsx:16 |
| Orange gradient mid | `#f97316` | PostCard title gradient (orphaned) | PostCard.jsx:16 |
| Orange gradient end | `#c2410c` | PostCard title gradient (orphaned) | PostCard.jsx:16 |
| Orange-200 tag bg | `#fed7aa` | PostCard tag light bg (orphaned) | PostCard.jsx:38 |
| Red-500 | `#ef4444` | Error text, delete action | Contact.jsx:143,155; Dashboard.jsx:166; Navbar.jsx:93,170 |
| Gray-300/600 toggle | `#d1d5db / #4b5563` | ThemeToggle track (orphaned) | ThemeToggle.jsx:25 |
| Slate-900 bento card | `#0f172a` | Expertise bento bg (light mode) | Home.jsx:251 |

### Gradients
| Usage | Direction | Start | End | File : Line |
|-------|-----------|-------|-----|-------------|
| About page image overlay | top to bottom | transparent | rgba(15,23,42,0.4) | About.jsx:63 |
| PostCard title text | left to right | `#ea580c` | `#c2410c` | PostCard.jsx:16 |
| PostCard tag (light) | left to right | `#fed7aa` | `#fdba74` | PostCard.jsx:38 |
| PostCard tag (dark) | left to right | `#b45309` | `#ea580c` | PostCard.jsx:38 |

### Dark vs Light Mode Values
| Token | Light | Dark |
|-------|-------|------|
| Page background | white | `#0A0A0A` |
| Body text | `#0f172a` | `#f8fafc` |
| Navbar bg (scrolled) | rgba(255,255,255,0.8) | rgba(10,10,10,0.8) |
| Border | slate-100 (`#f1f5f9`) | slate-800 (`#1e293b`) |
| Card bg | slate-50 | slate-900/50 |
| Bento Expertise card | slate-900 | white (full invert) |
| Preloader panels | slate-900 | white |

### WCAG AA Contrast Failures
| Pair | Foreground | Background | Est. Ratio | Status |
|------|-----------|------------|------------|--------|
| Slate-400 text on white | `#94a3b8` | `#ffffff` | ~3.0:1 | FAIL (needs 4.5:1) |
| Slate-500 text on white | `#64748b` | `#ffffff` | ~4.1:1 | FAIL (borderline; bold passes) |
| Slate-400 on `#0A0A0A` | `#94a3b8` | `#0A0A0A` | ~6.8:1 | PASS |
| White/40 on slate-900 (preloader) | rgba(255,255,255,0.4) | `#0f172a` | ~2.2:1 | FAIL |
| `text-[10px]` throughout | Various | Various | N/A | TOO SMALL regardless of contrast |

### Hardcoded Color Repetitions
- `#E2725B` appears **25+ times** across 9 files — no CSS variable or Tailwind token.
- `#0A0A0A` appears **8 times** across 6 files.
- `bg-slate-900`, `dark:text-slate-400`, `dark:border-slate-800` repeated 20+ times with no abstraction.

---

## STEP 3 — Typography Audit

### Font Imports
| Font | Source | Import Location |
|------|--------|-----------------|
| **Inter** (wght 100-900) | Google Fonts CDN | `src/styles.css` line 1 |
| **K2D** | Listed in tailwind.config.js line 11 — **NOT imported anywhere** | — |
| **Lato** | Listed in tailwind.config.js line 12 — **NOT imported anywhere** | — |

> WARNING: K2D is used in PostCard.jsx (`font-k2d`) but no `@import` exists — silently falls back to system sans-serif.

### Typography Scale
| Element | Size | Weight | Line Height | Tracking | File |
|---------|------|--------|-------------|----------|------|
| Hero H1 | text-6xl to text-8xl (responsive) | 700 | leading-[0.8] | tracking-tighter | Home.jsx:152 |
| About H1 | text-6xl to text-8xl | 700 | default | tracking-tighter | About.jsx:70 |
| Projects H1 | text-6xl to text-8xl | 700 | default | tracking-tighter | Projects.jsx:104 |
| Contact H1 | text-6xl to text-8xl | 700 | leading-tight | tracking-tighter | Contact.jsx:103 |
| ProjectDetail H1 | text-6xl to text-9xl | 700 | leading-[0.9] | tracking-tighter | ProjectDetail.jsx:116 |
| Dashboard H1 | text-4xl to text-5xl | 700 | default | tracking-tighter | Dashboard.jsx:61 |
| Section labels | text-[10px] or text-xs | 700 | default | tracking-[0.2em] to tracking-[0.5em] | All pages |
| Hero body | text-xl to text-2xl | 500 | leading-relaxed | tracking-tight | Home.jsx:159 |
| Card body | text-lg | 500 | leading-relaxed | tracking-tight | Projects.jsx:137 |
| Buttons (primary) | text-[10px] | 700 | — | tracking-[0.2em] | Home.jsx:169 |
| Nav links | text-xs | 700 | — | tracking-[0.2em] | Navbar.jsx:53 |
| Stat numbers | text-5xl | 700 | — | tracking-tighter | Home.jsx:188 |
| PostCard title | text-xl | 700 | — | — (font-k2d, fallback) | PostCard.jsx:13 |

---

## STEP 4 — Page-by-Page Feature Inventory

### Page Feature Table
| Page | File(s) | Features | Animations | Libraries / Data |
|------|---------|----------|------------|-----------------|
| **Home** | Home.jsx | Hero + tagline, profile image (parallax), 2 CTAs, stat counters (15+ projects, 3+ years), Bento grid (Selected Works + Core Expertise) | Split-line text reveal, magnetic buttons, parallax on mousemove, count-up counters, bento stagger entrance | GSAP + ScrollTrigger; all data hardcoded |
| **About** | About.jsx | Sticky profile image, 2 bio paragraphs, skill tags (13 items), Education block, Notable Mentions | Image slide-in left, content stagger right, skill tags stagger on scroll | GSAP + ScrollTrigger; all data hardcoded |
| **Projects** | Projects.jsx | 5 project cards (image + title + year + description + tags + link) | Header stagger, ScrollTrigger batch card reveal, parallax image scrub | GSAP + ScrollTrigger; data hardcoded (duplicated) |
| **ProjectDetail** | ProjectDetail.jsx | Back link, hero title + subtitle, full-width image, overview body, aside (Role / Year / Stack / GitHub link) | Hero content stagger, image scale-in | GSAP; data hardcoded (copy of Projects.jsx) |
| **Contact** | Contact.jsx | Heading, 6 social icon links, contact form (Name/Email/Message, 200-char limit, validation, success toast) | Header stagger, form slide-up | GSAP; API POST /contact — backend required |
| **AdminLogin** | AdminLogin.jsx | Email + password form, JWT auth, redirect to dashboard | Card fade + slide | Framer Motion; API POST /auth/login; mismatched palette |
| **Dashboard** | Dashboard.jsx | Post list (API), create/edit/delete posts, ReactQuill rich text editor, tags input | None | ReactQuill + Axios CRUD |

### Component Inventory
| Component | Used In | Features |
|-----------|---------|----------|
| Navbar | App.jsx (global) | Fixed, scroll-aware blur, logo, 3 nav links, theme toggle emoji, Admin/Logout button, mobile hamburger menu |
| Preloader | App.jsx (global) | Full-screen overlay, 6-panel shutter exit (GSAP), progress counter 0-100, status text cycling, terracotta progress bar |
| ThemeToggle | **Not rendered anywhere** | Toggle switch UI — orphaned component |
| PostCard | **Not rendered anywhere** | Framer Motion hover card with orange gradient title — orphaned component |

---

## STEP 5 — Global Checks

### Navigation
- PASS: Fixed navbar with scroll-aware blur and border
- PASS: Mobile hamburger menu with smooth max-height transition
- PASS: Active link highlighting in terracotta
- WARN: Route casing inconsistency — /Projects (capital P) vs /about, /contact (lowercase)
- WARN: "About" page has NO navbar link — the full page is unreachable from navigation
- FAIL: No footer anywhere on the site

### Theme Toggle
- PASS: Dark/light mode via ThemeContext, defaults to dark
- WARN: Dark class applied to both <html> (ThemeContext) AND <body> (App.jsx) — redundant double application
- WARN: Toggle UI is emoji only (sun/moon) with no accessible label
- FAIL: Theme preference not persisted to localStorage — resets to dark on every page refresh

### SEO & Meta Tags
- FAIL: index.html title is "My Portfolio " (generic + trailing space)
- FAIL: No <meta name="description">
- FAIL: No Open Graph tags (og:title, og:image, og:description)
- FAIL: No Twitter Card tags
- FAIL: No <html lang="en"> attribute on the <html> tag
- FAIL: No favicon defined

### Accessibility
- PASS: Profile images have alt="Adya Archita"
- PASS: Project images have alt={project.title}
- WARN: Social icon links in Contact have no visible label text — need aria-label
- WARN: Theme toggle button has no aria-label
- WARN: Mobile hamburger button has no aria-label or aria-expanded
- FAIL: text-[10px] used throughout for labels and CTA buttons — extremely small
- FAIL: Form inputs in Contact have no id linked to <label> via htmlFor
- FAIL: No skip-to-content link
- FAIL: outline-none removes focus styles on form inputs with no custom replacement

### Images & Performance
- PASS: profile.png (97 KB) — acceptable size
- FAIL: 4 of 5 project images missing (nagarsaarthi.jpg, zairzest.jpg, hackwithzairza.jpg, calculator.jpg) — all 404
- FAIL: onError fallback uses via.placeholder.com — external dependency risk
- FAIL: No loading="lazy" on any <img> tag
- FAIL: No width/height attributes on images — causes layout shift
- FAIL: No WebP format used
- FAIL: No <link rel="preconnect"> for Google Fonts in index.html

### Unused Dependencies
| Package | Installed | Used | Notes |
|---------|-----------|------|-------|
| aos | Yes | No | Not imported in any file |
| framer-motion | Yes | Partial | Only AdminLogin.jsx + orphaned PostCard.jsx |
| react-quill | Yes | Yes | Dashboard only |
| axios | Yes | Yes | API service |

### Backend Dependency
Contact form, Admin Login, and Dashboard all call http://localhost:5000/api — non-functional without a running backend. No graceful degradation exists.

### Data Architecture Issue
Project data array is copy-pasted identically in both Projects.jsx (lines 8-54) and ProjectDetail.jsx (lines 5-61). Any update requires two edits — violates DRY.

---

## STEP 6 — Summary Tables

### Color Palette Table
| Name | HEX | Role | File : Line |
|------|-----|------|-------------|
| Terracotta | `#E2725B` | Primary accent / active / hover / CTA | 9+ files, 25+ occurrences |
| Near-Black | `#0A0A0A` | Dark background | styles.css:22, 6 page files |
| White | `#FFFFFF` | Light background | styles.css:16 |
| Slate-900 | `#0f172a` | Light mode text | styles.css:17 |
| Slate-50 | `#f8fafc` | Dark mode text | styles.css:23 |
| Slate-100 | `#f1f5f9` | Light borders | Multiple pages |
| Slate-800 | `#1e293b` | Dark borders | Multiple pages |
| Gray-100/900 | `#f3f4f6` / `#111827` | Admin page BG only | AdminLogin.jsx:25 |
| Indigo-600 | `#4f46e5` | Admin button (inconsistent) | AdminLogin.jsx:56 |
| Orange gradient | `#ea580c` to `#c2410c` | PostCard text (orphaned) | PostCard.jsx:16 |
| Red-500 | `#ef4444` | Errors / Delete actions | Contact.jsx, Dashboard.jsx, Navbar.jsx |

### Page Feature Table
| Page | Files | Key Features | Animations | Libraries |
|------|-------|-------------|------------|-----------|
| Home | Home.jsx | Hero, parallax image, CTAs, stat counters, bento grid | Split text, magnetic btns, parallax, count-up, stagger | GSAP + ScrollTrigger |
| About | About.jsx | Sticky profile, bio, skill tags, education, mentions | Slide-in, stagger, scroll-reveal tags | GSAP + ScrollTrigger |
| Projects | Projects.jsx | 5 project cards (image + tags + links) | Header stagger, batch card reveal, parallax scrub | GSAP + ScrollTrigger |
| ProjectDetail | ProjectDetail.jsx | Hero, full-width image, overview, aside metadata | Content stagger, image scale-in | GSAP |
| Contact | Contact.jsx | Social icons, contact form with validation | Header stagger, form slide-up | GSAP + Axios |
| AdminLogin | AdminLogin.jsx | Email/password form, JWT auth | Card fade + slide | Framer Motion |
| Dashboard | Dashboard.jsx | CRUD posts, ReactQuill editor | None | ReactQuill + Axios |

### Typography Table
| Element | Family | Size | Weight | Tracking |
|---------|--------|------|--------|----------|
| All page H1 headings | Inter | text-6xl to text-9xl (responsive) | 700 | tracking-tighter |
| Body / descriptions | Inter | text-lg to text-2xl | 500 | tracking-tight |
| Section labels | Inter | text-[10px] to text-xs | 700 | tracking-[0.2em] to tracking-[0.5em] |
| CTA buttons | Inter | text-[10px] to text-xs | 700 | tracking-[0.2em] |
| Nav links | Inter | text-xs | 700 | tracking-[0.2em] |
| Stat numbers | Inter | text-5xl | 700 | tracking-tighter |
| PostCard title | K2D (fallback: system sans) | text-xl | 700 | default |

### Inconsistencies Detected
| Category | Issue |
|----------|-------|
| **Colors** | `#E2725B` hardcoded 25+ times — no CSS variable or Tailwind theme token |
| **Colors** | AdminLogin uses entirely different palette (grays + indigo) vs rest of site (slate + terracotta) |
| **Colors** | PostCard uses orange gradient totally unrelated to site accent `#E2725B` |
| **Colors** | ThemeToggle uses gray-300/600 vs rest of site using slate-* |
| **Fonts** | K2D + Lato in tailwind.config but never @imported — silent fallback to system font |
| **Fonts** | PostCard uses font-k2d while every other component uses Inter |
| **Routes** | `/Projects` (capital P) vs `/about`, `/contact` (lowercase) — inconsistent casing |
| **Data** | Project array duplicated identically in Projects.jsx and ProjectDetail.jsx |
| **Components** | ThemeToggle.jsx and PostCard.jsx are never rendered anywhere in the app |
| **Theme** | Dark/light class applied to both <html> (ThemeContext) and <body> (App.jsx) — redundant |
| **Theme** | No localStorage persistence — always resets to dark on page refresh |
| **Nav** | "About" page has no navigation link — unreachable from UI |
| **SEO** | No meta description, OG tags, lang attribute, or favicon |
| **A11y** | Form labels not linked to inputs via htmlFor |
| **A11y** | Social icon buttons missing aria-label |
| **A11y** | outline-none on form inputs removes focus styles with no custom replacement |
| **Images** | 4 of 5 project images missing (404); no lazy loading; no width/height |
| **Deps** | `aos` installed but never imported or used |

---

## STEP 7 — Recommendations (Not Implemented)

### 5 Quick Visual Wins

1. **Add project images** — The 4 missing images (nagarsaarthi.jpg, zairzest.jpg, hackwithzairza.jpg, calculator.jpg) cause all project cards to show grey fallback boxes. This is the single most visible deficiency. Add real screenshots or generated mockups immediately.

2. **Extract `#E2725B` to a CSS variable** — Add `--color-accent: #E2725B` in `:root` and extend Tailwind theme with `accent: 'var(--color-accent)'`. Future palette changes become a 1-line edit, removing 25+ hardcoded instances.

3. **Fix the K2D font fallback** — Import K2D from Google Fonts in styles.css, or replace `font-k2d` in PostCard.jsx with Inter. As-is, PostCard titles render in system sans-serif, inconsistent with the rest of the design.

4. **Add a footer** — No footer exists anywhere. A minimal strip with your name, GitHub/LinkedIn icons, and a copyright line anchors the page and signals professionalism.

5. **Bump button text from `text-[10px]` to `text-sm`** — CTA buttons ("Start a Project", "Resume 2025") at 10px are nearly microscopic. Increasing to 12-14px dramatically improves readability without breaking the design language.

---

### 5 Features That Would Strengthen This as a CSE Internship Portfolio

1. **GitHub Activity / Stats Panel** — Embed live GitHub API data (contribution graph, top languages, repo stars) on the Home or About page. The GitHub REST API is public — zero backend needed. Recruiters value provable activity over self-reported claims.

2. **Experience / Timeline Section** — A vertical timeline of internships, open-source contributions, hackathon placements, and coursework is the most-checked section in CSE portfolios. Currently absent. Add it to About or as a dedicated /experience page.

3. **Live Demo Embed on ProjectDetail** — Add an autoplay (muted, looped) screen-recording MP4 or sandboxed iframe on each project detail page. This proves projects are real and functional without the recruiter leaving the page.

4. **Tech Proficiency Visualization** — Replace the plain skill tag cloud on About with a visual radar chart or proficiency bars (Chart.js or D3.js) categorized by domain (Frontend / Backend / AI-ML / Tools). Signals data-viz ability and honest self-assessment.

5. **Structured Case Studies on ProjectDetail** — The current detail shows only one paragraph. Add sections: Problem Statement → Approach / Architecture Decisions → Key Technical Challenges → Measurable Outcomes. This differentiates a thoughtful engineer from someone who just "built X."

---

### Refined Palette (Preserving Current Identity)

The current identity: near-black dark mode + warm terracotta accent. This refinement adds warmth to neutrals and deepens the accent for better contrast while keeping the character intact.

| Token | Current HEX | Refined HEX | Notes |
|-------|------------|------------|-------|
| --bg-dark | `#0A0A0A` | `#080808` | Richer true-black |
| --bg-light | `#FFFFFF` | `#FAFAF9` | Warm off-white, reduces harshness |
| --surface-dark | `#1e293b` (slate-800) | `#111111` | Matches near-black family |
| --surface-light | `#f8fafc` (slate-50) | `#F5F4F2` | Warm cream surface |
| --accent | `#E2725B` | `#E0694F` | Slightly deeper — more saturation, better contrast |
| --accent-muted | (none) | `#F0C4BB` | Pastel terracotta for tag/badge backgrounds |
| --text-primary-dark | `#f8fafc` | `#F0EDE8` | Warm white — easier on eyes in dark mode |
| --text-secondary | `#94a3b8` (slate-400) | `#A09A94` | Warm gray — passes AA on dark bg |
| --border-dark | `#1e293b` (slate-800) | `#1C1C1C` | Matches near-black surface family |
| --border-light | `#f1f5f9` (slate-100) | `#E8E4E0` | Warm light border |

---

### UX, Accessibility & Performance Fixes (Ranked by Impact)

| Priority | Category | Fix |
|----------|----------|-----|
| CRITICAL | Broken Images | Add the 4 missing project images. Replace via.placeholder.com with a local SVG fallback. |
| CRITICAL | Backend Dependency | Contact form fails silently without a server. Add env check + graceful "demo mode" message, or switch to Formspree/EmailJS. |
| CRITICAL | SEO — Missing Meta | Add <meta name="description">, Open Graph tags, Twitter Cards, <html lang="en">, and rename title to "Adya Archita Pattnaik — Full-Stack Engineer" in index.html. |
| HIGH | About page unreachable | Add { name: "About", path: "/about" } to Navbar navLinks array. |
| HIGH | A11y — Form Labels | Add id + htmlFor pairs for all Contact.jsx form inputs. Screen readers cannot associate labels without this. |
| HIGH | A11y — Icon Buttons | Add aria-label to all 6 social icon links in Contact, the theme toggle button, and the hamburger menu button. |
| HIGH | Theme Persistence | Save darkMode to localStorage in ThemeContext and read it on initialization so preference survives refresh. |
| MEDIUM | Focus Styles | Replace outline-none on inputs with focus-visible:ring-2 focus-visible:ring-[#E2725B] for keyboard accessibility. |
| MEDIUM | Remove Duplicate Data | Extract project data to src/data/projects.js and import in both Projects.jsx and ProjectDetail.jsx. |
| MEDIUM | Lazy Loading Images | Add loading="lazy" and explicit width/height to all <img> tags to prevent layout shift. |
| MEDIUM | Remove Unused Deps | Uninstall aos or use it. Integrate or delete orphaned ThemeToggle.jsx and PostCard.jsx. |
| MEDIUM | Route Casing | Normalize all routes to lowercase (/projects, /about, /contact) for consistency and SEO. |
| LOW | Footer | Add a minimal footer with name, social links (GitHub, LinkedIn), email, and copyright. |
| LOW | Preloader Pointer Events | The preloader wrapper has pointer-events-none — users can click through during load. Set pointer-events-auto while visible. |
| LOW | Font Preconnect | Add <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> in index.html to reduce Inter font load time. |
| LOW | Favicon | Add a favicon — a simple terracotta monogram "A" would match the brand identity. Currently the tab shows a blank icon. |

---

*Audit complete. No files were modified. Awaiting instructions on which improvements to implement.*
