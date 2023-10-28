const express = require('express');
const app = express();
const path = require('path');
const { peopleArray } = require('./data');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));
app.use(express.static(path.join(__dirname, 'public', 'js')));

// app.get('/', (req, res) => {

//   res.status(200).sendFile();
// });

app.get('/users', (req, res) => {
  const filteredArray = peopleArray.map((array) => {
    const { id, name, age, gender } = array;
    return { id, name, age, gender };
  });
  console.log(req.query);
  res.status(200).json({ success: true, data: filteredArray });
});

app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  const filteredUser = peopleArray.filter(
    (user) => user.id === Number(userId) && user
  );

  if (filteredUser.length === 0) {
    return res.status(404).json([
      { success: true },

      [
        {
          user: [],
        },
      ],
    ]);
  }

  return res.status(200).json({ success: true, data: filteredUser });
});

app.get('/users/api/query', (req, res) => {
  let { search, limit } = req.query;

  let filteredUser = [...peopleArray];

  if (search) {
    filteredUser = filteredUser.filter((user) => {
      search = search.toLocaleLowerCase();
      console.log(search);
      return user.name.toLowerCase().startsWith(search);
    });
  }
  if (limit) {
    filteredUser = filteredUser.slice(0, Number(limit));
  }

  return res.status(200).json({ success: true, data: filteredUser });
});

app.all('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(5000, () => {
  console.log('server listening...');
});
