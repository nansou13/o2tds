const path = require('path')
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');

const o2tColorVariables = lessToJs(fs.readFileSync(path.join('src/styles/o2tColor.less'), 'utf8'));
const antdOverrideVariables = lessToJs(fs.readFileSync(path.join('src/styles/antdOverride.less'), 'utf8'));
const themeVariables = { ...o2tColorVariables, ...antdOverrideVariables };

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        
      },
      {
        test: /\.less$/,
        exclude: [/theme\.less/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: false,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
                  ],
                  flexbox: 'no-2009',
                }),
              ],
              sourceMap: false,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: false,
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: themeVariables,
              }
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              sourceMap: false,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
}