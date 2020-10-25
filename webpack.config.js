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

module.exports = env => {return {
  // Environment mode
  mode: 'development',

  // Entry point of app
  entry: './demo/App.js',

  output: {
    path: __dirname + '/demo',
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    // Serve index.html as the base
    contentBase: './lib',
    

    // Enable compression
    compress: true,

    // Enable hot reloading
    hot: true,

    host: host,

    port: 3000,

    // Public path is root of content base
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./demo/index.html",
      filename: "./index.html"
    })
  ]
}};
