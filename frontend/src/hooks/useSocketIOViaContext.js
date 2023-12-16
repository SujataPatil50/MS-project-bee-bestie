import { useEffect, useCallback } from "react";
import { useSocketIOContext } from "../context/SocketProvider";

const useSocketIOViaContext = ({
  trigger = () => {},
  receiveEventName = "",
  sendEventName = "",
}) => {
  const { sc, error } = useSocketIOContext();

  const listingMessage = useCallback((data) => {
    trigger(data);
  }, []);

  const sendData = useCallback(
    (data) => {
      if (sc) sc?.emit(sendEventName, data);
    },
    [sc, sendEventName]
  );

  useEffect(() => {
    if (sc) {
      sc.on(receiveEventName, (data) => {
        listingMessage(data);
      });
    }
  }, [sc]);

  return [error, sendData];
};

export default useSocketIOViaContext;
