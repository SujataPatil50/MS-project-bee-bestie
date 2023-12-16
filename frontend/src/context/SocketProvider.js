import React, {
  createContext,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import { useUser } from "../store/store";
import { toast } from "react-toastify";
const socketIoUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
export const SocketIOContext = createContext({
  error: null,
  sc: null,
});

export const useSocketIOContext = () => {
  const ops = useContext(SocketIOContext);
  return ops;
};

const SocketIOProvider = (props) => {
  const [user] = useUser();
  const [sc, setSc] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    try {
      let socket = null;
      if (user) {
        socket = io.connect(socketIoUrl);
        socket.emit("joinUser", user._id);
        setSc(socket);
        setError(null);
      }

      return () => {
        if (socket) {
          socket.disconnect();
        }
      };
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }, [user]);
  return (
    <SocketIOContext.Provider
      value={{
        error,
        sc,
      }}
    >
      {props.children}
    </SocketIOContext.Provider>
  );
};

export default memo(SocketIOProvider);
