const express = require('express');
const router = express.Router();

const { getAllUsers } = require('../controllers/getUsers');
const { registerNewUser } = require('../controllers/registerUser');
const { loginUser } = require('../controllers/loginUser');
const { verifyUserToken } = require('../controllers/jwtVerification');

router.get('/', (req, res) => {
  res.send('hello');
});

router.get('/api/users', verifyUserToken, getAllUsers);

router.post('/register', registerNewUser);
router.post('/login', loginUser);

module.exports = router;
