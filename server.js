// server.js
const http = require('http');
const url = require('url');
const { middlewares, applyMiddlewares } = require('./middleware');
const handleDynamicRoutes = require('./dynamicRoutes');
const handleStaticFiles = require('./staticFiles');

const port = 3000;

// Centralized error handler
const errorHandler = (err, req, res) => {
  console.error(err);
  res.statusCode = 500;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Internal Server Error');
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const cleanPathname = pathname === '/' ? 'index' : pathname.replace(/^\/|\/$/g, '');

  try {
    applyMiddlewares(req, res, middlewares, () => {
      try {
        if (!handleDynamicRoutes(req, res, cleanPathname)) {
          handleStaticFiles(req, res, cleanPathname);
        }
      } catch (err) {
        errorHandler(err, req, res);
      }
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
  });

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

