export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
      },
      colors: {
        ecoBg: '#FFF9F0', // Soft cream background
        ecoPink: '#FF8FAB',
        ecoBlue: '#70D6FF',
        ecoYellow: '#FFD166',
        ecoGreen: '#06D6A0',
        ecoDark: '#2D3142',
      },
      boxShadow: {
        'bouncy': '0 8px 0 rgba(0, 0, 0, 0.1)',
        'bouncy-hover': '0 4px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
