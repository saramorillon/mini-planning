module.exports = {
  entry: 'src/index',
  plugins: [{ resolve: '@poi/plugin-typescript', options: { configFile: 'tsconfig.build.json' } }],
  devServer: { proxy: { '/api': 'http://localhost:3000', '/socket.io': 'http://localhost:3000' } },
}
