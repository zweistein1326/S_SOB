import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBQNAjpxaNHH9qvI2HkFpR7D1uvU66qe',
    authDomain: 'sso-b-5414c.firebaseapp.com',
    databaseURL: 'gs://sso-b-5414c.appspot.com',
    storageBucket: 'sso-b-5414c.appspot.com'
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);

export const storageRef = ref(storage);