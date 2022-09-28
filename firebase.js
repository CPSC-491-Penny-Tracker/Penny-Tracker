// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD0f7r-1v01HsHNdL3HMLa-PpYsn5-fCI",
  authDomain: "penny-tacker-login.firebaseapp.com",
  projectId: "penny-tacker-login",
  storageBucket: "penny-tacker-login.appspot.com",
  messagingSenderId: "657525619734",
  appId: "1:657525619734:web:524e8777182d04c76d8937",
  measurementId: "G-3Z5NV51HLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);