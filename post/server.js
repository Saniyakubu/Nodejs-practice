const express = require('express');
const router = require('./routes/router');
const app = express();
require('dotenv').config();
const connectMongoDb = require('./config/db');

const PORT = process.env.PORT || 5000;

connectMongoDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/people', router);

app.get('/api/people', (req, res) => {
  return res.json({ success: true, name: 'text' });
});

app.post('/api/people', (req, res) => {
  console.log(req.body);

  const text = req.body.text;

  if (!text) {
    return res
      .status(404)
      .json({ success: false, error: 'something Went Wrong' });
  }
  return res.json({ success: true, name: text });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}....`);
});
