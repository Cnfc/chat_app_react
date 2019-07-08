import React from "react";

import ChanelInfo from "./ChannelInfo";
import Messages from "./Message";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";

function Channel() {
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChanelInfo />
        <Messages />
        <ChatInputBox />
      </div>
      <Members />
    </div>
  );
}
export default Channel;
