import { combineReducers } from "redux";

const INITIAL_STATE = { user: {} }

export const auth = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            const user = action.payload;
            return { user }
        default:
            return state
    }
}

