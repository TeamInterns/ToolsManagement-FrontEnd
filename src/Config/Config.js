// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRhnz9ouqwjlnc8jRqtj0MdJT6V_E3zk0",
  authDomain: "tools-management-82a35.firebaseapp.com",
  projectId: "tools-management-82a35",
  storageBucket: "tools-management-82a35.appspot.com",
  messagingSenderId: "596665992426",
  appId: "1:596665992426:web:15c74e193d992b1f2e0393",
  measurementId: "G-FT3TXP1QH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)