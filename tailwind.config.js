/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-hind)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        bazar: {
          primary: "#0b8a3e",
          "primary-content": "#ffffff",
          secondary: "#16a34a",
          accent: "#16a34a",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f2f6f2",
          "base-300": "#e1e9e1",
          "base-content": "#1b2a1f",
          success: "#16a34a",
          error: "#dc2626",
        },
      },
    ],
  },
};
