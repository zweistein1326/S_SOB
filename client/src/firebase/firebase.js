// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: 'AIzaSyBQNAjpxaNHH9qvI2HkFpR7D1uvU66qe-M',
  authDomain: 'sso-b-5414c.firebaseapp.com',
  databaseURL:
    'https://sso-b-5414c-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'sso-b-5414c',
  storageBucket: 'sso-b-5414c.appspot.com',
  messagingSenderId: '311747588357',
  appId: '1:311747588357:web:5dd79e7d91f770bfba476c',
  measurementId: 'G-9Q166472JW',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(firebaseApp);
export const storageRef = ref(storage);
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// import { initializeApp } from 'firebase/app';
// import { getStorage, ref } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBQNAjpxaNHH9qvI2HkFpR7D1uvU66qe',
//   authDomain: 'sso-b-5414c.firebaseapp.com',
//   databaseURL: 'gs://sso-b-5414c.appspot.com',
//   storageBucket: 'sso-b-5414c.appspot.com',
// };
// const firebaseApp = initializeApp(firebaseConfig);

// // Get a reference to the storage service, which is used to create references in your storage bucket
// export const storage = getStorage(firebaseApp);

// export const storageRef = ref(storage);
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBve7QvRTCLJGFlHjqnJQxVWSANgFRE4nY",
//     authDomain: "playground-68e7e.firebaseapp.com",
//     projectId: "playground-68e7e",
//     storageBucket: "playground-68e7e.appspot.com",
//     messagingSenderId: "315649824853",
//     appId: "1:315649824853:web:3d3b0c2b16f67003575cdc",
//     measurementId: "G-29H0JFEGJC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
