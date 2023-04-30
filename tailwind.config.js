/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.{html,js,ts,jsx}",
    "./node_modules/flowbite/**/*.js"],
  mode: "aot",
  theme: {
    extend: {
      colors: {
        // Dark mode theme
        primarydark: colors.stone[800],
        secondarydark: colors.rose[700],
        tertiarydark: colors.rose[400],
        textdark: 'rgba(255, 255, 255, 0.7)',
        // Light mode theme
        primary: colors.stone[300],
        secondary: colors.rose[700],
        tertiary: colors.rose[400],
        textlight: 'rgba(0, 0, 0, 0.7)',
      },
      fontFamily: {
        poppins: ["sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
