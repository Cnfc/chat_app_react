import React, { useState, useEffect } from "react";
import { db, firebase, setupPresence } from "./firebase";
import { Router, Redirect } from "@reach/router";

import Nav from "./Nav";
import Channel from "./Channel";

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="channel/:channelId" user={user} />
        <Redirect from="/" to="channel/general" />
      </Router>
    </div>
  ) : (
    <Login />
  );
}

function Login() {
  const { authError, setAuthError } = useState(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithRedirect(provider);
    } catch (error) {
      setAuthError(error);
    }
  };
  return (
    <div className="Login">
      <h1>Chat App</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>

      <div className="welcome_message">
        <p>
          Это чат приложение. Для продолжения необходимо зарегестрироваться.
          Выможите вести переписку в группе и видеть статус участников.
        </p>
      </div>
      {authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p>
            <i>{authError.message}</i>
          </p>
          <p>Please try again</p>
        </div>
      )}
    </div>
  );
}

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };

        setUser(user);

        db.collection("users")
          .doc(user.uid)
          .set(user, { merge: true });
        setupPresence(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}

export default App;
