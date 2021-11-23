if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express');
// const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const passport = require('passport');
// const localSystem = require('passport-local');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const { getAllUsers, writeUserData, updateUserData } = require('./database');
const jwt = require('jsonwebtoken');
// const auth = require("./isAuthenticated");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const { Blockchain, Block, Transaction, findUserById } = require('./blockchain');


var users = [];

// const blockchain = new Blockchain();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control_Allow-Headers', "x-access token, Origin, Content-Type, Accept");
    res.setHeader("x-access-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTYzNjQ5MTkyNzA5MiIsImVtYWlsIjoiY0BjIiwiaWF0IjoxNjM2NDkxOTI3LCJleHAiOjE2MzY0OTkxMjd9.3nKmcqEh9NSx8qLX-OaVjOqIeTSBFk4BjQxELrQf1O4");
    next();
})

const oneDay = 5 * 60 * 60 * 1000; // 1 hour

const blockchain = new Blockchain();

app.use(sessions({
    secret: 'letssaythisisthesecretofjumanji',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.json());
app.use(cookieParser());

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // console.log('token', token);
        // if (!token) {
        //     return res.status(403).send("A token is required for authentication");
        // }
        // try {
        //     const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        //     req.user = decoded;
        // } catch (err) {
        //     return res.status(401).send("Invalid Token");
        // }
        next();
    }
    else {
        res.redirect('/login');
    }
}

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // const token = req.body.token || req.query.token || req.headers['x-access-token'];
        // console.log('token', token);
        // if (!token) {
        //     return res.status(403).send("A token is required for authentication");
        // }
        // try {
        //     const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        //     req.user = decoded;
        // } catch (err) {
        //     console.log(err);
        //     return res.status(401).send("Invalid Token");
        // }
        res.redirect('/');
    }
    else {
        next();
    }
}

const getUsersFromDb = async () => {
    setTimeout(() => {
        users = getAllUsers();
        // console.log(users);
    }, 1000);

    // console.log('users', users);
}

getUsersFromDb().then(() => {
    initializePassport(
        passport,
        email => users.find(user => user.email == email),
        id => users.find(user => user.id == id)
    )
});

var sessionToken;

app.get('/', (req, res) => {
    sessionToken = req.session;
    if (sessionToken.userId && sessionToken.token) {
        let user = getUserById(sessionToken.userId);
        // console.log(sessionToken.userId);
        res.render('index.ejs', { username: user.username });
    }
    else {
        res.render('login.ejs');
    }

})


app.get('/login', checkNotAuthenticated, (req, res) => {
    console.log(req.session);
    if (!!req.session.sessionToken) {
        res.redirect('/');
    } else {
        res.render('login.ejs');
    }

})

app.get('/register', checkNotAuthenticated, (req, res) => {
    if (req.session.sessionToken) {
        res.redirect('/');
    } else {
        res.render('register.ejs');
    }
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // users.push(newUser);
        let newUser = {
            id: Date.now().toString(),
            username,
            email,
            password: hashedPassword
        }

        const token = jwt.sign(newUser.id, process.env.TOKEN_KEY, { algorithm: 'HS256' })
        newUser = { ...newUser, token }

        await writeUserData(newUser);

        getAllUsers();

        // const transaction = new Transaction('create', newUser.id);
        // const currentBlock = blockchain.getCurrentBlock();
        // currentBlock.addToBlock(transaction);
        // await blockchain.mineBlock();
        res.redirect('/login');
    }
    catch (e) {
        console.log(e);
        res.redirect('/register');
    }
    // console.log(users);
})
// app.post('/login', passport.authenticate('local', {
//     successRedirect: '/',
//     failureFlash: true
// }))

const getUserByEmail = (email) => users.find(user => user.email == email)
const getUserById = (id) => users.find(user => user.id == id)

app.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    let user = getUserByEmail(email);

    console.log(user);

    const token = jwt.sign(user.id,
        process.env.TOKEN_KEY, {
        algorithm: 'HS256',
    })
    user.token = token
    if (user == null) {
        return done(null, false, { message: 'No user with that email' });
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            sessionToken = req.session;
            sessionToken.userId = user.id;
            sessionToken.token = user.token;
            // return done(null, user)
            res.redirect('/');
        }
        else {
            console.log('password incorrect');
            // return done(null, false, { message: 'Password incorrect' })
        }
    } catch (e) {
        console.log(e)
        // return done(e)
    }
})

app.post('/users', (req, res) => {
    const { firstname, lastname, email, address } = req.body;
    const token = sessionToken.token;
    if (token) {
        updateUserData(sessionToken.userId, { firstname, lastname, address });

        res.redirect('/')
    }
    else {
        throw Error('Use not authorized')
    }
})

app.post('/connect', (req, res) => {
    let token;
    console.log(req.body.button);
    console.log('sending request for connection');
    //send connection request to Youtube.com

    console.log('start connection');
    // receive affirm or negative on connection request from Youtube.com

    console.log('generate and send session token');
    if (sessionToken) {
        token = jwt.sign({ userId: sessionToken.userId }, req.body.button, { algorithm: 'HS256' })
        res.redirect(`https://www.${req.body.button}.com`);
    }
    else {
        res.redirect('/');
    }
    try {
        console.log(jwt.verify(token, 'youtube'));
    } catch (e) {
        console.error(e);
    }

    console.log('token verified');

})

app.get('/connect', (req, res) => {
    // get endpoint of incoming request for later redirection

    // generate token

    // send token
    let token;
    console.log(req.body.button);
    console.log('sending request for connection');
    //send connection request to Youtube.com

    console.log('start connection');
    // receive affirm or negative on connection request from Youtube.com

    console.log('generate and send session token');
    if (sessionToken) {
        token = jwt.sign({ userId: sessionToken.userId }, 'youtube', { algorithm: 'HS256' })
        res.redirect('https://www.youtube.com');
    }
    else {
        res.redirect('/');
    }
    try {
        console.log(jwt.verify(token, 'youtube'));
    } catch (e) {
        console.error(e);
    }

    console.log('token verified');
})

app.delete('/logout', (req, res, next) => {
    req.session.destroy();
    req.logOut();
    return res.redirect('/login');
})

app.get('/ssoLogin', (req, res, next) => {
    //wait for either register or login
    console.log(sessionToken);
    if (sessionToken.userId && sessionToken.token) {
        res.send(sessionToken.token);
    }
    else {
        res.send(null);
    }
});

app.post('/addCredential', (req, res, next) => {
    const { issuerId, credential, key, to } = req.body;
    const iat = new Date();
    try {
        const transaction = new Transaction('addCredential', to, { issuerId, to, key, credential, iat })
        blockchain.getCurrentBlock().addToBlock(transaction);
        console.log(blockchain.getCurrentBlock().transactions);
        res.send();
    } catch (e) {
        next(e);
    }
})

app.post('/updateCredential', (req, res, next) => {
    const { issuerId, credential, credentialId, key, to } = req.body;
    const iat = new Date();
    try {
        const transaction = new Transaction('updateCredential', to, { issuerId, to, key, credential, credentialId, iat })
        blockchain.getCurrentBlock().addToBlock(transaction);
        console.log(blockchain.getCurrentBlock().transactions);
        res.send();
    } catch (e) {
        next(e)
    }
})

app.post('/verifyCredential', (req, res, next) => {

})

app.listen(port, () => { console.log(`Listening on port ${port}`) })