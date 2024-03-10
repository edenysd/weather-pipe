/** @type {import('tailwindcss').Config} */
const { parkwindPlugin } = require("@park-ui/tailwind-plugin");
const flowbite = require("flowbite/plugin");

module.exports = {
  content: [
    "./client/**/*.{js,jsx,ts,tsx}",
    "./imports/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  plugins: [parkwindPlugin, flowbite],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
      },
    },
  },
  darkMode: "class",
};
