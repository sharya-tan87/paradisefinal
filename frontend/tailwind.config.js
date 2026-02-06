/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors ONLY - Three-color system
        'brand': {
          light: '#CEE0F3',   // Light Blue - section backgrounds, cards, dividers, icon containers
          DEFAULT: '#2D7C9C', // Teal Blue - icons, subheadings, hover states, primary buttons
          dark: '#214491',    // Deep Navy - headings, main nav, button hover states
        },
        // Mapped primary colors for compatibility
        'primary': {
          50: '#F5FAFD',
          100: '#CEE0F3',
          200: '#A8D4EB',
          300: '#82C8E3',
          400: '#58BCDB',
          500: '#2D7C9C',
          600: '#2A6E99',
          700: '#276096',
          800: '#245293',
          900: '#214491',
          950: '#0F2248',
        },
        'white': '#FFFFFF',
        'text-secondary': '#4B5563', // Dark Grey for paragraphs
        // Note: Use brand colors with opacity for status states
        // Success: bg-brand text-white
        // Warning: bg-brand-light text-brand-dark border-brand
        // Error: bg-brand-dark text-white
      },
      fontFamily: {
        'prompt': ['Prompt', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 12px rgba(33, 68, 145, 0.08)',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      }
    }
  },
  plugins: [],
}
