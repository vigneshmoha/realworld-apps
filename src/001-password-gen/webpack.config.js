const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    devServer: {
        port: 8080
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    optimization: {
      splitChunks: {
       cacheGroups: {
        vendor: {
         test: /node_modules/,
         chunks: 'initial',
         name: 'vendor',
         enforce: true
        },
       }
      } 
     },
    module:{
        rules: [
            {
                test: /\.(scss)$/,
                use: [
                  {
                    // Adds CSS to the DOM by injecting a `<style>` tag
                    loader: 'style-loader'
                  },
                  {
                    // Interprets `@import` and `url()` like `import/require()` and will resolve them
                    loader: 'css-loader'
                  },
                  {
                    // Loader for webpack to process CSS with PostCSS
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                          plugins: [
                            [
                              autoprefixer()
                            ],
                          ],
                        },
                    },
                  },
                  {
                    // Loads a SASS/SCSS file and compiles it to CSS
                    loader: 'sass-loader'
                  }
                ]
            },
            {
              test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
              use: [
                  {
                      loader: 'file-loader?name=assets/fonts/[name].[ext]'
                  }
              ]
            },
            {
              test: /\.(png|jpe?g|gif)$/i,
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
              },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
        new CopyWebpackPlugin({
          patterns: [
            { from: './src/assets/images', to: 'assets/images' }
          ]
        })
    ]
};