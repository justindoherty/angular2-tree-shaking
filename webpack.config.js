const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    context: path.resolve(__dirname, './src'),
    entry: {
        app: './app.ts',
        'app-aot': './app.aot.ts',
        polyfills: './polyfills.ts'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {
                        useBabel: true,
                        babelOptions: {
                            presets: [
                                ["es2015", { "modules": false }]
                            ]
                        }
                    }
                }
                ]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            beautify: false,
            output: {
                comments: false
            },
            mangle: {
                screw_ie8: true
            },
            compress: {
                screw_ie8: true,
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
        })
        
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './src'), 
        hot: false,
        publicPath: "/dist/"
    }
};