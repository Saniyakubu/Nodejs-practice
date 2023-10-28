const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
  console.log(req.method);
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/new-page(.html)?', (req, res) => {
  console.log(req.method);
  res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

router.get('/subdir/index(.html)?', (req, res) => {
  console.log(req.method);
  res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

router.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

module.exports = router;
