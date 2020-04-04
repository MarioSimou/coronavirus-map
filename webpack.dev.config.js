const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|png|jpe?g)$/,
        loader: 'file-loader'
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