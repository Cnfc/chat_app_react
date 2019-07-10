import React, { useEffect, useRef } from "react";

import useDocWithCache from "./useDocWithCache";
import useCollection from "./useCollection";
import formatDate from "date-fns/format";
import isSameDay from "date-fns/is_same_day";

function useChatScroll(ref) {
  useEffect(() => {
    const node = ref.current;
    node.scrollTop = node.scrollHeight;
  });
}

function shouldShowDay(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const isNewDay = !isSameDay(
    previous.createdAt.seconds * 1000,
    message.createdAt.seconds * 1000
  );

  return isNewDay;
}

function shouldShowAvatar(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const differentUser = message.user.id !== previous.user.id;
  if (differentUser) {
    return true;
  }

  // If longer than 3min Show new
  const hasBeenAWhile =
    message.createdAt.seconds - previous.createdAt.seconds > 180;

  return hasBeenAWhile;
}

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, "createdAt");

  // Scroll to the last message length
  const scrollerRef = useRef();
  useChatScroll(scrollerRef);

  return (
    <div ref={scrollerRef} className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const showDay = shouldShowDay(previous, message);
        const showAvatar = shouldShowAvatar(previous, message);

        return showAvatar ? (
          <FirstMessageFromUser
            message={message}
            showDay={showDay}
            key={message.id}
          />
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function FirstMessageFromUser({ message, showDay }) {
  const author = useDocWithCache(message.user.path);

  return (
    <div key={message.id}>
      {showDay && (
        <div className="Day">
          <div className="DayLine" />
          <div className="DayText">
            {new Date(message.createdAt.seconds * 1000).toLocaleDateString()}
          </div>
          <div className="DayLine" />
        </div>
      )}
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{ backgroundImage: author ? `url("${author.photoUrl}")` : "" }}
        />
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName}</span>{" "}
            <span className="TimeStamp">
              {formatDate(message.createdAt.seconds * 1000, "dd h:mm a")}
            </span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
}
export default Messages;
