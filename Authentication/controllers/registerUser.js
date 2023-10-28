const bcrypt = require('bcrypt');
const fsPromises = require('fs/promises');
const path = require('path');
const userDb = {
  users: require('../userDb/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const registerNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    return res
      .status(400)
      .json({ success: false, errMsg: 'All Field Are Required' });
  }

  const checkDuplicateUser = userDb.users.find(
    (person) => person.userName === user
  );
  if (checkDuplicateUser) {
    return res
      .status(400)
      .json({ success: false, errMsg: 'username already taken' });
  }

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = { userName: user, password: hashedPwd };

    userDb.setUsers([...userDb.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, '..', 'logs', 'users.txt'),
      JSON.stringify(userDb.users)
    );
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'userDb', 'users.json'),
      JSON.stringify([...userDb.users])
    );
    res.status(200).json({ success: true, message: 'account created...' });
  } catch (err) {
    res.status(400).json({ success: false, errMsg: err });
  }
};

module.exports = { registerNewUser };
