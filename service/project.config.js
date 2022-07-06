'use strict'

module.exports = {
  outputDir: 'dist',

  dev: {
    publicPath: '/',
    port: 8090,                         //本地运行端口
    allowLanBrow:false,                 //允许局域网访问
  },

  build: {
    publicPath: '/',
  },
}
