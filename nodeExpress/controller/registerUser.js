const fsPromises = require('fs/promises');
const path = require('path');
const bcrypt = require('bcrypt');
const userDb = {
  users: require('../data/user.json'),
  setUsers: function (data) {
    this.users = data;
  },
};
const { createToken } = require('./JWT');

const registerNewUser = async (req, res) => {
  const { user, password } = req.body;
  console.log(!user || !password, 'check');
  if (!user || !password) {
    return res.status(401).json({ message: 'All field are required' });
  }
  const duplicateUser = userDb.users.find((person) => person.username === user);

  if (duplicateUser) {
    return res
      .status(401)
      .json({ message: `username ${user} is already taken` });
  }

  try {
    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = { username: user, password: hashPwd };
    userDb.setUsers([...userDb.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'logs', 'users.txt'),
      JSON.stringify(userDb.users)
    );
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'data', 'user.json'),
      JSON.stringify([...userDb.users])
    );
    const accessToken = createToken(newUser);
    res.cookie('access-token', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(500).json({ message: 'account created...' });
    console.log([...userDb.users]);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerNewUser };
