/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./*.{html,js,ts,jsx}",
    "./node_modules/flowbite/**/*.js"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // Dark mode theme
        primarydark: colors.stone[800],
        secondarydark: colors.rose[700],
        tertiarydark: colors.rose[400],
        textdark: 'rgba(255, 255, 255, 0.85)',
        // Light mode theme
        primary: "#F0F0F2",
        secondary: colors.rose[500],
        tertiary: colors.rose[300],
        textlight: 'rgba(0, 0, 0, 0.8)',
      },
      fontFamily: {
        poppins: ["sans-serif"],
      },
    },
    typography: (theme) => ({
      DEFAULT: {
        css: {
          h2: {
            fontSize: theme("fontSize.xl"),
            paddingBottom: theme('spacing.0'),
            paddingTop: theme('spacing.3'),
            fontWeight: theme('fontWeight.bold'),
          },
        },
      },
      sm: {
        css: {
          h2: {
            fontSize: theme("fontSize.2xl"),
          },
        },
      },
    }),
    variants: {
      extend: {
        outline: ['focus'],
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
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],
  important: false,
};
