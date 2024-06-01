const layout = require('./layout');

module.exports = (req, res) => {
  const content = `
    <h2>About Page</h2>
    <p>This is the about page.</p>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.end(layout(content));
};
