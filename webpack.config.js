const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/frontend/main.js',

  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: 'bundle.js'
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),  // Corrigido para refletir a estrutura correta
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        }
      }, 
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/img' // Ajustar se necessário
          }
        }
      }
    ]
  },
  devtool: 'source-map'
};
