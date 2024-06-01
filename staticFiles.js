// staticFiles.js
const fs = require('fs');
const path = require('path');

const handleStaticFiles = (req, res, cleanPathname) => {
  const filePath = path.join(__dirname, 'pages', `${cleanPathname}.js`);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (!err) {
      const page = require(filePath);
      page(req, res);
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Page not found');
    }
  });
};

module.exports = handleStaticFiles;
