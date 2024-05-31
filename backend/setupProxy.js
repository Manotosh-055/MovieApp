const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://movie-app-phi-lac.vercel.app',
      changeOrigin: true,
    })
  );
};    