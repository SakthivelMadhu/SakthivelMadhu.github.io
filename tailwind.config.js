/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: { DEFAULT: '#00D4FF', 400: '#00D4FF', 500: '#00bcd4' },
        purple: { DEFAULT: '#8B5CF6', 400: '#a78bfa', 500: '#8B5CF6', 600: '#7c3aed' },
        pink: { DEFAULT: '#EC4899', 400: '#f472b6', 500: '#EC4899' },
        gold: { DEFAULT: '#F59E0B', 400: '#fbbf24', 500: '#F59E0B' },
        emerald: { DEFAULT: '#10B981', 400: '#34d399', 500: '#10B981' },
        dark: {
          50: '#1a1a2e',
          100: '#16213e',
          200: '#0f3460',
          900: '#0a0a0f',
          950: '#050508',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
          '50%': { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      perspective: {
        500: '500px',
        1000: '1000px',
        2000: '2000px',
      },
    },
  },
  plugins: [],
}
