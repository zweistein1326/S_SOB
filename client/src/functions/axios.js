import axios, { Axios } from 'axios';
import { setUser, setAllUsers, setFollowing, setFavorite } from '../redux/actions/user';
import { setCredentials } from '../redux/actions/credentials';
import { baseURL } from './Constants';

axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
const instance = axios.create({
    baseURL: baseURL,
});

export const getNFT = async (credential, address) => {
    // save contract address and nft id linked to user id if sender is the owner of the fetched nft otherwise send error
    try {
        const { data } = await instance.post('/getCredential', { ...credential, userId: address });
        if (data) {
            return data;
        }
    }
    catch (err) {
        return null
    }
}

export const createPost = (credential, userId, caption, privacy) => {
    // save contract address and nft id linked to user id if sender is the owner of the fetched nft otherwise send error
    return async (dispatch) => {
        console.log('sending');
        const iat = Date.now().toString();
        const { data } = await instance.post('/createPost', { ...credential, caption, private: privacy !== 0, userId, iat });
        if (data) {
            dispatch(setCredentials(data))
            return data;
        }
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
                        if (data.user.favorite) {
                            await dispatch(setFavorite(data.user.favorite));
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
        dispatch(setFollowing(newFollowing.data));
        return newFollowing;
    }
}

export const favorite = (favoriteId) => {
    return async (dispatch, getState) => {
        const state = getState();
        const user = state.auth.user;
        const newFavorite = await instance.post('/setFavorite', { userId: user.id, favoriteId });
        dispatch(setFavorite(newFavorite.data));
        // dispatch(se)
        return newFavorite;
    }
}

export const like = (credentialId) => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        const newCredential = await instance.post('/credential/like', { userId: user.id, credentialId });
        dispatch(setCredentials(newCredential.data));
        return newCredential;
    }
}

export const comment = (credentialId, comment) => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        const newCredential = await instance.post('/credential/comment', { userId: user.id, credentialId, comment });
        dispatch(setCredentials(newCredential.data));
        return newCredential;
    }
}

export const changePrivacy = (credentialId, privacy) => {
    return async (dispatch, getState) => {
        const newCredential = await instance.post('/credential/privacy', { credentialId, privacy });
        dispatch(setCredentials(newCredential.data));
        return newCredential.data;
    }
}

export const submitBid = (credentialId, bid) => {
    return async (dispatch, getState) => {
        const newCredential = await instance.post('/credential/bid', { credentialId, bid });
        dispatch(setCredentials(newCredential.data));
        return newCredential.data;
    }
}

export const submitMinPrice = (credentialId, minPrice) => {
    return async (dispatch, getState) => {
        const newCredential = await instance.post('/credential/minPrice', { credentialId, minPrice });
        dispatch(setCredentials(newCredential.data));
        return newCredential.data;
    }
}