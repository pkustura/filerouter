// layout.js
// templating example


module.exports = (content) => `
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <link rel="stylesheet" type="text/css" href="/styles.css">
</head>
<body>
  <header>
    <h1>My App</h1>
  </header>
  <main>
    ${content}
  </main>
  <footer>
    <p>&copy; 2024 My App</p>
  </footer>
</body>
</html>
`;
