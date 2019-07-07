import React, { useState, useEffect } from "react";
import firebase from "firebase";
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

function App() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    return db.collection("channels").onSnapshot(snapshot => {
      const docs = [];
      snapshot.forEach(doc => {
        docs.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setChannels(docs);
    });
  }, []);

  return (
    <div className="App">
      <div className="Nav">
        <div className="User">
          <img
            className="UserImage"
            alt="whatever"
            src="https://placekitten.com/64/64"
          />
          <div>
            <div>Stanislav Dashkov </div>
            <div>
              <button className="text-button">log out</button>
            </div>
          </div>
        </div>
        <nav className="ChannelNav">
          {channels.map(channel => (
            <a key={channel.id} href={`/channel/${channel.id}`}>
              # {channel.id}
            </a>
          ))}
        </nav>
      </div>
      <div className="Channel">
        <div className="ChannelMain">
          <div className="ChannelInfo">
            <div className="Topic">
              Topic: <input className="TopicInput" value="Awesome stuff" />
            </div>
            <div className="ChannelName">#general</div>
          </div>
          <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            <div>
              <div className="Day">
                <div className="DayLine" />
                <div className="DayText">12/6/2018</div>
                <div className="DayLine" />
              </div>
              <div className="Message with-avatar">
                <div className="Avatar" />
                <div className="Author">
                  <div>
                    <span className="UserName">Ryan Florence </span>
                    <span className="TimeStamp">3:37 PM</span>
                  </div>
                  <div className="MessageContent">Alright, lets do this.</div>
                </div>
              </div>
            </div>
            <div>
              <div className="Message no-avatar">
                <div className="MessageContent">works now?</div>
              </div>
            </div>
          </div>
          <div className="ChatInputBox">
            <input className="ChatInput" placeholder="Message #general" />
          </div>
        </div>
        <div className="Members">
          <div>
            <div className="Member">
              <div className="MemberStatus offline" />
              Ryan Florence
            </div>
            <div className="Member">
              <div className="MemberStatus online" />
              cleverbot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
