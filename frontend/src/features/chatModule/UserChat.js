import PaperAirplaneIcon from "@heroicons/react/24/outline/PaperAirplaneIcon";
import { useMutation, useQuery } from "@tanstack/react-query";
import { memo, useEffect, useRef, useState } from "react";
import { reactQCache } from "../../utils/constants";
import {
  deleteMessage,
  getChatRoom,
  readMessage,
  sendMessage,
} from "../../apis/apis";
import Messages from "./Messages";
import useSocketIOViaContext from "../../hooks/useSocketIOViaContext";
import Subtitle from "../../components/Typography/Subtitle";
import { invalidateQuery } from "../../utils/customReactQueryClient";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";

const UserChat = ({
  openModal,
  activeUser,
  userId,
  profileImageUrl,
  userName,
  reciverId,
}) => {
  const [msg, setMsg] = useState([]);
  const [, addSocketMsg] = useSocketIOViaContext({
    sendEventName: `sendMessage`,
    receiveEventName: "getMessage",
    trigger: (data) => {
      if (data?.chatRoomId === activeUser) {
        setMsg((old) => [...old, data]);
      } else {
        const msg = `New Message from ${data?.senderId?.userName} \n ${data?.text}`;
        toast.info(msg);
        invalidateQuery([reactQCache.GET_CHAT]);
      }
    },
  });
  const { mutate: deleteChat, isPending: isLoadingDelete } = useMutation({
    mutationFn: (data) => deleteMessage(data),
    onSuccess: () => {
      invalidateQuery([reactQCache.GET_MESSAGES, activeUser, userId]);
      toast.success("Message deleted successfully");
      setMsg([]);
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: [reactQCache.GET_MESSAGES, activeUser, userId],
    enabled: userId && activeUser && activeUser !== "all" ? true : false,
    queryFn: () => getChatRoom(activeUser, userId),
  });
  const { mutate: readMessageApi } = useMutation({
    mutationFn: (data) => readMessage(data),
  });
  const { mutateAsync: sendMessageApi, isPending } = useMutation({
    mutationFn: (data) => sendMessage(data),
  });
  useEffect(() => {
    if (activeUser && userId) {
      readMessageApi({ userId, chatRoomId: activeUser });
    }
  }, [activeUser, userId, readMessageApi]);
  useEffect(() => {
    if (data) setMsg(data);
  }, [data]);
  const inputRef = useRef();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Call your function here
      handleEnterKey();
    }
  };
  const handleEnterKey = async () => {
    // Your function logic here
    const msgData = {
      text: inputRef.current.value,
      senderId: userId,
      chatRoomId: activeUser,
    };
    const data = await sendMessageApi(msgData);
    addSocketMsg({ ...data, reciverId });
    setMsg((old) => [...old, data]);
    inputRef.current.value = "";
  };
  return activeUser === "all" ? (
    <Subtitle>Please Select from left panel!</Subtitle>
  ) : (
    <div className="content flex-1">
      <div className="contact-profile flex justify-between">
        <div className="flex gap-4 pl-2">
          {profileImageUrl ? (
            <img
              src={profileImageUrl || ""}
              className="rounded-full my-auto h-10 w-10 flex-col text-center flex justify-evenly"
              alt=""
            />
          ) : (
            <div className="h-10 my-auto w-10 flex-col bg-slate-400 rounded-full text-center flex justify-evenly">
              {userName?.charAt(0) || "U"}
            </div>
          )}{" "}
          <p>{userName}</p>
        </div>
        <div className="text-right px-4">
          <div className="dropdown dropdown-end ml-4">
            <span tabIndex={0} className="btn_light_green p-2">
              End Chat
            </span>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-0 shadow bg-base-100 rounded-box w-40"
            >
              <li className="link" onClick={openModal}>
                <span>Feedback</span>
              </li>
              <li
                className="link"
                onClick={() =>
                  !isLoadingDelete &&
                  deleteChat({ userId, chatRoomId: activeUser })
                }
              >
                <span>Delete Chat</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isLoading ? <Loader /> : <Messages msg={msg} userId={userId} />}
      <div className="message-input">
        <div className="wrap">
          <input
            type="text"
            placeholder="Write your message..."
            ref={inputRef}
            onKeyDown={handleKeyPress}
            disabled={isPending}
          />
          {/* <PaperClipIcon className="attachment"></PaperClipIcon> */}
          <button
            className="submit"
            disabled={isPending}
            onClick={handleEnterKey}
          >
            <PaperAirplaneIcon className="submitIcon"></PaperAirplaneIcon>
          </button>
        </div>
      </div>
    </div>
  );
};
export default memo(UserChat);
