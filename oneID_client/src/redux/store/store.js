import { combineReducers } from "redux";
import { cards } from "../reducers/Cards";
import { credentials } from "../reducers/Credentials";
import filters from "../reducers/filters";
import { auth } from "../reducers/Users";

export default combineReducers({
    auth: auth,
    cards: cards,
    filters: filters
})