/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Existing colors
        bgDark: "#0F172A",
        cardDark: "#1E293B",
        accent: "#2563EB",

        // New Custom Palette
        midnightBlue: "#00478f",
        redOrange: "#ff5d00",
        ebony: "#2a231f",
        mistyBlue: "#d8e1e7",
      },
    },
  },
  plugins: [],
}