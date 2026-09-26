# Project: Animated Portfolio Website (Reference-Driven Build)

## Overview
A highly animated, motion-heavy personal portfolio website, built by closely
studying a reference video and reproducing its design language, animations,
and interaction patterns — then swapping in real content at the very end.

**Owner:** Mahendra Rajput
**Deployment:** Explicitly OUT OF SCOPE for this phase. Do not set up hosting,
CI/CD, or production configs unless asked.

## Reference Video
**Local path:** `/home/mahendra-rajput/Downloads/WhatsApp Video 2026-09-26 at 11.42.03.mp4`

This is the visual/motion reference for the whole build. Before starting
Phase 0, open this file and step through it to extract: section order,
background transitions, typography behavior, text/image animation style,
hover interactions, cursor behavior, loading animation, scroll behavior, and
mobile-specific behavior. Re-check against this file at the end of every
phase (see Self-Review below) — it is the source of truth for "does this
match the reference," not memory of it.

---

## Golden Rule
> Phases 1–17 = build and polish the complete site using **dummy/placeholder
> content only**.
> Phase 18 = replace dummy content with real content, **only after** the
> design/motion system is finished and matches the reference.

Never mix real content into components while still in the design-build
phases — always go through `src/data/dummy.ts` first.

---

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint + Prettier
- GSAP + ScrollTrigger (animation)
- Lenis (smooth scrolling)
- Additional animation libraries only if strictly necessary — don't add
  dependencies speculatively.

## Commands (fill in once project is scaffolded)
- `npm install` — install dependencies
- `npm run dev` — start dev server
- `npm run lint` — lint check
- `npm run build` — production build (not used for deployment yet)

---

## Git Workflow
- `develop` is the default/base branch. Nothing is built directly on `develop`.
- For **every phase** in the Build Order below:
  1. Branch off `develop`, named for the phase, e.g. `phase-1-foundation`,
     `phase-6-hero-section`, `phase-8-projects`.
  2. Do all of that phase's work on this branch only.
  3. When the phase's tasks are done, run the **Self-Review** below on that
     branch before merging.
  4. Only after self-review passes (or listed blockers are fixed), merge the
     phase branch into `develop`.
  5. Start the next phase from a fresh branch off the updated `develop`.
- Never merge a phase into `develop` with known/unfixed active blockers.

### Self-Review (run at the end of every phase, before merging)
1. **Functional check** — does everything built in this phase actually run
   without errors (dev server, console, build)?
2. **Reference check** — compare this phase's output against the reference
   video (see path above) for this phase's relevant behavior.
3. **Scope check** — confirm only dummy content was used (unless this is
   Phase 18) and no later-phase work leaked in early.
4. **Find active blockers** — anything broken, missing, or blocking the next
   phase from starting cleanly (build errors, missing dependency, broken
   animation, layout break, TypeScript errors, lint failures).
5. **Fix blockers** — resolve everything found in step 4 before merging.
   If something can't be resolved in-scope, note it explicitly rather than
   merging it silently.
6. Merge to `develop` only once steps 1–5 are clean.

---

## Project Structure
```
src/
├── app/
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── sections/
│   ├── projects/
│   └── ui/
├── animations/
│   ├── text/
│   ├── reveal/
│   ├── scroll/
│   ├── page/
│   └── cursor/
├── data/
│   └── dummy.ts        # ALL placeholder content lives here
├── hooks/
├── lib/
├── styles/
└── types/
```

**Rule:** No hardcoded copy inside components. Everything text/content-related
pulls from `data/dummy.ts` (later swapped for real data) so replacing content
in Phase 18 is a data-layer change, not a component rewrite.

---

## Build Order (do not skip ahead)
1. **Phase 0 — Reference Analysis:** document sections, order, transitions,
   typography, hover/cursor behavior, loading animation, scroll behavior,
   mobile behavior. Produce a mini design spec (colors, fonts, spacing,
   buttons, image treatment) before writing code.
