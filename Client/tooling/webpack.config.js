var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Saasify = require('./Saasify');
module.exports = {

  //  Defines the entrypoint of our application.
  entry: path.resolve(__dirname, '../src/app.js'),

  //  Bundle to a ./build/public/bundle.js file.
  output: {
    path: path.resolve(__dirname, '../../'),
    filename: 'bundle.js'
  },

  //  Use babel for anything that is *.js or *.jsx.
  module: {
    loaders: [
      {
        test: /\.jsx?$/,      
        loader: 'babel?presets[]=react,presets[]=es2015',
        include: path.resolve(__dirname, '../src')
      } 
    ]
  },
  watch:process.argv.indexOf('-p') === -1,
  //  Configure the plugins. We copy the index.html
  //  file to the build folder.
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../index.html'),
      inject: 'body' // Inject webpack scripts into the body.
    }),
    new Saasify(module.exports)
  ]
};