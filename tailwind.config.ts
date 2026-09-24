import type { Config } from "tailwindcss";

/**
 * The palette is taken directly from the SCAF mark: three hands (blue, orange,
 * green) around a red heart. `ink` is the wordmark green pushed to near-black
 * so the brand still reads in dark areas. `heart` is reserved for protection /
 * GBV content only — it should never be used as a generic accent.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A2A21",
          800: "#123A2E",
          700: "#1A4A3B",
          600: "#27604E",
        },
        leaf: { DEFAULT: "#1E9E4A", soft: "#E4F4E9" },
        sun: { DEFAULT: "#EE8022", soft: "#FCEDDF" },
        sky: { DEFAULT: "#2FA3DC", soft: "#E1F1FA" },
        heart: { DEFAULT: "#E23B32", soft: "#FBE6E4" },
        paper: { DEFAULT: "#F2F4EF", deep: "#E7EBE4" },
        stone: { DEFAULT: "#5E6F68", light: "#8B9A94" },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // A modular scale (1.25) with tightened display leading.
        //
        // The middle term is `rem + vw` rather than bare `vw` so the scale stays
        // genuinely fluid across the phone range. With a bare `vw` the clamp hits
        // its floor early — 7vw reaches 2.75rem at a 629px viewport — which left
        // every phone from 320px to 629px rendering the same 44px h1, and the
        // section headings running to five lines on a small handset. These terms
        // interpolate from 320px up to the cap instead.
        "display-xl": [
          "clamp(2.375rem, 1.417rem + 4.79vw, 5.25rem)",
          { lineHeight: "0.95", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(1.75rem, 1.2rem + 2.75vw, 3.4rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em" },
        ],
        "display-md": [
          "clamp(1.45rem, 1.1rem + 1.75vw, 2.25rem)",
          { lineHeight: "1.12", letterSpacing: "-0.02em" },
        ],
        lede: ["clamp(1rem, 0.93rem + 0.35vw, 1.3rem)", { lineHeight: "1.55" }],
      },
      maxWidth: {
        prose: "68ch",
        shell: "82rem",
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        lift: "0 1px 2px rgba(10,42,33,0.06), 0 12px 32px -12px rgba(10,42,33,0.18)",
      },
      keyframes: {
        "hand-in": {
          "0%": { opacity: "0", transform: "rotate(var(--from)) scale(0.82)" },
          "100%": { opacity: "1", transform: "rotate(0deg) scale(1)" },
        },
        "beat": {
          "0%, 100%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.06)" },
        },
        "drift": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-14px)" },
        },
      },
      animation: {
        beat: "beat 2.8s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};

export default config;
