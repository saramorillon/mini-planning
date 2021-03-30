const path = require('path')

module.exports = {
  entry: 'src/index',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [{ loader: 'ts-loader', options: { compiler: 'ttypescript', configFile: 'tsconfig.build.json' } }],
        },
      ],
    },
  },
}
