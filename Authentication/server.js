const express = require('express');
const app = express();
const router = require('./routes/routes');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);

app.listen(3000, () => console.log('server running'));
