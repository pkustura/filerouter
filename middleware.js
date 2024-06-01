// middleware.js
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

const applyMiddlewares = (req, res, middlewares, callback) => {
  let index = 0;

  const next = () => {
    if (index < middlewares.length) {
      middlewares[index++](req, res, next);
    } else {
      callback();
    }
  };

  next();
};

module.exports = { middlewares, applyMiddlewares };

