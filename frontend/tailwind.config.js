export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkPurple: '#1e1135',
        lightPurple: '#4c3270',
        accentPurple: '#a573f1',
      },
      boxShadow: {
        glow: '0 0 20px rgba(165, 115, 241, 0.4)',
      }
    },
  },
  plugins: [],
}
