/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        scne: {
          gold: "#C6A200",
          goldLight: "#E7C84F",
          bg: "#050508",
          surface: "#0B0B12",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(198,162,0,0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};