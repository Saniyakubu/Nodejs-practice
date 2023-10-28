const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/route');

app.use(express.static(path.join(__dirname, '/public')));

app.use(router);

app.get('/see', (req, res) => {
  console.log(req.method);
  res.send('send');
});

// router.get('/index.html', (req, res) => {
//   console.log(req.url);
//   res.sendFile(path.join(__dirname, 'view', 'index.html'));
// });



app.listen(5000, () => console.log('app runinng...'));
