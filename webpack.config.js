const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = (env) => ({
  mode: env.prod ? 'production' : 'development',
  entry: env.test
    ? ''
    : {
      SensorWidgets: './src/js/main.js',
      home: './src/js/pages/home.js',
      wizard: './src/js/pages/wizard.js',
      'meteo.apb.es': './src/js/pages/meteo.apb.es.js',
    },
  devtool: env.prod ? 'source-map' : 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: env.test ? [] : ['eslint-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/i,
        use: 'raw-loader',
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  plugins: env.test ? [] : [
    new CopyPlugin({
      patterns: [
        { from: 'src/assets' },
      ],
    }),
    new WriteFilePlugin(),
  ],
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },
});
