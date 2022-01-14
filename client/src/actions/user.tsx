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

export const setAllUsers = (users:any[])=>({
    type:'SET_ALL_USERS',
    allUsers : users
})

export const setFollowing = (followingIds:string[])=>({
    type:'SET_FOLLOWING',
    following:followingIds
})
// export const startLogout = () => {
//     return (dispatch) => {
//         //if auth provider == firebase
//         // return firebase.auth().signOut()
//         // startLogoutSSOB();
//     }
// }