import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import credentialReducer from '../reducers/credentials';
import {composeWithDevTools} from 'redux-devtools-extension';

const composeEnhancers = compose();

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            credentials:credentialReducer
        }),
        composeWithDevTools(),
    );
    return store;
}