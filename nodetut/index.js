const express = require('express');
const app = express();
const path = require('path');
const users = require('./users');
const PORT = 5000;
console.log(path.join(__dirname, 'public', 'pages'));
app.use(express.static('./public/pages'));
app.use(express.urlencoded({ extended: false }));
// const user = (req, res, next) => {
//   console.log(req.query);
//   const { user } = req.query;
//   console.log(user);
//   if (user) {
//     next();
//   } else {
//     res.status(401).json([{ success: false, message: 'Unauthorized' }]);
//   }
// };

// app.use(user);

app.get('/api', (req, res) => {
  res.send(
    `<h1>Home<h1/>
        <a href="/products">Products</a>
        `
  );
});

app.post('/login', (req, res) => {
  const { name } = req.body;
  res.send(`your form has been submitted ${name}`);
  console.log(req.body.name);
  console.log(req.body);
});

app.get('/products/query', (req, res) => {
  console.log(req.query);
  const { search } = req.query;
  let newUsers = [...users];
  if (search) {
    newUsers = newUsers.filter((users) => {
      return users.name.toLowerCase().startsWith(search.toLowerCase());
    });
  }

  return res.json([{ status: true, data: newUsers }]);
});
app.get('/products/v1/query', (req, res) => {
  console.log(req.query);
  console.log(req.query.search);

  res.send('hello world');
});

app.listen(PORT, () => console.log(`app listening at port ${PORT}`));
