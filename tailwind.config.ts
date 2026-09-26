import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        canvas: {
          light: "#F3EEE5",
          dark: "#090909",
        },
        surface: {
          dark: "#111111",
          card: "#161616",
          elevated: "#1f1f1f",
          border: "#262626",
          borderLight: "#e5e0d8",
        },
        brand: {
          gold: "#D4AF37",
          accent: "#C5A880",
          cream: "#F3EEE5",
          black: "#0A0A0A",
        },
        muted: {
          light: "#777777",
          dark: "#999999",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: ".25em",
        tightest: "-.06em",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
