import { useEffect, useState } from "react";

// import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../store/store";
import { getChatUser } from "../../apis/apis";
import { reactQCache } from "../../utils/constants";
import useSocketIOViaContext from "../../hooks/useSocketIOViaContext";
import ChatLeftItem from "./ChatLeftItem";
import UserChat from "./UserChat";
import FeedbackHandle from "./FeedbackHandle";
import Loader from "../../components/Loader/Loader";

function ChatBox() {
  // For Popup
  const [searchParams, setSearchParams] = useSearchParams();
  const isListen = searchParams.get("listen") === "true";
  const activeUser = searchParams.get("roomId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user] = useUser();
  const { data, isLoading } = useQuery({
    queryFn: () => getChatUser(user._id),
    queryKey: [reactQCache.GET_CHAT],
    enabled: Boolean(user?._id),
  });
  const [, add] = useSocketIOViaContext({
    sendEventName: `onlineListenerUsers`,
  });
  const [, remove] = useSocketIOViaContext({
    sendEventName: `removeOnlineListenerUsers`,
  });

  useEffect(() => {
    if (user?._id && isListen) {
      add(user._id);
    }
    return () => {
      if (user?.id && isListen) remove(user?.id);
    };
  }, [user, add, remove, isListen]);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const senderInfo = data?.find((room) => room._id === activeUser);
  return (
    <div>
      <div id="frame" className="flex">
        <div id="sidepanel">
          <div id="contacts" className="flex flex-col">
            {isLoading ? (
              <Loader />
            ) : (
              <ChatLeftItem
                data={data}
                activeUser={activeUser}
                userId={user?._id}
                setActiveUser={(id) =>
                  setSearchParams({ roomId: id, listen: isListen })
                }
              />
            )}
          </div>
        </div>
        <UserChat
          openModal={openModal}
          activeUser={activeUser}
          userId={user?._id}
          profileImageUrl={senderInfo?.user?.profileImageUrl}
          userName={senderInfo?.user?.userName}
          reciverId={senderInfo?.user?._id}
        />
      </div>
      <FeedbackHandle
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        userId={user?._id}
        userId2={senderInfo?.user?._id}
        userName={senderInfo?.user?.userName}
      />
    </div>
  );
}

export default ChatBox;
