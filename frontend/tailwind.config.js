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
        neoBg: '#F5F5F7',
        neoCard: 'rgba(255, 255, 255, 0.7)',
        neoAccent: '#8B5CF6',
        neoBlue: '#0ea5e9',
        neoBorder: 'rgba(0, 0, 0, 0.1)',
        neoHover: 'rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'neo-gradient': 'linear-gradient(135deg, rgba(89, 46, 131, 0.4) 0%, rgba(35, 12, 51, 0.1) 100%)',
        'button-gradient': 'linear-gradient(90deg, rgba(202, 156, 225, 0.2) 0%, rgba(202, 156, 225, 0) 100%)',
        'review-gradient': 'linear-gradient(90deg, rgba(89, 46, 131, 0.6) 0%, rgba(45, 24, 74, 0.6) 100%)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.25, 1.5, 0.5, 1)',
        'cinematic': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'smooth': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        'pulse-border': {
          '0%, 100%': { borderColor: 'rgba(202, 156, 225, 0.2)' },
          '50%': { borderColor: 'rgba(202, 156, 225, 0.8)', boxShadow: '0 0 15px rgba(202, 156, 225, 0.4)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'scan': 'scan 2s linear infinite',
        'pulse-border': 'pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
