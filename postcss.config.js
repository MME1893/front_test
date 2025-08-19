module.exports = {
  plugins: [
    require('tailwindcss'),  // Don't use @tailwindcss/postcss here, just `tailwindcss`
    require('autoprefixer'),
  ],
}
