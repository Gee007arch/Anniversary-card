/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        velvet: {
          900: '#0D0B0E',
          800: '#131016',
        },
        onyx: {
          DEFAULT: '#18141A',
          light: '#221D25',
          dark: '#120F14',
          border: '#2E2733',
        },
        crimson: {
          DEFAULT: '#E91E63',
          glow: 'rgba(233, 30, 99, 0.18)',
          hover: '#D81B60',
          dark: '#AD1457',
          light: '#F06292',
        },
        blush: {
          DEFAULT: '#FCE4EC',
          soft: '#FFF0F5',
          muted: '#F8BBD0',
        },
        pearl: {
          DEFAULT: '#FFFDF9',
          cream: '#FAF6EE',
          aged: '#F5EFE4',
        },
        charcoal: {
          DEFAULT: '#1F1A1D',
          light: '#3D353A',
          muted: '#5A4F56',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-crimson': '0 0 25px rgba(233, 30, 99, 0.35)',
        'glow-crimson-lg': '0 0 50px rgba(233, 30, 99, 0.45)',
        'envelope': '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(233, 30, 99, 0.15)',
        'polaroid': '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(233, 30, 99, 0.1)',
        'book': '0 22px 60px rgba(0, 0, 0, 0.75), 0 0 40px rgba(233, 30, 99, 0.15)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(233, 30, 99, 0.4), inset 0 0 8px rgba(255, 255, 255, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(233, 30, 99, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
