var webpack = require('webpack');
var env = process.env.NODE_ENV;

var config = {
  context: __dirname,
  entry: './src/index.jsx',
  output: {
    path: './build',
    filename: 'index.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: [__dirname + '/node_modules'],
        query: {
          presets: ['es2015', 'react'],
          cacheDirectory: true
        }
      },

      // SCSS
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader?includePaths[]=./src'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;
