const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
  const accessToken = sign({ username: user.username }, 'thisisjustapractice', {
    expiresIn: '30s',
  });
  return accessToken;
};

const validate = (req, res, next) => {
  const accessToken = req.cookies['access-token'];
  console.log(accessToken);

  if (!accessToken) {
    return res.status(400).json({ error: 'user is not authenticated' });
  }

  try {
    const isValidate = verify(accessToken, 'thisisjustapractice');

    if (isValidate) {
      req.user = isValidate;
      next();
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = { createToken, validate };
