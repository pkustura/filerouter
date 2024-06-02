const layout = require('../layout');

module.exports = (req, res) => {
  const content = `
    <h2>Index</h2>
    <p>This is the test page.</p>
    <a href="/about/">about page</a>
  `;
  res.setHeader('Content-Type', 'text/html');
  res.end(layout(content));
};

