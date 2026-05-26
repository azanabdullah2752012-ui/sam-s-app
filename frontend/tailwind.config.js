export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        neoBg: '#230C33',
        neoCard: 'rgba(89, 46, 131, 0.25)',
        neoAccent: '#CA9CE1',
        neoBlue: '#A9D6E5',
        neoBorder: 'rgba(255, 255, 255, 0.12)',
        neoHover: 'rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'neo-gradient': 'linear-gradient(135deg, rgba(89, 46, 131, 0.4) 0%, rgba(35, 12, 51, 0.1) 100%)',
        'button-gradient': 'linear-gradient(90deg, rgba(202, 156, 225, 0.2) 0%, rgba(202, 156, 225, 0) 100%)',
        'review-gradient': 'linear-gradient(90deg, rgba(89, 46, 131, 0.6) 0%, rgba(45, 24, 74, 0.6) 100%)',
      }
    },
  },
  plugins: [],
}
