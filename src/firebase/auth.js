
import "firebase/compat/auth"
import { initializeApp } from "firebase/app"
import { createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
const firebaseConfig = initializeApp({
  apiKey : "AIzaSyB99_d50PQLq9ij-o1CurgUsoNAu9Yp6lU" , 
  authDomain : "movie-18195.firebaseapp.com" , 
  projectId : "movie-18195" , 
  storageBucket : "movie-18195.appspot.com" , 
  messagingSenderId : "665847399534" , 
  appId : "1:665847399534:web:0a8b78f4a396fc55b2927f" 
});

export function googleSignIn() {
  const googleAuthProvider = new GoogleAuthProvider();
 return signInWithPopup(auth, googleAuthProvider)
}

export function facebookSignIn() {
  const facebookAuthProvider = new FacebookAuthProvider();
  console.log(facebookAuthProvider)
  return signInWithPopup(auth, facebookAuthProvider)
}


export function logOut() {
  return signOut(auth);
}

export function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export const auth = getAuth(firebaseConfig);
export const db = getFirestore(firebaseConfig);
export const storage = getStorage(firebaseConfig)
