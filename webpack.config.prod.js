var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/useFormController.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'useFormController.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
      extensions: [ '.tsx' ]
    },
    externals: {
        'react': 'commonjs react',
    },
};
