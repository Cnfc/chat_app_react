import React from "react";

import ChanelInfo from "./ChannelInfo";
import Messages from "./Message";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";

function Channel({ user }) {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChanelInfo />
        <Messages user={user} />
        <ChatInputBox user={user} />
      </div>
      <Members />
    </div>
  );
}
export default Channel;
