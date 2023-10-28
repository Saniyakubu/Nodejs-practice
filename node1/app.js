const http = require('http');
const { readFileSync } = require('fs');
const path = require('path');

const text = readFileSync(path.join(__dirname, 'html', 'index.html'));
const server = http.createServer((req, res) => {
  const url = req.url;
  console.log(url);
  if (url === '/') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(text);
    res.end();
  } else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write('<h1>About page<h1>');
    res.end();
  } else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.write('<h1>Page Not Found<h1>');
    res.end();
  }
});

// server.listen(5000);
