const util = require('./util');
const { CheckerPlugin } = require('awesome-typescript-loader')
module.exports = {
    entry: {
        main: './src/scripts/main.ts',
        vendor: './src/scripts/vendor.ts',
        polyfills: './src/scripts/polyfills.ts'
    },
    output: {
        filename: "[name].js",
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                    },
                ]
            }

        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
}