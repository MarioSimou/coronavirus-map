const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build')
  },
  mode: 'production',
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
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|png|jpe?g)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      // filename: 'index.html',
      minify: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ],
  optimization: {
    minimizer: [
      new TerserJSPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  }
}