import React, { useEffect } from "react";
import { db } from "./firebase";

import ChanelInfo from "./ChannelInfo";
import Messages from "./Message";
import ChatInputBox from "./ChatInputBox";
import Members from "./Members";

function Channel({ user, channelId }) {
  useEffect(() => {
    db.doc(`users/${user.uid}`).update({
      [`channels.${channelId}`]: true
    });
  }, [user.uid, channelId]);

  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChanelInfo channelId={channelId} />
        <Messages user={user} channelId={channelId} />
        <ChatInputBox user={user} channelId={channelId} />
      </div>
      <Members channelId={channelId} />
    </div>
  );
}
export default Channel;
