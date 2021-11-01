if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt');
const passport = require('passport');
const localSystem = require('passport-local');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const { Blockchain, Block, Transaction } = require('./blockchain');
const { getAllUsers, writeUserData } = require('./database');

var users = [];

const blockchain = new Blockchain();

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



const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        return res.redirect('/login');
    }
}

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    else {
        next();
    }
}

const getUsersFromDb = async () => {
    users = await getAllUsers();
    console.log(users);
    // console.log('users', users);
}

getUsersFromDb().then(() => {
    // console.log(users);
    initializePassport(
        passport,
        email => users.find(user => user.email == email),
        id => users.find(user => user.id == id)
    )
});

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { username: req.user.username });
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs');
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password: hashedPassword
        }
        // users.push(newUser);

        writeUserData(newUser);

        const transaction = new Transaction('create', newUser.id);
        const currentBlock = blockchain.getCurrentBlock();
        currentBlock.addToBlock(transaction);
        await blockchain.mineBlock();
        res.redirect('/login');
    }
    catch (e) {
        console.log(e);
        res.redirect('register');
    }
    console.log(users);
})
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureFlash: true
}))

app.delete('/logout', (req, res, next) => {
    req.logOut();
    return res.redirect('/login');
})


app.listen(port, () => { console.log(`Listening on port ${port}`) })