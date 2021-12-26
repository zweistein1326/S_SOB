const firebasedb = require('firebase/database');
const { db } = require('.');

async function create(credential) {
    try {
        firebasedb.set(firebasedb.ref(db, `users/${credential.receiverId}/credentials/` + credential.id), {
            title: credential.title,
            value: credential.value,
            issuer: credential.issuerId,
            hash: credential.hash,
            signature: credential.signature,
            iat: credential.iat
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = { create }