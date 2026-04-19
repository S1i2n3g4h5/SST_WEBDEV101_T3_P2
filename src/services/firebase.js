import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "firebase/firestore";

// TODO: Replace with your actual Firebase config
// Go to Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyChhXKYKORV9NWZ6N937euTQI4pSlCuRVc",
  authDomain: "jobassiut.firebaseapp.com",
  projectId: "jobassiut",
  storageBucket: "jobassiut.firebasestorage.app",
  messagingSenderId: "725315220960",
  appId: "1:725315220960:web:c7f67e20f3ceaf25bf6785",
  measurementId: "G-6XL5RRKY6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy };
