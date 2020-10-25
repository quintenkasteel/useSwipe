const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// App directory
const appDirectory = fs.realpathSync(process.cwd());

// Gets absolute path of file within app directory
const resolveAppPath = (relativePath) =>
  path.resolve(appDirectory, relativePath);

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {
  // Environment mode
  mode: 'development',

  // Entry point of app
  entry: resolveAppPath('demo/index.js'),

  output: {
    // Development filename output
    filename: 'demo/bundle.js',
  },

  devServer: {
    // Serve index.html as the base
    contentBase: resolveAppPath('demo'),

    // Enable compression
    compress: true,

    // Enable hot reloading
    hot: true,

    host,

    port: 3000,

    // Public path is root of content base
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: resolveAppPath('demo'),
        loader: 'babel-loader',
        options: {
          presets: [require.resolve('babel-preset-react-app')],
        },
      },
    ],
  },

  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveAppPath('demo/index.html'),
    }),
  ],
};
