var path = require('path');

module.exports = {

    entry: [
        path.resolve(__dirname, 'src/main.js'),
        'webpack-dev-server/client?http://localhost:8080'
    ],

    output: {
        publicPath: 'http://localhost:8080/',
        filename: 'public/bundle.js'
    },

    debug: true,

    devtool: 'source-map',

    stats: {
        colors: true
    },

    module: {

        loaders: [
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'src')
    }

};
