// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi5Ekh6NDGLuNduYOUejV2Pcd_ACUdY78",
  authDomain: "mindease-nitk.firebaseapp.com",
  projectId: "mindease-nitk",
  storageBucket: "mindease-nitk.firebasestorage.app",
  messagingSenderId: "638738024860",
  appId: "1:638738024860:web:0f3c50f5bed1796f0d6059",
  measurementId: "G-MD9YFDNDJG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);