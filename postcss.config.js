export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  // Exclude node_modules CSS files from PostCSS processing
  exclude: [
    /node_modules/
  ]
}