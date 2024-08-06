import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gothic: ["var(--font-nanum-gothic)"],
        myeongjo: ["var(--font-nanum-myeongjo)"],
        coding: ["var(--font-nanum-coding)"],
      },
      transitionProperty: {
        "max-height-spacing": "height, max-height, padding, margin",
      },
    },
  },
  plugins: [],
};
export default config;
