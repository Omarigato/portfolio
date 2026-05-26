/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#3B8BD4',
        'accent-dark': '#2a6aad',
        'accent-light': '#5ba3e8',
        bg: '#0a0a0a',
        surface: '#111111',
        'surface-2': '#1a1a1a',
      },
      fontFamily: {
        clash: ['"Clash Display"', 'Inter', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59,139,212,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59,139,212,0.6)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
