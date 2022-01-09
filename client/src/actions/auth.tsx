import { AnyARecord } from "dns";
import { User } from "../models/User";

export const setAccount = (account:any) => ({
    type:'SET_ACCOUNT',
    account
})

export const setUser = (user:any ) => ({
    type:'SET_USER',
    user
})
// export const startLogout = () => {
//     return (dispatch) => {
//         //if auth provider == firebase
//         // return firebase.auth().signOut()
//         // startLogoutSSOB();
//     }
// }