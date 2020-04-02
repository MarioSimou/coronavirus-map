const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, 'src','index.html'),
      filename: 'index.html'
    })
  ],
  resolve: {
    alias: {
      "src": path.resolve(__dirname, 'src')
    }
  }
}