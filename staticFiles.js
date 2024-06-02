// staticFiles.js
const fs = require('fs');
const path = require('path');


const handleStaticFiles = (req, res, cleanPathname) => {

  const resolvePath = (pathname) => path.join(__dirname, 'pages', pathname, 'index.js');
  const filePath = resolvePath(cleanPathname) || path.join(__dirname, 'pages', `${cleanPathname}.js`);  

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      try {
        const page = require(filePath);
        page(req, res);
      } catch (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Error rendering page');
      }
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Page not found');
    }
  });
};

module.exports = handleStaticFiles;
