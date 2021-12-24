const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const configFile = 'tsconfig.build.json'

module.exports = {
  entry: 'src/index',
  chainWebpack: (config) => {
    config.resolve.plugin('paths').use(TsconfigPathsPlugin, [{ configFile }])
  },
  plugins: [{ resolve: '@poi/plugin-typescript', options: { configFile } }],
  devServer: { proxy: { '/api': 'http://localhost:3000', '/socket.io': 'http://localhost:3000' } },
}
