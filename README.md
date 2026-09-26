# Mahendra Rajput — Creative Developer & Linux Server Engineer

A modern, reference-driven, motion-heavy personal portfolio website engineered with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **GSAP**, and **Lenis Smooth Scroll**.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-3.15-88CE02?style=for-the-badge&logo=greensock)
![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-orange?style=for-the-badge)

---

## 🌟 Visual Systems & Feature Highlights

### 1. Motion & Physics Engine
- **Lenis Virtual Scroll**: Frictionless smooth scrolling synchronized directly with `gsap.ticker` to eliminate layout thrashing and maintain a consistent 60 FPS.
- **Custom Dual-Element Magnetic Cursor**:
  - Trailing circle with smooth 0.18 lerp physics.
  - Automatic theme color inversion using `mix-blend-mode: difference` over light linen and dark obsidian surfaces.
  - Contextual states: expands on interactive elements, displays a floating circular badge (`VISIT ↗`) over project cards, and disables safely on touch devices.
- **SVG Liquid Wave Distortion Filter**: Real-time `<feTurbulence>` and `<feDisplacementMap>` distortion triggered dynamically on cursor movement over the giant Hero headline.
- **Magnetic Buttons**: Spring physics attraction on badges and call-to-action buttons.

### 2. Full Section Suite
- **Preloader Experience**: Numerical percentage counter (0% → 100%), animated SVG macaroni graphic with stroke-dashoffset motion, cursive `"hello"` reveal, and curtain exit wipe.
- **Adaptive Header Navigation**:
  - Transparent with dark typography when over the light linen Hero section.
  - Automatically transitions to a sleek dark frosted glass header (`bg-[#090909]/85 backdrop-blur-md border-b border-white/10`) with high-contrast white tabs when scrolling over dark sections.
  - Full-screen animated mobile menu drawer.
