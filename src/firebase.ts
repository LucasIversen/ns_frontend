// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS4dr6SIauQTwA9hL0biFaeAefzuho-mQ",
  authDomain: "nsbackend-3fd2c.firebaseapp.com",
  projectId: "nsbackend-3fd2c",
  storageBucket: "nsbackend-3fd2c.appspot.com",
  messagingSenderId: "794469776085",
  appId: "1:794469776085:web:0ed7fb1086535e4276005c",
  measurementId: "G-XRNCQN7D7X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default getFirestore(app);
