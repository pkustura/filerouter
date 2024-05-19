const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Define the port
const port = 3000;

// Middleware example
const middlewares = [
  (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  },
  (req, res, next) => {
    res.setHeader('X-Custom-Header', 'CustomHeaderValue');
    next();
  }
];


// example dynamic route matching /user/123/, not /user/abc/ etc.
  const dynamicRoutes = {
  '^/user/(?<id>\\d+)$': (req, res, params) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end(`User ID: ${params.id}`);
  }
};

// Create server
const server = http.createServer((req, res) => {
	const parsedUrl = url.parse(req.url, true);
	const pathname = parsedUrl.pathname;

	// Remove trailing slash
  	const cleanPathname = pathname === '/' ? 'index' : pathname.replace(/^\/|\/$/g, '');
	
	let index = 0;


    //middleware recursion
	const next = () => {
	    if (index < middlewares.length) {
            middlewares[index++](req, res, next);
		} else {
            // main request handling logic
            // first, do dynamic routing if possible
            let matched = false;
            for (const [pattern, handler] of Object.entries(dynamicRoutes)) {
                const regex = new RegExp(pattern);
                const match = regex.exec(cleanPathname);

                if (match) {
                    matched = true;
                    handler(req, res, match.groups);
                    break;
                }
            }

            // no dynamic route branch

            const filePath = path.join(__dirname, 'pages', `${cleanPathname}.js`);

            if (!matched) {
                fs.access(filePath, fs.constants.F_OK, (err) => {
                    if (!err) {
                        const page = require(filePath);
                        page(req, res);
                    } else {
                        res.statusCode = 403;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end('Page not found');
                    }
                });
            }
	    }
    }
    
    next();

});




// Start server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
