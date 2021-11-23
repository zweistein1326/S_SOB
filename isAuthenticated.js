const jwt = require('jsonwebtoken');

const config = process.env;

const isAuthenticated = (req, res, next) => {
    console.log('req', req);
}

module.exports = isAuthenticated;