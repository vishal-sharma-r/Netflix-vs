// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9lnDXPhLnwf0Q8dRt1YDZGi_h_qk8_hk",
  authDomain: "netflix-vs-d3030.firebaseapp.com",
  projectId: "netflix-vs-d3030",
  storageBucket: "netflix-vs-d3030.appspot.com",
  messagingSenderId: "468186293134",
  appId: "1:468186293134:web:a2e38831b27f73b035fadf",
  measurementId: "G-7MMGMJJQ0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();