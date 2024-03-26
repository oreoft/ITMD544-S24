const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 4002,
    allowedHosts: 'all',
    host: '0.0.0.0'
  },
})
