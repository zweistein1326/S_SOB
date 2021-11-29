const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var router = require('express').Router();
var users = require('../../database/users');

const TOKEN_KEY = process.env.TOKEN_KEY;

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  users.get({ email: email }).then(user => {
    if (user == null) {
      return res.json({
        status: 'failed',
        token: '',
        message: 'No user with that email',
      });
    }

    const token = jwt.sign(user.id, TOKEN_KEY, { algorithm: 'HS256' });

    bcrypt.compare(password, user.password).then(passwordMatch => {
      if (passwordMatch) {
        return res.json({
          status: 'success',
          token: token,
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
    })
  })
});

module.exports = router;
