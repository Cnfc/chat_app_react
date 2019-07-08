import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBENgtk7smdOP5xD8Xzl8fjdyaHJ0faARk",
  authDomain: "chat-app-131313.firebaseapp.com",
  databaseURL: "https://chat-app-131313.firebaseio.com",
  projectId: "chat-app-131313",
  storageBucket: "chat-app-131313.appspot.com",
  messagingSenderId: "318439760953",
  appId: "1:318439760953:web:329a55f0b22624ee"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export { db };
