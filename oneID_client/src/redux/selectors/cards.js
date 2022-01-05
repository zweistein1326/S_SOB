import Card from '../../models/Card';

export default (sharedCards, { text = '' }) => {
    console.log('sharedCards', sharedCards)
    let filterSharedCards = [];
    sharedCards.forEach((card) => filterSharedCards.push(card));
    return filterSharedCards.filter((sharedCard) => {
        if (sharedCard) {
            const textMatch = sharedCard.cardInfo.name.toLowerCase().includes(text.toLowerCase());
            return textMatch;
        }
    }).sort((a, b) => {
        return a.iat < b.iat
    })
}