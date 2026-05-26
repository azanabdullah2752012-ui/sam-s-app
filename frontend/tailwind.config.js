/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkPurple: '#1e1135',
        accentPurple: '#4c3270',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(76, 50, 112, 0.2)',
      },
      backdropBlur: {
        glass: '8px',
      },
    },
  },
  plugins: [],
};
