// firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'; 

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD8ETUTkim7SjRzJle-Beswx_Z9INPdNbM",
    authDomain: "wanderlux-96492.firebaseapp.com",
    projectId: "wanderlux-96492",
    storageBucket: "wanderlux-96492.appspot.com",
    messagingSenderId: "900263710993",
    appId: "1:900263710993:web:f3716477da414203a53cb0",
    measurementId: "G-E8FVPP4DJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app); // Ensure storage is properly initialized here
// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { app, firestore, googleProvider, storage }; // Export the initialized app, Firestore, Google Auth Provider, and storage
