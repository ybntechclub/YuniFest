/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F6F7F9",
        cardBlue: "#2B59FF",
        cardYellow: "#FEF08A",
        cardMint: "#D1FAE5",
        cardLavender: "#EDE9FE",
        cardPink: "#FCE7F3",
        cardCream: "#FAF8F5",
        borderDark: "#0F172A",
        yuni: {
          void: "#0F172A",
          midnight: "#1E293B",
          navy: "#2563EB",
          deep: "#1D4ED8",
          surface: "#F1F5F9",
          card: "#FFFFFF",
          border: "#0F172A",
          gold: "#F59E0B",
          goldLight: "#FBBF24",
          goldMuted: "#D97706",
          cyan: "#0284C7",
          magenta: "#E11D48",
          lime: "#65A30D",
        }
      },
      fontFamily: {
        headline: ['"Syne"', 'sans-serif'],
        editorial: ['"Playfair Display"', '"Fraunces"', 'serif'],
        script: ['"Caveat"', 'cursive'],
        serifItalic: ['"Instrument Serif"', '"Playfair Display"', 'serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'clean-card': '0 2px 0 0 #0F172A',
        'solid-pop': '4px 4px 0 0 #0F172A',
        'solid-pop-lg': '6px 6px 0 0 #0F172A',
        'soft-float': '0 20px 40px -15px rgba(15, 23, 42, 0.08)',
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
