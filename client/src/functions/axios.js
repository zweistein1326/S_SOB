import axios, { Axios } from 'axios';
import { setUser, setAllUsers, setFollowing, setFavorite } from '../redux/actions/user';
import { setCredentials } from '../redux/actions/credentials';
import { baseURL } from './Constants';
import { async } from '@firebase/util';

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
                        if (data.user.favorite) {
                            console.log(data.user.favorite);
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
        const newLikes = await instance.post('/credential/like', { userId: user.id, credentialId });
        dispatch(getUserById(user.id));
        dispatch(getCredentialById(credentialId));
        return newLikes;
    }
}

export const comment = (credentialId, comment) => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        const postComment = await instance.post('/credential/comment', { userId: user.id, credentialId, comment });
        return postComment;
    }
}