const { sign } = require('jsonwebtoken');

const createUserToken = ({ user }) => {
  console.log(user, 2);
  const accessToken = sign(
    { userName: user },
    '4cac48d8ead5f350e9c43cfbbf2d6e3e24e1c8708c9aa909a81741eddf634b480a52ce423d273fdb4145ca67f8ec36c5601eb0cfb80101102c06c38a',
    {
      expiresIn: '30s',
    }
  );
  return accessToken;
};

module.exports = { createUserToken };
