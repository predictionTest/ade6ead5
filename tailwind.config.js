/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Oceanic primary palette (used by existing `primary-*` utilities)
        primary: {
          50: '#E1F5FE',
          100: '#B3E5FC',
          200: '#81D4FA',
          300: '#4FC3F7',
          400: '#29B6F6',
          500: '#03A9F4', // ocean blue
          600: '#039BE5',
          700: '#0288D1',
          800: '#0277BD',
          900: '#01579B',
          950: '#003C6C',
        },
        // Sunny sponge-yellow accent palette
        accent: {
          50: '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEB3B', // bright sponge yellow
          500: '#FDD835',
          600: '#FBC02D',
          700: '#F9A825',
          800: '#F57F17',
          900: '#E65100',
          950: '#BF360C',
        },
        // Additional named theme colors for custom CSS usage
        ocean: {
          50: '#E0F7FA',
          100: '#B2EBF2',
          200: '#80DEEA',
          300: '#4DD0E1',
          400: '#26C6DA',
          500: '#00BCD4',
          600: '#00ACC1',
          700: '#0097A7',
          800: '#00838F',
          900: '#006064',
        },
        sponge: {
          200: '#FFF59D',
          300: '#FFF176',
          400: '#FFEB3B',
          500: '#FDD835',
        },
        coral: {
          400: '#FF8A65',
          500: '#FF7043',
          600: '#F4511E',
        },
        sand: {
          100: '#FFF3E0',
          200: '#FFE0B2',
          300: '#FFCC80',
        },
        tealwave: {
          200: '#A5F2E9',
          400: '#4DD0E1',
          600: '#00ACC1',
        },
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'heading-wave': 'heading-wave 6s ease-in-out infinite',
        'bubble-rise': 'bubble-rise 12s linear infinite',
        'bubble-drift': 'bubble-drift 18s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'heading-wave': {
          '0%, 100%': { transform: 'skewX(0deg) translateY(0)' },
          '25%': { transform: 'skewX(-2deg) translateY(-1px)' },
          '50%': { transform: 'skewX(1.5deg) translateY(1px)' },
          '75%': { transform: 'skewX(-1deg) translateY(-1px)' },
        },
        'bubble-rise': {
          '0%': { transform: 'translateY(100%) scale(0.8)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
          '100%': { transform: 'translateY(-120%) scale(1.05)', opacity: '0' },
        },
        'bubble-drift': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(15px)' },
        },
      },
    },
  },
  plugins: [],
};
