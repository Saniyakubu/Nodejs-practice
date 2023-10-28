const bcrypt = require('bcrypt');
const { createUserToken } = require('./JWT');
const userDb = {
  users: require('../userDb/users.json'),
  setUsers: function (data) {
    this.users = data;
  },
};

const loginUser = async (req, res) => {
  console.log(req.user, 4);
  console.log(req.userName, 5);
  const { user, password } = req.body;
  if (!user || !password) {
    return res
      .status(400)
      .json({ success: false, errMsg: 'All Field Are Required' });
  }
  const checkUser = userDb.users.find((person) => person.userName === user);
  console.log(checkUser.userName, 1);
  if (!checkUser) {
    return res.status(401).json({ success: false, errMsg: 'user not found' });
  }
  const checkUserPwd = await bcrypt.compare(password, checkUser.password);
  if (!checkUserPwd) {
    return res
      .status(401)
      .json({ success: false, errMsg: 'incorrect details' });
  }

  const accessToken = createUserToken({ user: checkUser.userName });
  res.cookie('access-token', accessToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({ success: true, errMsg: 'logged in..' });
};

module.exports = { loginUser };
