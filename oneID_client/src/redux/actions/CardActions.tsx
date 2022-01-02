import {Card} from "../../models/Card";

export const updateCard = () => { }

export const setUserCards = (cards: Card[]) => ({
    type: 'SET_USER_CARDS',
    payload: cards
})

export const setSharedCards = (cards:Card[]) => ({
    type:'SET_SHARED_CARDS',
    payload: cards
})