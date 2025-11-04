/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
        primary: '#8b5cf6',
        secondary: '#4b5563',
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Ubuntu',
          'Cantarell',
          'Noto Sans',
          'Helvetica Neue',
          'Arial',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
          'sans-serif',
        ],
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.05)' },
        },
      },
      animation: {
        glowPulse: 'glowPulse 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
