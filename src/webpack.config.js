var path = require('path');
var config = require('./config');
var webpack = require("webpack");


module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: [
            config.webpack.mainEntry
        ]
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'imports'
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015']
            }
        }, {
            test: /jquery\.js$/,
            loader: 'expose?$'
        }, {
            test: /jquery\.js$/,
            loader: 'expose?jQuery'
        }]
    },
    output: {
        path: path.join(__dirname, '../js'),
        filename: '[name].js'
    }
}
