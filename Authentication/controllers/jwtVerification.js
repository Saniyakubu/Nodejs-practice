const { verify } = require('jsonwebtoken');

const verifyUserToken = (req, res, next) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    return res.status(400).json({ error: 'user is not authenticated' });
  }
  try {
    const validate = verify(
      accessToken,
      '4cac48d8ead5f350e9c43cfbbf2d6e3e24e1c8708c9aa909a81741eddf634b480a52ce423d273fdb4145ca67f8ec36c5601eb0cfb80101102c06c38a'
    );
    console.log(validate, 3);
    if (validate) {
      console.log(validate.userName, '9');
      req.user = validate;
      return next();
    } else {
      res
        .status(400)
        .json({ success: false, errMsg: 'user is not authenticated' });
      return next();
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

module.exports = { verifyUserToken };
