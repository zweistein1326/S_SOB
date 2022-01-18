import { combineReducers } from "redux";
import { Card } from "../../models/Card";

const INITIAL_STATE: any = {userCards: new Map(), sharedCards: new Map()};

export const cards = (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
        case 'SET_USER_CARDS':
            const userCards = action.payload;
            userCards.forEach((card:Card) => {state.userCards.set(card.id,card)});
            return state;
        case 'SET_SHARED_CARDS':
            const sharedCards = action.payload;
            sharedCards.forEach((card:Card) => {state.sharedCards.set(card.id,card)});
        default:
            return state
    }
}
