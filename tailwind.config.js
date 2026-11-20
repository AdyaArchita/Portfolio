/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic design tokens — map to CSS variables defined in styles.css
        bg:           'rgb(var(--color-bg) / <alpha-value>)',
        surface:      'rgb(var(--color-surface) / <alpha-value>)',
        primary:      'rgb(var(--color-text) / <alpha-value>)',
        muted:        'rgb(var(--color-muted) / <alpha-value>)',
        accent:       'rgb(var(--color-accent) / <alpha-value>)',
        'accent-muted': 'rgb(var(--color-accent-muted) / <alpha-value>)',
        border:       'rgb(var(--color-border) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
