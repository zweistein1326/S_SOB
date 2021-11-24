import axios from 'axios';
import { firebase, googleAuthProvider } from '../firebase/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { startSetExpenses } from './expenses';
import { renderApp, store } from '..';
import { login } from './auth';
import { history } from '../routers/appRouter';

const jwt = require('jsonwebtoken');

export const startLoginSSOB = () => {
    const ssobUrl = 'http://localhost:3000/'
    window.open(ssobUrl, '_blank');
    return async (dispatch) => {
        await axios.get(ssobUrl + 'ssoLogin', {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(async (response) => {
            if (response.data) {
                try {
                    const validToken = jwt.verify(response.data, 'secret', { complete: true });
                    console.log(validToken);
                    if (validToken.payload) {
                        store.dispatch(login(validToken.payload))
                        store.dispatch(startSetExpenses().then(() => {
                            renderApp();
                            if (history.location.pathname === '/') {
                                history.push('/dashboard');
                            }
                        }))
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
}

