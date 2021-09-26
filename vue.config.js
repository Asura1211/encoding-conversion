function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 3030
  },
  publicPath: './',
  productionSourceMap: false
};