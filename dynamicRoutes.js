// dynamicRoutes.js
const dynamicRoutes = {
  '^/user/(?<id>\\d+)$': (req, res, params) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end(`User ID: ${params.id}`);
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

