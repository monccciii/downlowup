//@ts-nocheck
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV0mLohTiLfiDaODoulSXDkmObP-3XQRs",
  authDomain: "downlowupbackend.firebaseapp.com",
  projectId: "downlowupbackend",
  storageBucket: "downlowupbackend.appspot.com",
  messagingSenderId: "241029475392",
  appId: "1:241029475392:web:f3aa02de649baff89d03a5",
  measurementId: "G-LL5DYZT9JH",
  databaseURL: "https://downlowupbackend-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const database = getDatabase(app);

export const initFirebase = () => {
    return app;
}

export const userAccessToken = () => {
    const accessToken =
    localStorage.getItem("accessToken") !== "undefined"
        ? JSON.parse(localStorage.getItem("accessToken"))
        : localStorage.clear();
    return accessToken
}