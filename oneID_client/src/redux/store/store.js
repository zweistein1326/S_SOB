import { combineReducers } from "redux";
import { cards } from "../reducers/Cards";
import { credentials } from "../reducers/Credentials";
import { auth } from "../reducers/Users";

export default combineReducers({
    auth: auth,
    credentials: credentials,
    cards: cards
})