// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore/lite');
const { getDatabase, ref, set, onValue, get, child, update, } = require('firebase/database');

console.log('connected to DB');
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQNAjpxaNHH9qvI2HkFpR7D1uvU66qe-M",
    authDomain: "sso-b-5414c.firebaseapp.com",
    databaseURL: "https://sso-b-5414c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sso-b-5414c",
    storageBucket: "sso-b-5414c.appspot.com",
    messagingSenderId: "311747588357",
    appId: "1:311747588357:web:5dd79e7d91f770bfba476c",
    measurementId: "G-9Q166472JW"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// get(child(ref(db), '/Users')).then((snapshot) => {
//     if (snapshot.exists()) {
//         const data = snapshot.val();
//         data.forEach((data) => { data !== null ? console.log(data) : console.log('null'); })
//     }
//     else {
//         console.log("No data available");
//     }
// }).catch((e) => { console.log(e) })

var users = []
try {
    onValue(ref(db, '/users'), (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            const keys = Object.keys(data);
            users = Object.values(data);
            return users;
        }
        else {
            console.log('No data available');
            users = [];
            return null
        }
    });
} catch (e) {
    console.log(e);
}

async function writeUserData(user) {
    try {
        const dbRef = ref(db);
        set(ref(db, 'users/' + user.id), { id: user.id, email: user.email, username: user.username, password: user.password });
    } catch (e) {
        console.log(e);
    }
}

async function updateUserData(userId, updates) {
    try {
        const dbRef = ref(db);
        update(ref(db, 'users/' + userId), updates).then(() => { console.log('successfully updated') })
    }
    catch (e) {
        console.error(e);
    }
}

function getAllUsers() {
    return users;
}

// async function readUserData() {
//     try {
//         const starCountref = ref(db, 'users/');
//         console.log('reading user data')
//         on(starCountref, (snapshot) => {
//             const data = snapshot.val();
//             console.log(data);
//         })
//     } catch (e) {
//         console.log(e);
//     }
// }

// writeUserData(1, 'Siddharth', 'sid.agarwal45@gmail.com', 'abcde');
// writeUserData(2, 'Siddhu', 'sid.agarwal45@gmail.com', 'abcde');
// readUserData();

module.exports = { getAllUsers, writeUserData, updateUserData };