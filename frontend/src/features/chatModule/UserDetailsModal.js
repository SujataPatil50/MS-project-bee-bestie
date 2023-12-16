import React from "react";
import PopUp from "../../components/Modal";
import { useNavigate } from "react-router-dom";
import { createChatRoom } from "../../apis/apis";
import { toast } from "react-toastify";
import { genrateImage } from "../../utils/constants";

const UserDetailsModal = ({ isModalOpen, closeModal, user, firstUserId }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    if (user?.roomId) {
      //
      navigate(`/app/ChatBox?listen=false&roomId=${user?.roomId}`);
    } else {
      const data = await createChatRoom({
        firstUserId,
        secondUserId: user?._id,
      });
      if (data?._id) {
        navigate(`/app/ChatBox?listen=false&roomId=${data?._id}`);
      } else {
        toast.error("Somthing wents wrong!");
      }
    }
  };
  return (
    <PopUp isOpen={isModalOpen} onClose={closeModal} isCloseIcon={true}>
      <div className="flex w-full">
        <div className="relative w-full flex h-max mx-auto flex-col rounded-xl card_bg bg-clip-border text-gray-700 shadow-md">
          <div class="relative mx-auto mt-4 h-64 overflow-hidden rounded-full bg-clip-border text-gray-700">
            <img
              src={genrateImage(user?.profileImageUrl || "")}
              className="h-64 w-64 md:w-auto object-cover"
              alt="user profile"
            />
          </div>
          <div class="p-4">
            <div class="mb-0 flex items-center justify-between">
              <p class="block card_UserName font-sans text-center font-medium leading-relaxed antialiased">
                {user?.userName}{" "}
              </p>
            </div>
            <div class="mb-0 flex items-center justify-between">
              <p class="block font-sans text-base font-medium leading-relaxed antialiased">
                {user?.bio || "-"}
              </p>
            </div>
          </div>
          <div className="p-2 pt-0 mb-2" onClick={handleClick}>
            <div className="block select-none rounded-lg btn_green cursor-auto text-center py-3 px-6 mx-auto font-sans text-xs font-bold">
              AVAILABLE
            </div>
          </div>
          {/* <div className="p-4 pt-0 mx-auto mb-2 statusCheck">
              <p className="block font-sans text-base font-medium leading-relaxed antialiased">
                Send a msg and melissa will get back to you
              </p>
            </div> */}
        </div>
      </div>
    </PopUp>
  );
};

export default UserDetailsModal;
