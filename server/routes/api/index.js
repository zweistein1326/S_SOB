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
        console.log('successful login')
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

router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;

  if (await users.get({ email: email }))
    return res.json({
      status: 'failed',
      token: '',
      message: 'email already registered',
    });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword
    }

    const token = jwt.sign(user.id, TOKEN_KEY, { algorithm: 'HS256' });
    await users.create(user);

    return res.json({
      status: 'success',
      token: token,
      message: '',
    });
  }
  catch (err) {
    console.error(err);
  }
});

module.exports = router;
