/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
],
  theme: {
    colors: {
      ...colors,
      primary: '#15bef7',
    },
    extend: {},
  },
  plugins: [],
}

