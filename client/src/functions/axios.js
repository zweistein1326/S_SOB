import axios, { Axios } from 'axios';
import { resolve } from 'dns';
import { setUser, setAllUsers, setFollowing } from '../actions/user';
import { setCredentials } from '../actions/credentials';
import { baseURL } from '../constant/Constants';

axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
const instance = axios.create({
    baseURL: baseURL,
});

export const getNFT = async (credential, address) => {
    // save contract address and nft id linked to user id if sender is the owner of the fetched nft otherwise send error
    try {
        const { data } = await instance.post('/getCredential', { ...credential, address });
        console.log(data);
        if (data) {
            return data;
        }
    }
    catch (err) {
        return null
    }

}

export const register = (user) => {
    return async (dispatch) => {
        const { data } = await instance.post('/register', user);
        await dispatch(setUser(data.user));
        await dispatch(getAllUsers());
        if (data.user.credentials) {
            data.user.credentials.forEach(async (credential) => { await dispatch(getCredentialById(credential)) })
        }
        return data.user;
    }
}

export const getCredentialById = (credentialId) => {
    return async (dispatch) => {
        const { data } = await instance.get(`/credential/${credentialId}`);
        console.log(data);
        return dispatch(setCredentials(data));
    }
}

export const getUserById = (userId) => {
    return async (dispatch) => {
        const { data } = await instance.get(`/user/${userId}`);
        try {
            const promise = new Promise((resolve, reject) => {
                if (data.user.credentials) {
                    data.user.credentials.forEach(async (credential, index) => {
                        await dispatch(getCredentialById(credential));
                        if (data.user.following) {
                            await dispatch(setFollowing(data.user.following));
                        }
                        if (index == data.user.credentials.length - 1) {
                            resolve(null)
                        }
                    })
                }
                else {
                    resolve(null);
                }
            })
            await promise;
            return data;
        }
        catch (e) {
            console.log(e.message);
            return null;
        }
    }
}

export const getAllUsers = () => {
    return async (dispatch) => {
        const { data } = await instance.get('/users');
        return dispatch(setAllUsers(data));
    }
}

export const getCredentials = () => {
    return async (dispatch) => {
        const { data } = await instance.get('/credentials');
        console.log(data.allCredentials);
        if (data.allCredentials) {
            Object.values(data.allCredentials).forEach((credential) => dispatch(setCredentials(credential)))
        }
        return data.allCredentials;
    }
}

export const updateUser = (updates) => {
    return async (dispatch) => {
        const { data } = await instance.post('/updateUser', updates);
    }
}

export const followUser = (userId, followingId) => {
    return async (dispatch) => {
        let followers = [];
        const newFollowing = await instance.post('/followUser', { userId, followingId });
        console.log(newFollowing.data);
        dispatch(setFollowing(newFollowing.data));
        return newFollowing;
    }
}