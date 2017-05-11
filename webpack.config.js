const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        path.resolve('src/index'),
    ],
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/build/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            // {
            //     test: /\.jsx?/,
            //     // Don't use .babelrc in `yarn link`-ed dependency's directory and use in current direction instead
            //     loader: 'babel-loader?babelrc=false&extends=' + path.resolve(__dirname, '.babelrc'),
            //     exclude: path.resolve(__dirname, 'node_modules/')
            // },
            //{ test: /\.tsx?$/, include: /src/, use: 'babel-loader' },
            { test: /\.tsx?$/, include: /src/, use: 'awesome-typescript-loader?silent=false', },
            //{ test: /\.less/, include: /src/, use: ['style-loader', 'css-loader', 'less-loader'] }
            { test: /\.scss/, include: /src/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
}