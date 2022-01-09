import { User } from "../models/User";

export const setCredentials = (credentials:any[]) => ({
    type: 'SET_CREDENTIALS',
    credentials: credentials
})

export const credentials = ({ username }:any) => ({
    type: 'CREDENTIALS',
    username
})

export const startLogin = () => {
    return (dispatch:any) => {
        // return firebase.auth().signInWithPopup(googleAuthProvider);
    }
}

export const logout = () => ({
    type: 'LOGOUT',
})

export const setAccount = (account:any) => ({
    type:'SET_ACCOUNT',
    account
})

// export const startLogout = () => {
//     return (dispatch) => {
//         //if auth provider == firebase
//         // return firebase.auth().signOut()
//         // startLogoutSSOB();
//     }
// }