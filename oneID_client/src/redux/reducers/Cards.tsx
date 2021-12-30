import { combineReducers } from "redux";
import { Card } from "../../models/Card";

const INITIAL_STATE:Card[] = []

export const cards = (state = INITIAL_STATE, action:any) => {
    switch (action.type) {
        case 'SET_CARDS':
            const cards = action.payload;
            return state.concat(cards);
        default:
            return state
    }
}

