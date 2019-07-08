import React, { useState, useEffect } from "react";
import { firebase } from "./firebase";

import Nav from "./Nav";
import Channel from "./Channel";

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel />
    </div>
  ) : (
    <Login />
  );
}

function Login() {
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithRedirect(provider);
  };
  return (
    <div className="Login">
      <h1>Chat</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
}

function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser({
          displayName: user.displayName,
          photoUrl: user.photoURL,
          uid: user.id
        });
        console.log(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}

export default App;
