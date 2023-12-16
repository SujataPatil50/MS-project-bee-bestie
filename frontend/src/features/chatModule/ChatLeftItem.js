import moment from "moment";
import { useEffect, useState } from "react";
import useSocketIOViaContext from "../../hooks/useSocketIOViaContext";

const ChatLeftItem = ({ data, activeUser, setActiveUser, userId }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [, joinChat] = useSocketIOViaContext({
    trigger: (data) => {
      setOnlineUsers(data || []);
    },
    receiveEventName: `getOnlineUser`,
    sendEventName: `joinUser`,
  });
  useEffect(() => {
    if (userId) {
      joinChat(userId);
    }
  }, [userId, joinChat]);
  return (
    <ul>
      {data?.map((room) => {
        const isOnline = onlineUsers.find(
          (user) => user.userId === room?.user?._id
        );
        return (
          <li
            className={`contact ${activeUser === room._id ? "active" : ""} `}
            key={room._id}
            onClick={() => setActiveUser(room._id)}
          >
            <div className="wrap flex gap-3">
              <div className="my-auto">
                <span
                  className={`contact-status ${isOnline ? "online" : "hidden"}`}
                ></span>
                {room?.user?.profileImageUrl ? (
                  <img
                    src={room?.user?.profileImageUrl || ""}
                    className="rounded-full h-12 w-12 flex-col text-center flex justify-evenly"
                    alt=""
                  />
                ) : (
                  <div className="h-12 w-12 flex-col bg-slate-400 rounded-full text-center flex justify-evenly">
                    {room?.user?.userName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div className="meta">
                <p className="name">{room?.user?.userName}</p>
                <p className="preview">{room?.lastMessage || "-"}</p>
              </div>
              {room.lastMessageCreatedAt ? (
                <div className="my-auto mr-0 ml-auto text-xs w-16">
                  {moment(room.lastMessageCreatedAt).calendar()}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ChatLeftItem;
