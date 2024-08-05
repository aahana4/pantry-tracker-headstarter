// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANgFCAgfUf1le9sD91L8NVOGbGYAREP0M",
  authDomain: "aahana-pantry-tracker.firebaseapp.com",
  projectId: "aahana-pantry-tracker",
  storageBucket: "aahana-pantry-tracker.appspot.com",
  messagingSenderId: "943759948939",
  appId: "1:943759948939:web:8cb7545e21919e9333a88e",
  measurementId: "G-4L15BG2P3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {firestore};