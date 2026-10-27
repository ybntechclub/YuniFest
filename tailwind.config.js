/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yuni: {
          midnight: "#07152F",
          navy: "#0A1B3B",
          deep: "#0D2345",
          surface: "#112C57",
          card: "#0C1F3F",
          gold: "#F5C451",
          goldLight: "#FDE047",
          goldMuted: "#B88E28",
          cyan: "#06B6D4",
          magenta: "#EC4899",
        }
      },
      fontFamily: {
        display: ['"Cinzel"', '"Cabinet Grotesk"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(245, 196, 81, 0.25)',
        'cyan-glow': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
        'magenta-glow': '0 0 25px -5px rgba(236, 72, 153, 0.25)',
        'card-elevated': '0 10px 30px -10px rgba(7, 21, 47, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
