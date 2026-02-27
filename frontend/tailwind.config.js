/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#0f172a',
        'cyber-blue': '#0ea5e9',
        'cyber-green': '#10b981',
        'cyber-red': '#ef4444',
        'cyber-purple': '#8b5cf6',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6) infinite',
        'glow': {
          '0%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.8)' },
          '50%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.6)' },
          '100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0)' },
        },
      },
    },
  },
  plugins: [],
}
