import { combineReducers } from "redux";

const INITIAL_STATE = []

export const credentials = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CREDENTIALS':
            const credentials = action.payload;
            return state.concat(credentials);
        default:
            return state
    }
}

