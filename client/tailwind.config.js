import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./src/**/*.{html,js,ts,tsx,vue,svelte,css}"], // Ensure CSS is included
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        neutral: {
          50: "#f7f7f7",
          100: "#eeeeee",
          200: "#e0e0e0",
          300: "#cacaca",
          400: "#90bdaf",
          500: "#999999",
          600: "#7f7f7f",
          700: "#676767",
          800: "#545454",
          900: "#464646",
          950: "#282828",
        },
        primary: {
          DEFAULT: "#dad6d6",
          50: "#f8f8f8",
          100: "#f1efef",
          200: "#e5e3e3",
          300: "#dad6d6",
          400: "#b8b1b1",
          500: "#9e9595",
          600: "#867c7c",
          700: "#6f6666",
          800: "#5d5757",
          900: "#514b4b",
          950: "#292626",
        },
      },
    },
  },
  plugins: [],
  important: "#webcrumbs",
});
