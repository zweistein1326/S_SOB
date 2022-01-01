const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var router = require('express').Router();
var users = require('../../database/users');
var credentials = require('../../database/credentials');
var cards = require('../../database/cards');
const { v4: uuidv4 } = require('uuid');
const Web3 = require('web3');
const { generateHash } = require('../../functions/HelperFunctions');
const { randomUUID, publicDecrypt, verify, generateKeyPair } = require('crypto');
var CryptoJS = require('crypto-js');

const web3 = new Web3('HTTP://127.0.0.1:7545');

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

const TOKEN_KEY = process.env.TOKEN_KEY;
let account;
let contract;


router.post('/login', async (req, res, next) => {
  console.log('login');
  // await initAccount();
  const { username, password } = req.body;

  // fetch users from the blockchain and cross reference information to login

  // const userFound = await contract.methods.getUser(email, password).send({ from: account });
  // console.log(userFound);

  users.getUserByUsername(username).then(async user => {
    if (user == null) {
      return res.json({
        status: 'failed',
        token: '',
        message: 'No user with that username',
      });
    }

    // try {
    //   // await contract.methods.addUser(3).send({ from: account[0] });
    //   const userCount = await contract.methods.userCount().call({ from: account });
    //   const user = await contract.methods.users(1).call({ from: account });
    //   console.log(userCount);
    //   console.log(user);
    //   // const userCount = await methods;
    //   // console.log(userCount);
    //   // return
    // } catch (e) {
    //   console.log(e);
    //   // return;
    // }


    const token = jwt.sign(user.id, TOKEN_KEY, { algorithm: 'HS256' });

    bcrypt.compare(password, user.password).then(passwordMatch => {
      if (passwordMatch) {
        // console.log({
        //   user,
        //   status: 'success',
        //   token: token,
        //   message: '',
        // })
        // console.log('successful login')
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
  // initAccount();
  const { username, email, password } = req.body;

  if (await users.getUserByEmail(email))
    return res.json({
      status: 'failed',
      user: null,
      message: 'email already registered',
    });

  if (await users.getUserByUsername(username)) {
    return res.json({
      status: 'failed',
      user: null,
      message: 'username already in user'
    })
  }



  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let publicKey = null;
    let privateKey = null;
    // generateKeyPair('rsa', {
    //   modulusLength: 530,    // options
    //   publicExponent: 0x10101,
    //   publicKeyEncoding: {
    //     type: 'spki',
    //     format: 'der'
    //   },
    //   privateKeyEncoding: {
    //     type: 'pkcs8',
    //     format: 'der',
    //   }
    // }, async (err, pubKey, privKey) => { // Callback function
    //   if (!err) {
    //     // Prints new asymmetric key pair
    //     publicKey = pubKey.toString('hex');
    //     privateKey = privKey.toString('hex');
    //   }
    //   else {
    //     // Prints error
    //     console.log("Errr is: ", err);
    //   }
    // });
    const user = {
      id: uuidv4({ username, email, password }),
      username,
      email,
      password: hashedPassword,
    }

    // const token = jwt.sign(user.id, TOKEN_KEY, { algorithm: 'HS256' });

    await users.create(user);

    // gasestimate = await contract.methods.addUser(user.id, user.email, user.password).estimateGas({ from: account })
    // console.log(gasestimate);
    // add user to users list and update on blockchain

    return res.json({
      status: 'success',
      user,
      message: '',
    });
  }
  catch (err) {
    console.error(err);
  }
});


router.get('/user/:id', async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  try {
    const user = await users.getUserById(id);
    // console.log(user);
    return res.json({ user: user })
  }
  catch (error) {
    console.log(error)
  }
})

router.post('/addCredential', async (req, res, next) => {
  const { title, value, issuerId, receiverId, hash, signature } = req.body;
  const id = randomUUID(); // generate id according to hash
  const credential = { ...req.body, id, iat: Date.now().toString(), pending: true };
  //verify credential signature

  const hashFromSignature = CryptoJS.AES.decrypt(signature, privateKey);

  try {
    credentials.create(credential);
    return res.json({ status: 'success', credential, message: 'credential verified' })
  } catch (error) {
    return res.json({ status: 'failed', credential: null, message: error.message });
  }

  // const verifySign = verify("sha256", Buffer.from(hash), { key: publicKey }, signature);
  // console.log(verifySign);
  // verify credential hash

  // if (hash == checkHash) {
  //   console.log('hash verified');
  // } else {
  //   console.log('hash verification failed');
  // }
})

router.post('/requestCredential', (req, res, next) => {
  const { id, message } = req.body;
  console.log(req.body);
  try {
    return res.json({ status: 'success', message: 'request successful' })
  } catch (err) {
    return res.json({ status: 'failed', message: error.message })
  }

})


router.post('/updateCredentialPendingStatus', async (req, res, next) => {
  const { id, ownerId } = req.body
  const status = credentials.updateCredentialPendingStatus(id, ownerId);
  if (status) {
    return res.json({ status: 'success' })
  } else {
    return res.json({ status: 'failed' })
  }
})

router.post('/updateCredentialStatus', async (req, res, next) => {
  const { id, ownerId } = req.body
  const status = credentials.updateCredentialStatus(id, ownerId);
  if (status) {
    return res.json({ status: 'success' })
  } else {
    return res.json({ status: 'failed' })
  }
})


router.post('/createCard/:userId', async (req, res, next) => {
  const { userId } = req.params;
  const card = req.body;
  const cardId = uuidv4(req.body);
  card.id = cardId;
  const newCard = cards.createCard(userId, card);
  if (newCard !== null) {
    return res.json({
      status: 'success',
      newCard,
      message: 'card created'
    })
  }
  else {
    return res.json({
      status: 'failure',
      newCard: null,
      message: 'failed to create card'
    })
  }
});

router.get('/cards/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const userCards = await cards.getCardsForUser(userId);
    return res.json({ status: 'success', cards: userCards, message: 'request successful' })
  }
  catch (e) {
    console.log(e);
    return res.json({ status: 'failed', cards: null, message: e.message });
  }
})

router.get('/card/:cardId', async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await cards.getCardById(cardId);
    console.log(card);
    return res.json({ status: 'success', card: card, message: 'request successful' })
  }
  catch (e) {
    console.log(e);
    return res.json({ status: 'failed', card: null, message: e.message });
  }
})


module.exports = router;
