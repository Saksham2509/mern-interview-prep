export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        background: 'var(--background-color)',
        surface: 'var(--surface-color)',
        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        error: 'var(--error-color)',
        border: 'var(--border-color)',
        success: 'var(--success-color)',
        warning: 'var(--warning-color)',
      },
    },
  },
  plugins: [],
}
