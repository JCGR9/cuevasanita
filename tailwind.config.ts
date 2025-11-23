import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c68642",
        secondary: "#8b4513",
        dark: "#2c1810",
        cream: "#f5e6d3",
        gold: "#d4a574",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
        raleway: ["var(--font-raleway)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
