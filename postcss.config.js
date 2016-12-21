module.exports = {
  plugins: [
    require('postcss-input-range'),
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}