/* eslint-env node */
const path = require('path');
const fs = require('fs');

if (fs.existsSync('./dist') === false) {
  fs.mkdirSync('./dist');
}

// copy index.html
fs.createReadStream('./app/index.html')
  .pipe(fs.createWriteStream('./dist/index.html'));

module.exports = {
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },
    historyApiFallback: {
      index: 'index.html'
    }
  },
  entry: './app/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist/')
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: 'babel-loader',
        include: [
          path.resolve(__dirname, './app')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};
