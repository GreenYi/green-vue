module.exports = {
  publicPath: './',
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    host: 'localhost',
    port: '8081',
    https: false,
    hotOnly: false,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080/', // API服务器的地址
        changeOrigin: true,
        secure: false
      }
    }
  }

}
