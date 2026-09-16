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
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--color-surface-2) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        'border-strong': 'rgb(var(--color-border-strong) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'text-tertiary': 'rgb(var(--color-text-tertiary) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          light: '#ef4444',
          soft: 'rgb(var(--color-accent-soft) / <alpha-value>)',
          muted: '#fca5a5',
        },
        success: {
          DEFAULT: '#15803d',
          light: '#16a34a',
          soft: 'rgb(var(--color-success-soft) / <alpha-value>)',
        },
        warning: {
          DEFAULT: '#b45309',
          soft: 'rgb(var(--color-warning-soft) / <alpha-value>)',
        },
        info: {
          DEFAULT: '#1d4ed8',
          soft: 'rgb(var(--color-info-soft) / <alpha-value>)',
        },
        japanese: {
          red: 'rgb(var(--color-accent) / <alpha-value>)',
          ink: 'rgb(var(--color-text-primary) / <alpha-value>)',
          paper: 'rgb(var(--color-background) / <alpha-value>)',
          muted: 'rgb(var(--color-text-tertiary) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
        japanese: ['"Noto Sans JP"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'japanese-sm': ['0.875rem', { lineHeight: '1.8' }],
        'japanese-base': ['1rem', { lineHeight: '2' }],
        'japanese-lg': ['1.125rem', { lineHeight: '2' }],
        'japanese-xl': ['1.25rem', { lineHeight: '1.8' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        68: '17rem',
        72: '18rem',
        80: '20rem',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)',
        'card-active': '0 0 0 2px #b91c1c',
        panel: '0 2px 8px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
        'bounce-gentle': 'bounceGentle 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
      transitionTimingFunction: {
        'ease-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
