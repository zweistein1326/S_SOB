const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get data from the blockchain world state and compare

var session;

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        let user = getUserByEmail(email);
        const token = jwt.sign(user,
            process.env.TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: "2h"
        })
        user.token = token
        console.log(user);
        if (user == null) {
            return done(null, false, { message: 'No user with that email' });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                session = req.session;
                session.userId = user.userId;
                console.log(req.session)
                return done(null, user)
            }
            else {
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        done(null, getUserById(id));
    })
}

module.exports = initialize;