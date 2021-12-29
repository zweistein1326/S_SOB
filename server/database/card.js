const firebasedb = require('firebase/database');
const { db } = require('.');


async function createCard(userId, card) {
    console.log(card);
    try {
        firebasedb.set(firebasedb.ref(db, `users/${userId}/cards/` + card.id), card);
        return card;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = { createCard };