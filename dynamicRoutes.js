// dynamicRoutes.js
const dynamicRoutes = {
  '^user/(?<id>\\d+)$': (req, res, params) => {
    try {
      // Simulate an error if the user ID is not a specific value
      if (params.id !== '123') throw new Error('Invalid user ID');
      res.setHeader('Content-Type', 'text/plain');
      res.end(`User ID: ${params.id}`);
    } catch (err) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`Bad Request: ${err.message}`);
    }
  }
};

const handleDynamicRoutes = (req, res, path) => {
  for (const [pattern, handler] of Object.entries(dynamicRoutes)) {
    const regex = new RegExp(pattern);
    const match = regex.exec(path);

    if (match) {
      handler(req, res, match.groups);
      return true;
    }
  }
  return false;
};

module.exports = handleDynamicRoutes;

