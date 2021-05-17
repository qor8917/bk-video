const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://3.35.221.170:5000',
      changeOrigin: true,
    })
  );
};
