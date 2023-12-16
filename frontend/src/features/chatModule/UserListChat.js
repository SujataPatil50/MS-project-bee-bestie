import React, { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { useUser } from "../../store/store";
import useSocketIOViaContext from "../../hooks/useSocketIOViaContext";
import UserDetailsModal from "./UserDetailsModal";
import { genrateImage } from "../../utils/constants";
import Subtitle from "../../components/Typography/Subtitle";
import ChatBubbleLeftRightIcon from "@heroicons/react/24/outline/ChatBubbleLeftRightIcon";
import { useNavigate } from "react-router-dom";

function UserListChat() {
  const [user] = useUser();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [listners, setListner] = useState([]);
  const [, sendData] = useSocketIOViaContext({
    trigger: (data) => {
      setListner(data || []);
    },
    sendEventName: `removeOnlineListenerUsers`,
    receiveEventName: `getOnlineListener`,
  });
  useEffect(() => {
    if (user?._id) {
      sendData(user?._id);
    }
  }, [user?._id, sendData]);
  return (
    <div className="userListChat">
      <TitleCard
        title="Need Someone To Talk To?"
        topMargin="mt-4"
        TopSideButtons={
          <ChatBubbleLeftRightIcon
            className={`h-6 w-6`}
            onClick={() => navigate("/app/ChatBox?listen=false&roomId=all")}
          />
        }
      >
        {/* <div id="search">
          <label for="">
            <MagnifyingGlassIcon></MagnifyingGlassIcon>
          </label>
          <input type="text" placeholder="Search contacts..." />
          <label for="" className="userfilter">
            <AdjustmentsHorizontalIcon></AdjustmentsHorizontalIcon>
          </label>
        </div> */}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center  gap-4 mt-6">
          {listners?.map((user) => (
            <div
              key={user._id}
              className="relative flex w-64 h-max flex-col rounded-xl card_bg bg-clip-border text-gray-700 shadow-md"
            >
              <div class="relative mx-4 mt-4 h-64 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                <img
                  src={genrateImage(user?.profileImageUrl || "")}
                  className="h-64 w-64 object-cover"
                  alt="user profile"
                />
              </div>
              <div class="p-4">
                <div class="mb-0 flex items-center justify-between">
                  <p className="card_UserName block font-sans text-base font-medium leading-relaxed antialiased">
                    {user?.userName}
                  </p>
                </div>
              </div>
              <div className="p-2 pt-0 mb-2">
                <button
                  className="block w-full select-none rounded-lg card_Btn btn_green py-3 px-6 text-center align-middle font-sans text-xs font-bold"
                  type="button"
                  onClick={() => {
                    setSelectedUser(user);
                    setOpenModal(true);
                  }}
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
        {listners?.length === 0 && <Subtitle>No Users Online Found</Subtitle>}
      </TitleCard>
      <UserDetailsModal
        user={selectedUser}
        closeModal={() => {
          setSelectedUser({});
          setOpenModal(false);
        }}
        isModalOpen={openModal}
        firstUserId={user?._id}
      />
    </div>
  );
}

export default UserListChat;
