/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          500: '#800000',
          600: '#660000',
          700: '#5C0000',
        },
        gold: {
          400: '#FFD700',
          500: '#FFC700',
        },
        darkred: '#4B0000',
      },
    },
  },
  plugins: [],
}
