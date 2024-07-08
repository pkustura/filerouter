// staticFiles.js
const fs = require('fs');
const path = require('path');

const handleStaticFiles = (req, res, cleanPathname) => {
  const resolvePath = (pathname) => {
    const options = [
      path.join(__dirname, 'pages', pathname, 'index.js'),
      path.join(__dirname, 'pages', `${pathname}.js`),
    ];

    for (const option of options) {
      if (fs.existsSync(option)) {
        return option;
      }
    }

    return null;
  };

  const filePath = resolvePath(cleanPathname);

  if (filePath) {
    try {
      const page = require(filePath);
      page(req, res);
    } catch (err) {
      console.error('Error rendering page:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Error rendering page');
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Page not found');
  }
};

module.exports = handleStaticFiles;
