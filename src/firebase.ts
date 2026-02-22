// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVaNW7aMfVJ3CG-EhCd06r4Bh3GM_uuW8",
  authDomain: "campusbloom-d9e2c.firebaseapp.com",
  projectId: "campusbloom-d9e2c",
  storageBucket: "campusbloom-d9e2c.firebasestorage.app",
  messagingSenderId: "381751272842",
  appId: "1:381751272842:web:a334df39e149d0f2be5473"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);