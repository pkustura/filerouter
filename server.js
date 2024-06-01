// server.js
const http = require('http');
const url = require('url');
const { middlewares, applyMiddlewares } = require('./middleware');
const handleDynamicRoutes = require('./dynamicRoutes');
const handleStaticFiles = require('./staticFiles');

const port = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const cleanPathname = pathname === '/' ? 'index' : pathname.replace(/^\/|\/$/g, '');

  applyMiddlewares(req, res, middlewares, () => {
    if (!handleDynamicRoutes(req, res, cleanPathname)) {
      handleStaticFiles(req, res, cleanPathname);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

