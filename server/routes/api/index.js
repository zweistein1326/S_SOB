const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var router = require('express').Router();
var users = require('../../database/users');
const e = require('express');

const TOKEN_KEY = process.env.TOKEN_KEY;

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  users.getUserByEmail(email).then(user => {
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
        console.log({
          user,
          status: 'success',
          token: token,
          message: '',
        })
        console.log('successful login')
        return res.json({
          user,
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
          user: null
        });
      }
    })
  })
});

router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;

  if (await users.getUserByEmail(email))
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


router.get('/user/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await users.getUserById(id);
    console.log(user);
    return res.json({ user: user })
  }
  catch (error) {
    console.log(error)
  }
})

module.exports = router;
