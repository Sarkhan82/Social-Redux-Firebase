import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "@firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "redux-firebase-8f1fc.firebaseapp.com",
  projectId: "redux-firebase-8f1fc",
  storageBucket: "redux-firebase-8f1fc.appspot.com",
  messagingSenderId: "674056439337",
  appId: "1:674056439337:web:540dee0f94d7805c0bbe38",
});

export const auth = app.auth();
export const db = getFirestore();
export default app;
