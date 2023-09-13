/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["DM Sans, sans-serif"],
      poppins: ["Poppins, sans-serif"],
    },
    extend: {
      colors: {
        dark: {
          100: "#9CA3AF",
          200: "#6B7280",
          300: "#333333",
          400: "#111827",
          500: "#666666",
          600: "#000000",
        },
        primary: "#BE123C",
      },
    },
  },
  plugins: [],
};
