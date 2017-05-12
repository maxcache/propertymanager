const util = require('./util');
module.exports = {
    entry: {
        main: './src/scripts/index.ts'
    },
    output: {
        filename: "[name].js",
    },
    module: {
        loaders: [{
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'. 
            test: /\.tsx?$/,
            exclude: [
                util.root('dist'),
            ],
            loader: "awesome-typescript-loader"
        }]
    },
}