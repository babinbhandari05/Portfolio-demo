/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#05070f',
          card: '#0c1122',
          surface: '#11182e',
          border: 'rgba(56, 189, 248, 0.15)',
          neonBlue: '#00f0ff',
          neonPurple: '#a855f7',
          neonPink: '#f43f5e',
          neonGreen: '#10b981',
          neonAmber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'reverse-spin': 'reverse-spin 25s linear infinite',
        'scanline': 'scanline 8s linear infinite',
        'radar': 'radar 4s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.6))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'reverse-spin': {
          'from': { transform: 'rotate(360deg)' },
          'to': { transform: 'rotate(0deg)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      backgroundImage: {
        'cyber-gradient': 'radial-gradient(ellipse at 50% 0%, rgba(120, 119, 198, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
        'grid-pattern': "radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 0)",
      }
    },
  },
  plugins: [],
}
