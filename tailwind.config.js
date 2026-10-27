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
          void: "#03060E",
          midnight: "#050916",
          navy: "#081023",
          deep: "#0B1630",
          surface: "#101D3D",
          card: "#091226",
          border: "rgba(245, 196, 81, 0.18)",
          gold: "#F5C451",
          goldLight: "#FDE047",
          goldMuted: "#B88E28",
          cyan: "#22D3EE",
          magenta: "#F43F5E",
          lime: "#CCFF00",
        }
      },
      fontFamily: {
        headline: ['"Syne"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 35px -5px rgba(245, 196, 81, 0.35)',
        'cyan-glow': '0 0 35px -5px rgba(34, 211, 238, 0.35)',
        'magenta-glow': '0 0 35px -5px rgba(244, 63, 94, 0.35)',
        'card-elevated': '0 20px 50px -15px rgba(0, 0, 0, 0.9)',
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'marquee-reverse': 'marquee-reverse 28s linear infinite',
        'marquee-fast': 'marquee 16s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      }
    },
  },
  plugins: [],
}
