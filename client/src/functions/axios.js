import axios, { Axios } from 'axios';
import { resolve } from 'dns';
import { setUser, setAllUsers } from '../actions/auth';
import { setCredentials } from '../actions/credentials';
import { baseURL } from '../constant/Constants';

axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
const instance = axios.create({
    baseURL: baseURL,
});

export const getNFT = async (credential, address) => {
    // save contract address and nft id linked to user id if sender is the owner of the fetched nft otherwise send error
    const { data } = await instance.post('/getCredential', { ...credential, address });
    if (data) {
        return data;
    }
    return null
}

export const register = (address) => {
    return async (dispatch) => {
        const { data } = await instance.post('/register', { address });
        await dispatch(setUser(data.user));
        await dispatch(getAllUsers());
        data.user.credentials.forEach(async (credential) => { await dispatch(getCredentialById(credential)) })
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
        const promise = new Promise((resolve, reject) => {
            data.user.credentials.forEach(async (credential, index) => {
                await dispatch(getCredentialById(credential));
                if (index == data.user.credentials.length - 1) {
                    resolve(null)
                }
            })
        })
        await promise;
        return data;
    }
}

export const getAllUsers = () => {
    return async (dispatch) => {
        const { data } = await instance.get('/users');
        return dispatch(setAllUsers(data));
    }
}

export const getCredentials = async (address) => {
    const { data } = await instance.get('/credentials', { address });
}

export const followUser = async (userId, followingId) => {
    return async (dispatch) => {
        let followers = [];
        const newFollowing = await instance.post('/followUser', { userId, followingId });
        console.log(newFollowing);
        return newFollowing;
    }
}