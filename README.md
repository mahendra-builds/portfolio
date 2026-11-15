# Mahendra Rajput — Portfolio

Personal portfolio for a full stack developer and Linux server engineer.
Live at **[mahiweb.in](https://mahiweb.in)**.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **GSAP**, **Lenis** smooth scroll, and **Vercel Analytics**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock)
![Vercel](https://img.shields.io/badge/Vercel-Analytics-black?style=for-the-badge&logo=vercel)

---

## What's inside

- **Preloader** — 0→100% counter, animated macaroni curve, cursive "hello", curtain wipe.
- **Hero** — giant `FULL STACK / DEVELOPER` headline with an SVG liquid-wave distortion on hover, a rotating highlighted word ("I build live **websites** people use every day"), and CTA buttons.
- **Skills marquee** — slow scrolling tech ticker under the hero.
- **About** — a live PHP code panel (your workbench), short bio, three count-up counters (years / projects / clients), metadata grid, and clickable client cards.
- **Clients** — VTPC (Vaivari Technical Aids Centre, Latvia), UCDC (University of California Washington Center, Washington DC) and DB United (Prague), each linking to the live site.
- **Skills & Expertise** — service accordion with hover image previews and floating tech badges.
- **Work** — three project rows with hover slide, tech tags and live links.
- **Client Work** — carousel of the work delivered per client, with arrows, dots, 6s auto-advance and pause on hover.
- **Contact** — large headline, direct channel cards and a working contact form with success/error states.
- **Footer** — copyright, GitHub, LinkedIn, CV and back-to-top.
- **Floating WhatsApp button** — round green button, bottom-right, opens a prefilled chat.

### Accessibility (WCAG 2.2 AA)

- Single `<h1>`, clean `h1 → h2 → h3 → h4` heading order, and labelled landmarks.
- Skip-to-content link as the first tab stop.
- Every image has alt text, every input has a `<label>`, every link and button has an accessible name.
- All body text meets a 4.5:1 contrast ratio (gold on cream uses a dedicated darker gold).
- Visible keyboard focus rings on every interactive element.
- Full `prefers-reduced-motion` support — Lenis, GSAP, the marquee, the preloader and magnetic buttons all stand down.
- Fully responsive down to 390px, with the nav collapsing to a drawer below 1024px.

### SEO

- JSON-LD `Person` + `WebSite` + `ProfilePage` schema, so searching **"Mahendra Rajput"** surfaces the name, role, skills and site.
- Generated Open Graph / Twitter card image and browser-tab icon — "Mahendra Rajput — Full Stack Developer".
- `sitemap.xml` and `robots.txt` routes, canonical URL, Open Graph profile card, and keyword-aligned headings.
- Semantic first paragraph on every page section, so the content is readable by search crawlers and screen readers alike.

### Motion & polish

- Lenis smooth scroll synced to the GSAP ticker.
- Custom magnetic cursor with theme inversion and contextual states.
- Full `prefers-reduced-motion` support (Lenis, GSAP, marquee, preloader and magnetic buttons all stand down).
- Visible keyboard focus rings and alt text throughout.
- Fully responsive down to 390px.

---

## Getting started

### Requirements

- **Node.js** 18.18 or higher (Node 20+ recommended)
- **npm** 9 or higher

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

---

## Scripts

| Script                  | What it does                                                       |
| ----------------------- | ------------------------------------------------------------------ |
| `npm run dev`           | Start the dev server                                               |
| `npm run build`         | Production build                                                   |
| `npm start`             | Serve the production build                                         |
| `npm run lint`          | ESLint (`next lint`)                                               |
| `npm run lint:fix`      | ESLint with auto-fix                                               |
| `npm run typecheck`     | `tsc --noEmit`                                                     |
| `npm run format`        | Prettier write                                                     |
| `npm run format:check`  | Prettier check                                                     |
| `npm run analyze`       | Build with the bundle analyzer (reports in `.next/analyze/*.html`) |
| `npm run check`         | typecheck + lint + format check                                    |
| `npm run vercel:dev`    | Local Vercel dev environment                                       |
| `npm run vercel:deploy` | Deploy to Vercel production                                        |

---

## Measuring performance (read before auditing)

> **Always audit the production build — never `npm run dev`.**
>
> ```bash
> npm run build && npm start   # then audit http://localhost:3000
> ```

The dev server serves unminified, unbundled modules with React StrictMode
double-invoking effects, hot-reload instrumentation and `Cache-Control:
no-store`. Auditing it produces numbers that do not exist in production — a
recent run scored **Performance 48 / LCP 7.1 s / TBT 2130 ms** on `next dev`,
while the same code scored **99 / LCP 1.6 s / TBT 110 ms** as a production
build. Audit `https://mahiweb.in` (or `npm start`) for numbers that count.

Two more environment-only artefacts that show up in local audits:

- `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js` return
  **500 off Vercel** (they return 200 in production) and are logged as console
  errors, which costs Best Practices points locally only.
- Lighthouse reports "missing source maps" until the deploy workflow uploads
  them to Sentry (see `.github/workflows/deploy.yml`).

---

## Environment variables

Copy `.env.example` to `.env.local` and fill it in.

| Variable                        | Required | Purpose                                                      |
| ------------------------------- | -------- | ------------------------------------------------------------ |
| `RESEND_API_KEY`                | yes      | Server-side email delivery via Resend (100 emails/day free)  |
| `CONTACT_FROM`                  | yes      | Verified sender, e.g. `Mahendra Rajput <hello@mahiweb.in>`   |
| `RECIPIENT_EMAIL`               | yes      | Inbox that receives contact form submissions                 |
| `NEXT_PUBLIC_SENTRY_DSN`        | optional | Sentry error monitoring                                      |
| `SENTRY_AUTH_TOKEN`             | optional | Sentry source map uploads                                    |
| `SENTRY_ORG` / `SENTRY_PROJECT` | optional | Sentry project metadata                                      |
| `NEXT_PUBLIC_SITE_URL`          | optional | Canonical URL for OG tags (defaults to `https://mahiweb.in`) |

### How the contact form delivers mail

The browser posts **only** to `/api/contact`. That route validates the submission, applies a
honeypot, an origin check, a request-size limit and a per-IP rate limit, then delivers through
**Resend** over a server-side API call.

Resend is the only delivery provider. Web3Forms was removed because its API rejects server-side
calls on the free tier (`403 — This method is not allowed`), so as a proxied fallback it could
never deliver.

Delivery is **fail-closed**: if `RESEND_API_KEY`, `CONTACT_FROM` or `RECIPIENT_EMAIL` is missing,
the route answers `503 email_not_configured` instead of pretending to have sent the message. If
the provider rejects the message the route answers `502 delivery_failed`. In both cases the
visitor gets a visible error plus a one-click **mailto** link and a **copy-to-clipboard**
fallback — a message is never silently lost.

Retries are safe: every submission carries an `Idempotency-Key` derived from the submission id
and the message content, so a double-click or a network retry cannot deliver twice. A transient
`5xx` from Resend is retried once automatically.

Check what a deployment actually has:

```bash
curl https://mahiweb.in/api/contact
# { "provider": "resend", "deliveryReady": true, ... }
```

`deliveryReady` reports that all three variables are configured — the probe never calls Resend, so
it costs no quota and leaks nothing. It does not prove the API key itself is valid; one real
submission is what confirms that.

> No delivery credential is ever sent to the browser. There must be **no** `NEXT_PUBLIC_` prefixed
> copy of the key; `grep -r "RESEND_API_KEY" .next/static` should return nothing.

### Tests

```bash
npm test
```

The suite exercises the real route handler with a stubbed `fetch`, so it never touches the
network and never sends an email. It covers the happy path and the outbound payload, empty and
invalid input, honeypot hits, cross-origin requests, the request-size limit, the rate limiter,
every missing-configuration and provider-failure path, and the frontend's response mapping.

---

## Deploying to Vercel

1. Import the repo at [vercel.com/new](https://vercel.com/new).
2. Add the environment variables above under **Settings → Environment Variables**.
3. Enable **Analytics** and **Speed Insights** for the project in the Vercel dashboard.
4. Attach `mahiweb.in` under **Settings → Domains**.

`vercel.json` already sets the framework, build commands, security headers and cache rules.

### Continuous deployment

Two GitHub Actions workflows are included:

- `.github/workflows/ci.yml` — typecheck, lint, format check and build on every push and PR.
- `.github/workflows/deploy.yml` — Vercel preview on PRs and production on `main`. It no-ops until
  you add the `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` repository secrets.

### Git hooks

`husky` + `lint-staged` run Prettier and ESLint on staged files before every commit, and
`commitlint` enforces conventional commit messages (`feat:`, `fix:`, `chore:`, …).

---

## Project structure

```
src/
├── app/
│   ├── api/contact/route.ts   # contact API (Resend → Web3Forms fallback)
│   ├── globals.css             # theme tokens, keyframes, focus styles
│   ├── layout.tsx              # metadata, OG/Twitter cards, Analytics
│   ├── page.tsx                # composes every section
│   └── global-error.tsx        # Sentry error boundary
├── components/
│   ├── layout/                 # custom cursor, Lenis wrapper
│   ├── navigation/Navbar.tsx   # scroll-aware header + mobile drawer
│   ├── sections/               # hero, marquee, about, expertise, work,
│   │                           # reviews, contact, footer, preloader
│   └── ui/                     # button, badge, magnetic, count-up, WhatsApp
├── data/
│   ├── real.ts                 # live content
│   └── dummy.ts                # reference content + USE_REAL_CONTENT toggle
├── hooks/useReducedMotion.ts
└── types/index.ts
```

---

## Connect

- **Email** — [ma02raj@gmail.com](mailto:ma02raj@gmail.com)
- **GitHub** — [@mahendra-builds](https://github.com/mahendra-builds)
- **WhatsApp** — [+91 9754137138](https://wa.me/919754137138)
- **LinkedIn** — _add your profile URL in `src/data/real.ts`_

> Still to fill in: your **LinkedIn URL**, and a **professional photo** — drop it at
> `public/images/mahendra-editorial.jpg` and flip `about.showPortrait` to `true` in
> `src/data/real.ts` to swap the monogram badge for your picture.

---

© 2026 Mahendra Rajput
