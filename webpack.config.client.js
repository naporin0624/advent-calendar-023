/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: ['./client/App.tsx', 'babel-polyfill'],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [{
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
        }, ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        type: 'javascript/auto',
        use: [{
          loader: 'json-loader',
        }, ],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
        }, ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          name: 'vendor',
          enforce: true,
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(process.cwd(), 'public/index.html'),
    }),
  ],
  output: {
    filename: 'js/[name]-[hash].js',
    path: path.join(__dirname, 'dist/public'),
    publicPath: '/',
  },
};