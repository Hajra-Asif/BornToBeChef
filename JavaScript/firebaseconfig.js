import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// firestore database

import {
  getFirestore,
  doc,
  setDoc,
  collection, addDoc
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBaCIQMhQI_PrAeJ-wQ5xnTUocOjEJTFeY",
  authDomain: "borntobechef-d4ea2.firebaseapp.com",
  projectId: "borntobechef-d4ea2",
  storageBucket: "borntobechef-d4ea2.firebasestorage.app",
  messagingSenderId: "331146752698",
  appId: "1:331146752698:web:60b6d5b78f1c575eb4c883"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  db,
  doc,
  setDoc,
  collection, addDoc, updateProfile
};