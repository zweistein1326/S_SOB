import {Card} from "../../models/Card";

export const updateCard = () => { }

export const setCards = (cards: Card[]) => ({
    type: 'SET_CARDS',
    payload: cards
})