2. **Phase 1 — Foundation:** scaffold Next.js + TS + Tailwind + ESLint +
   Prettier + Git; install GSAP/ScrollTrigger/Lenis; create folder structure;
   create `dummy.ts`.
3. **Phase 2 — Global Design System:** color tokens, typography scale,
   layout/grid system, reusable UI primitives (Button, Link, Arrow, Label,
   Divider, Section heading, Image wrapper).
4. **Phase 3 — Global Motion System:** Lenis + GSAP + ScrollTrigger wiring;
   reusable text animations (fade, character/word/line reveal, scale, clip,
   slide, parallax); reusable element animations; dark↔light transitions.
5. **Phase 4 — Loading Experience:** loader UI, exit animation, hero reveal,
   no content flash, refresh behavior tested.
6. **Phase 5 — Navigation:** desktop navbar + scroll/hover behavior; mobile
   full-screen menu with reveal/close animations.
7. **Phase 6 — Hero Section (Milestone 1):** dummy hero copy, typography,
   reveal animation, hero→next-section transition. **Checkpoint:** site
   should already "feel" like the reference here.
8. **Phase 7 — Content Sections:** intro/about, large typography section,
   services/expertise list with hover + reveal.
9. **Phase 8 — Projects/Work:** dummy project data (title, category, year,
   description, image, link), layout, hover interaction, scroll animation.
10. **Phase 9 — Media System:** reusable animated image component, video
    component (autoplay/muted/poster/lazy-load/mobile fallback) if reference
    uses video.
11. **Phase 10 — Advanced Scroll Animations:** sticky/pinned sections,
    horizontal scroll, parallax, section-to-section choreography so the site
    feels continuous rather than isolated effects.
12. **Phase 11 — Cursor System:** custom cursor with hover/project/link/view
    states; disabled/reduced on touch devices.
13. **Phase 12 — Final CTA / Contact:** dummy CTA copy, footer, social/email
    placeholders.
14. **Phase 13 — Responsive Pass:** check every section at 1440/1280/1024
    (desktop), 768 (tablet), 430/390/360 (mobile) — typography, spacing,
    images, nav, animations, overflow, touch.
15. **Phase 14 — Accessibility:** semantic HTML, keyboard nav, focus states,
    alt text, contrast, `prefers-reduced-motion` support, accessible
    nav/buttons. (Worth emphasizing — matches real professional experience.)
16. **Phase 15 — Performance:** optimize/lazy-load images, minimize JS,
    audit GSAP for layout thrashing, check mobile FPS, font loading, initial
    load, remove unused deps, clear console errors.
17. **Phase 16 — Browser Testing:** Chrome, Firefox, Edge, Safari (if
    available) — scroll, hover, touch, keyboard, refresh, screen sizes.
18. **Phase 17 — Visual QA vs Reference:** side-by-side check of typography,
    spacing, section height, transitions, scroll movement, hover, cursor,
    color, image treatment, mobile. Anything off goes back to the relevant
    task above.
19. **Phase 18 — Replace Dummy Content:** swap in real content only now.

---

## Real Content Reference (for Phase 18 only — do not use earlier)

**Hero:** Mahendra Rajput

**Experience:**
- Codernaline LLP
- Vidhya GXP

**Projects:**
- Real Estate CRM
- Job:Hub and Portal
- Task Management System

**Skills:**
Drupal, PHP, Laravel, JavaScript, React, REST API, OAuth2, MySQL, Docker,
DDEV, Git, GitLab CI, Linux

**Clients:**
VTPC, UCDC, DB United

**Contact:** actual professional contact info (to be supplied)

---

## Conventions & Do's/Don'ts
- Don't hardcode text/content in components — always via `data/dummy.ts`.
- Don't add animation libraries beyond GSAP/ScrollTrigger/Lenis unless a
  specific need can't be met by them.
- Don't start deployment configuration.
- Do keep animations reusable/modular under `src/animations/`, not
  duplicated per-section.
- Do treat Phase 6 (Hero) as the design-language checkpoint before building
  further sections.
- Do run the responsive + accessibility + performance passes continuously,
  not just at the very end, per Phases 13–15.
