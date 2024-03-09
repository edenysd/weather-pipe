/** @type {import('tailwindcss').Config} */
const { parkwindPlugin } = require("@park-ui/tailwind-plugin");

module.exports = {
  content: ["./client/**/*.{js,jsx,ts,tsx}", "./imports/**/*.{js,jsx,ts,tsx}"],
  plugins: [parkwindPlugin],
  theme: {
    extend: {},
  },
  darkMode: "class",
};
