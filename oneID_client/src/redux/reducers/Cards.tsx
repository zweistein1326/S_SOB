import { combineReducers } from "redux";
import { Card } from "../../models/Card";

const INITIAL_STATE: Map<String,Card> = new Map();

export const cards = (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
        case 'SET_CARDS':
            const cards = action.payload;
            cards.forEach((card:any) => {state.set(card.id,card)});
            return state;
        default:
            return state
    }
}

