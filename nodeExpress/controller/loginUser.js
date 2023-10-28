const fsPromises = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const userDb = {
  users: require('../data/user.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(401).json({ message: 'All field are required' });
  }
  const checkUser = userDb.users.find((person) => person.username === user);
  if (!checkUser) {
    return res.status(401).json({ Message: 'user not found' });
  }
  const checkPwd = await bcrypt.compare(password, checkUser.password);

  if (checkPwd) {
    return res.status(200).json({ message: 'logged in...' });
  } else {
    return res.status(401).json({ message: 'incorrect login detail' });
  }
};

module.exports = { handleLogin };
