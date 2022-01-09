import axios, { Axios } from 'axios';
import { baseURL } from '../constant/Constants';

axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded';
const instance = axios.create({
    baseURL: baseURL,
});

export const getNFT = async (formData) => {
    // save contract address and nft id linked to user id if sender is the owner of the fetched nft otherwise send error
    const { data } = await instance.post('/getNFT', formData);
    return data;
}