- **Hero Section**: Linen cream canvas (`#F3EEE5`), giant compressed typography (`CREATIVE DEVELOPER`), disciplines row, scroll indicator, and rotating circular text stamp.
- **About Me Section**: Dark curtain overlay transition (`rounded-t-[4rem]`), studio-lit editorial portrait, narrative bio, structured metadata grid, and verified enterprise clients:
  - **[VTPC](https://www.vtpc.lv/)** (`vtpc.lv`)
  - **[UCDC](https://www.ucdc.edu/)** (`ucdc.edu`)
  - **[DB United](https://dbunited.co/)** (`dbunited.co`)
- **Skills & Server Infrastructure**:
  - Full stack engineering combined with deep **Linux Server Administration** (Ubuntu/Debian, SSH hardening, firewalls, Nginx reverse proxies, Docker containerization, DDEV local orchestration, MySQL tuning, and automated GitLab CI/CD pipelines).
  - Interactive service accordion with floating thumbnail image previews and animated floating tech badges.
- **Featured Projects Showcase**:
  - Dripping liquid `"WORK"` typography with pulsing droplet elements and continuous marquee ticker.
  - Stacked sticky project cards with live links:
    - **Real Estate CRM** (Enterprise CRM Platform — Laravel, MySQL, React, REST API)
    - **Job:Hub and Portal** (Employment & Talent Marketplace — Drupal, PHP, OAuth2, Nginx)
    - **Task Management System** (Productivity Suite — React, Laravel, Docker, GitLab CI)
- **Contact & Direct Channels**:
  - Editorial headline, direct contact cards (Email, GitHub, LinkedIn, Location).
  - Glassmorphism dark contact form submitting to `ma02@gmail.com` via backend API (`/api/contact`) with mailto fallback protection.
- **Floating WhatsApp Button**:
  - Positioned at the bottom-left corner with magnetic spring hover and direct chat connection to **+91 9754137138**.

---

## 🏗️ Project Architecture

```
portfolio/
├── public/
│   └── images/
│       ├── mahendra-editorial.jpg     # Processed portrait with dark edge vignette
│       └── mahendra-portrait.jpg      # High-res cropped portrait
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts           # Contact submission API (dispatches to ma02@gmail.com)
│   │   ├── favicon.ico
│   │   ├── globals.css                # Fluid typography clamps, Lenis resets, utility classes
│   │   ├── layout.tsx                 # Root layout with Anton, Plus Jakarta Sans, Caveat, JetBrains Mono
│   │   └── page.tsx                   # Main page assembling all sections and providers
│   ├── animations/
│   │   └── scrollTriggers.ts          # Safe SSR GSAP & ScrollTrigger initialization
│   ├── components/
│   │   ├── layout/
│   │   │   ├── CustomCursor.tsx       # Dual-element magnetic trailing cursor
│   │   │   └── SmoothScroll.tsx       # Lenis smooth scroll provider synced to GSAP ticker
│   │   ├── navigation/
│   │   │   └── Navbar.tsx             # Adaptive scroll-aware header & mobile menu drawer
│   │   ├── sections/
│   │   │   ├── Preloader.tsx          # 0-100% counter + macaroni curve + cursive 'hello'
│   │   │   ├── HeroSection.tsx        # Compressed display typography + liquid wave SVG filter
│   │   │   ├── AboutSection.tsx       # Portrait, bio, stats, and clickable client badges
│   │   │   ├── ExpertiseSection.tsx   # Service accordion, server knowledge, hover previews
│   │   │   ├── WorkSection.tsx        # Dripping 'WORK' typography + stacked sticky cards
│   │   │   └── ContactSection.tsx     # Channel cards, glass contact form, and footer
│   │   └── ui/
│   │       ├── Button.tsx             # Pill button primitive
│   │       ├── Divider.tsx            # Hairline divider
│   │       ├── ImageWrapper.tsx       # Aspect ratio image container with hover zoom
│   │       ├── Label.tsx              # Monospace badge with dot indicator
│   │       ├── Magnetic.tsx           # Magnetic spring physics wrapper
│   │       ├── RotatingBadge.tsx      # Circular rotating SVG stamp
│   │       ├── SectionHeading.tsx     # Section index and headline component
│   │       ├── TextReveal.tsx         # ScrollTrigger word-by-word reveal utility
│   │       └── WhatsAppButton.tsx     # Floating bottom-left WhatsApp button
│   ├── context/
│   │   └── CursorContext.tsx          # Global cursor state provider
│   ├── data/
│   │   ├── dummy.ts                   # Reference placeholder data & active toggle
│   │   └── real.ts                    # Mahendra Rajput's portfolio & client data
│   └── types/
│       └── index.ts                   # TypeScript interfaces
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js**: `v18.19.0` or higher
- **npm**: `9.0.0` or higher

### Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/mahendra-builds/portfolio.git
cd portfolio
npm install
```

### Running Locally
Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
Compile and validate production static and dynamic pages:

```bash
npm run build
npm run start
```

### Code Quality & Formatting
Run ESLint check:

```bash
npm run lint
```

Format code using Prettier:

```bash
npm run format
```

---

## 🔄 Content Management (Data Layer)

All content is decoupled from components and managed in the data layer:

- **`src/data/real.ts`**: Contains Mahendra Rajput's verified details, experience, server skills, projects, and client links.
- **`src/data/dummy.ts`**: Contains the reference video dummy data.
- **Active Data Toggle**:
  In `src/data/dummy.ts`:
  ```typescript
  export const USE_REAL_CONTENT = true; // Set to false to preview original dummy data
  ```

---

## 📬 Contact & Connect

- **Engineer**: Mahendra Rajput
- **Location**: Indore, Madhya Pradesh, India (Open to Remote Worldwide)
- **Email**: [ma02@gmail.com](mailto:ma02@gmail.com)
- **GitHub**: [@mahendra-builds](https://github.com/mahendra-builds)
- **WhatsApp**: [+91 9754137138](https://wa.me/919754137138)
- **LinkedIn**: [Mahendra Rajput](https://linkedin.com)
