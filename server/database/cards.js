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
        firebasedb.set(firebasedb.ref(db, `users/${userId}/cards/`), [card.id]);
        return card;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

async function updateCard(userId, card) {
    try {
        firebasedb.update(firebasedb.ref(db, `cards/` + card.id), card);
        // firebasedb.update(firebasedb.ref(db, `users/${userId}/cards/`), [card.id]);
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

async function getCardById(cardId) {
    try {
        const userCards = [];
        const cards = await getAllCards();
        const card = cards.find((card) => card.id == cardId);
        return card;
    }
    catch (err) {
        console.log(err);
    }
}

async function shareCard(cardId, receiverId) {
    const user = await getUserById(receiverId);
    let sharedCards;
    if (!!user.sharedCards) {
        sharedCards = [...user.sharedCards, cardId];
    }
    else {
        sharedCards = [cardId];
    }
    try {
        firebasedb.set(firebasedb.ref(db, `users/${receiverId}/sharedCards/`), sharedCards);
        return true;
    }
    catch (err) {
        console.log(err);
        throw Error(err.message);
    }
}


async function getAllCards() {
    return cards;
}


module.exports = { createCard, updateCard, getCardsForUser, getAllCards, getCardById, shareCard };