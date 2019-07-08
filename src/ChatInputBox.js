import React from "react";
import { db } from "./firebase";

function ChatInputBox() {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        const value = event.target.elements[0].value;
        db.collection("channels/random/messages").add({
          text: value,
          createApp: new Date()
        });
        event.target.reset();
      }}
      className="ChatInputBox"
    >
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
}
export default ChatInputBox;
