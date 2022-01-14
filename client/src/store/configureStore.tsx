import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import credentialReducer from '../reducers/credentials';
import filterReducer from '../reducers/filters';
import {composeWithDevTools} from 'redux-devtools-extension';

const composeEnhancers = compose(applyMiddleware(thunk), composeWithDevTools());

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            credentials:credentialReducer,
            filters: filterReducer
        }),composeEnhancers,
    );
    return store;
}