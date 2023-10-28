const users = require('../users/data');
const getAllUsers = (req, res) => {
  console.log(req.user, 'all');
  res.status(200).json({ success: true, data: users });
};

module.exports = { getAllUsers };
