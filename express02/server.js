const express = require('express');
const app = express();
require('dotenv').config();
const router = require('./router/router');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome to ideas app');
});

app.use('/api/ideas', router);

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
