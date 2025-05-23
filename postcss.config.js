export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  // Exclude node_modules from PostCSS processing to avoid syntax errors
  content: {
    files: ['./src/**/*.{html,js,jsx,ts,tsx}', './index.html'],
    extract: false
  }
}