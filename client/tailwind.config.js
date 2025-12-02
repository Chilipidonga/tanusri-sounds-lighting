/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: "#0ff0fc", // Mana Brand Color
        darkbg: "#0a0a0a", // Background Color
      }
    },
  },
  plugins: [],
}