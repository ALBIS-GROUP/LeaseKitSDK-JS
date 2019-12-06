const path = require('path');

module.exports = ['source-map'].map((devtool) => ({
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'albis-leasing-sdk.js',
    library: 'albis-leasing-sdk',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  devtool,
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
    axios: {
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios',
      root: 'axios',
    },
  },
}));
