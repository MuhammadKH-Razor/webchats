import Firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBdhJuM8DalgzcLdGzKavKA3eUfCnlroR8",
    authDomain: "chatsrooms-32f05.firebaseapp.com",
    databaseURL: "https://chatsrooms-32f05-default-rtdb.firebaseio.com",
    projectId: "chatsrooms-32f05",
    storageBucket: "chatsrooms-32f05.appspot.com",
    messagingSenderId: "679466573098",
    appId: "1:679466573098:web:5b2a0263bf03723393d253",
    measurementId: "G-9ZD0FFFK8J"
};

// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig);
export const database = Firebase.database();
export const storage = Firebase.storage();
export const firestore = Firebase.firestore();
Firebase.analytics();

export default firebase;