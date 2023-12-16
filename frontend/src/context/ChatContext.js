import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/sevices";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);

  useEffect(() => {
    const getUserChats = async () => {
      if (user) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        try {
          const response = await axios.get(
            `${baseUrl}/rooms/get-chat-list?userId=${user}`
          );
          setUserChats(response.data);
        } catch (error) {
          setUserChatsError(error);
        } finally {
          setIsUserChatsLoading(false);
        }
      }
    };

    getUserChats();
  }, []);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        user,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
