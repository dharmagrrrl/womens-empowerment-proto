import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4a90e2',
        secondary: '#2d1b4d',
        accent: '#ffd700',
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      animation: {
        'nebula-float': 'nebulaFloat 20s ease-in-out infinite',
        'rainbow-glow': 'rainbowGlow 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        nebulaFloat: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.1) rotate(5deg)' },
        },
        rainbowGlow: {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 1 },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};

export default config; 