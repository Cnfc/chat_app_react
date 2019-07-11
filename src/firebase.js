import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

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
const rtdb = firebase.database();

export function setupPresence(user) {
  const isOfflineForRTDB = {
    state: "offline",
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };
  const isOfflineForFirestore = {
    state: "offline",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const isOnlineforRTDB = {
    state: "online",
    lastChanged: firebase.database.ServerValue.TIMESTAMP
  };
  const isOnlineforFirestore = {
    state: "online",
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
  };

  const rtdbRef = rtdb.ref(`/status/${user.uid}`);
  const userDoc = db.doc(`/users/${user.uid}`);

  rtdb.ref(".info/connected").on("value", async snapshot => {
    if (snapshot.val() === false) {
      userDoc.update({
        status: isOfflineForFirestore
      });
      return;
    }

    await rtdbRef.onDisconnect().set(isOfflineForRTDB);
    rtdbRef.set(isOnlineforRTDB);
    userDoc.update({
      status: isOnlineforFirestore
    });
  });
}

export { db, firebase };
