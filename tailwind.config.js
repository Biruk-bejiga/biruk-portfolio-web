/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5e9',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(14, 165, 233, 0.35)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
