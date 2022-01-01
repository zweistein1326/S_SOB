const { onValue, ref } = require('firebase/database');
const firebasedb = require('firebase/database');
const { db, getUserById } = require('.');

var cards = null;

try {
    onValue(ref(db, '/cards'), (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            cards = Object.values(data);
            console.log('cards updated')
        }
        else {
            console.log('No data available');
        }
    });
} catch (err) {
    console.log(err);
}


async function createCard(userId, card) {
    console.log(card);
    try {
        firebasedb.set(firebasedb.ref(db, `cards/` + card.id), card);
        firebasedb.set(firebasedb.ref(db, `users/${userId}/cards/`), card.id);
        return card;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

async function getCardsForUser(userId) {
    try {
        const user = getUserById(userId);
        const userCards = [];
        const cards = await getAllCards();
        cards.forEach((card) => {
            if (user.cards.findIndex((cardId) => card.id == cardId) !== -1) {
                console.log(card);
                userCards.push(card);
            }
        })
        return userCards;
    }
    catch (e) {
        console.log('e', e);
    }
}


async function getAllCards() {
    return cards;
}


module.exports = { createCard, getCardsForUser, getAllCards };