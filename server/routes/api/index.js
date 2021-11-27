const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var router = require('express').Router();
const { getAllUsers } = require('../../database');

const TOKEN_KEY = process.env.TOKEN_KEY;

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  let user = getAllUsers().find(user => user.email == email);

  if (user == null) {
    return res.json({
      status: 'failed',
      token: '',
      message: 'No user with that email',
    });
  }

  const token = jwt.sign(user.id,
    TOKEN_KEY, {
    algorithm: 'HS256',
  })
  user.token = token

  try {
    if (await bcrypt.compare(password, user.password)) {
      return res.json({
          status: 'success',
          token: user.token,
          message: '',
      });
    }
    else {
      res.json({
        status: 'failed',
        token: '',
        message: 'Password incorrect',
      });
    }
  } catch (e) {
    console.error(e)
  }
})

module.exports = router;
