import axios, { Axios } from 'axios';
import { baseUrl } from '../constants/Constants';
import { Card } from '../models/Card';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const instance = axios.create({
    baseURL: baseUrl
})

export const login = async(formData:any) => {
    const res = await instance.post('/login',formData);
    const {status, user} = res.data;
    console.log(user);
    if(status==="success"){
        console.log(status);
        return user;
    }
    console.log(status);
    return null;
}

export const register = async(formData:any) => {
    const res = await instance.post('/register',formData);
    const {status, user} = res.data;
    console.log(user);
    if(status==="success"){
        return user;
    }
    return null;
}

export const createCard = async(cardData:Card,userId:String) => {
    const res = await instance.post('/createCard/' + userId, cardData);
    // console.log(res);
    const {status, card} = res.data;
    if(status=="success"){
        console.log(status);
        return card;
    }
    console.log(status);
    return null;
}

export const updateCard = async(cardData:Card,userId:String) => {
    const res = await instance.post('/updateCard/' + userId, cardData);
    // console.log(res);
    const {status, updatedCard} = res.data;
    if(status=="success"){
        console.log(status, updatedCard);
        return updatedCard;
    }
    console.log(status);
    return null;
}

export const getCardsForUser = async(userId:string) => {
    const res = await instance.get('/cards/' + userId);
    const {status, cards} = res.data;
    if(status == 'success'){
        console.log(cards);
        return cards;
    }
    console.log(status);
    return null;
}

export const getCardById = async ( cardId:String ) => {
    const res = await instance.get('/card/'+cardId);
    const {status,card} = res.data;
    console.log('sharedCard',card);
    return card;
}


// export const findCredentials = async(userId:string) => {
//     const res = await instance.get('/user'+userId);
//     const { user } = res.data;
//     if(user){
//         return user.credentials
//     }
//     else{
//         return null;
//     }
// }