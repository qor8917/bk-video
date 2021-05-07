const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://3.35.64.50/:5000',
      changeOrigin: true,
    })
  );
};
