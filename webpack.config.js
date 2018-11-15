const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    context: path.resolve(__dirname, 'src'),

    entry: {
      main: './scripts/main'
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist')
    },

    resolve: {
      extensions: ['.js', '.css']
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: !isProd,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: () => isProd
                  ? [require('postcss-preset-env')({features: {'nesting-rules': true}}), require('cssnano')()]
                  : [require('postcss-preset-env')({features: {'nesting-rules': true}})]
              }
            }
          ]
        }
      ]
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      hot: !isProd
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack template',
        template: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};