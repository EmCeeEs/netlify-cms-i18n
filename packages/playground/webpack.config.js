const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const distDir = path.join(__dirname, 'dist')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.join(__dirname, 'src/index.tsx'),
  output: {
    path: distDir,
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new HtmlPlugin(),
    new CopyPlugin([
      {
        from: path.join(__dirname, './static/**/*'),
        to: path.join(distDir, '/[name].[ext]'),
      },
    ]),
  ],
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 9000,
  },
}
