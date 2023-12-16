import { useEffect, useRef } from "react";
import Subtitle from "../../components/Typography/Subtitle";

const Messages = ({ msg, userId }) => {
  const messagesEnd = useRef();
  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [msg]);
  return (
    <div className="messages my-5">
      <ul>
        {msg?.map((m) => (
          <li
            key={m._id}
            className={`${m?.senderId?._id === userId ? "replies" : "sent"}`}
          >
            {msg?.senderId?.profileImageUrl ? (
              <img
                src={msg?.senderId?.profileImageUrl || ""}
                className="rounded-full h-10 w-10 flex-col text-center flex justify-evenly"
                alt=""
              />
            ) : (
              <span className="h-10 w-10 flex-col bg-slate-400 rounded-[100%] text-center flex justify-evenly">
                {msg?.senderId?.userName?.charAt(0) || "U"}
              </span>
            )}
            <p>{m.text}</p>
          </li>
        ))}
        {!msg?.length && (
          <li>
            <Subtitle>No Message Found!</Subtitle>
          </li>
        )}
        <div style={{ float: "left", clear: "both" }} ref={messagesEnd}></div>
      </ul>
    </div>
  );
};

export default Messages;
