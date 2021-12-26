const { createHash } = require("crypto");

const generateHash = (credential) => {
    const hash = createHash(credential);
    return hash;
}

module.exports = { generateHash };