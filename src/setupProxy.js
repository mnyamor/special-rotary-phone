const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://job-api.fixably.com',
            changeOrigin: true,
            secure: false
        })
    );
};
