import axios, { Axios } from 'axios';
import { resolve } from 'dns';
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

export const register = async (address) => {
    const { data } = await instance.post('/register', { address });
    console.log(data.user);
    return data.user;
}

export const getAllCredentialData = async (credentials, address) => {
    let credentialArray = []
    for (const credential of Object.values(credentials)) {
        const credentialData = await getNFT(credential, address);
        if (credentialData) {
            credentialArray.push(credentialData);
        }
    }
    return credentialArray;
}

export const followUser = async (userId, followingId) => {
    let followers = [];
    const newFollowing = await instance.post('/followUser', { userId, followingId });
    console.log(newFollowing);
    return newFollowing;
}