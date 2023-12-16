import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";
import PopUp from "../../components/Modal/index";

function UserProfile() {
  // Navigate to a new page on button click
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/app/ChatBox");
  };

  // For Popup
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({ title: "Manage User" }));
  }, []);

  return (
    <div className="userListChat">
      <div>
        <div className="grid mt-2">
          <div className="relative card_container flex h-max mx-auto flex-col rounded-xl card_bg bg-clip-border text-gray-700 shadow-md">
            <div class="relative mx-auto mt-4 h-64 overflow-hidden rounded-full bg-clip-border text-gray-700">
              <img
                src="http://emilcarlsson.se/assets/harveyspecter.png"
                className="h-64 w-64 md:w-auto object-cover"
              />
            </div>
            <div class="p-4">
              <div class="mb-0 flex items-center justify-between">
                <p class="block card_UserName font-sans text-center font-medium leading-relaxed antialiased">
                  Melissa Williams
                </p>
              </div>
              <div class="mb-0 flex items-center justify-between">
                <p class="block font-sans text-base font-medium leading-relaxed antialiased">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like).
                </p>
              </div>
            </div>
            <div className="p-2 pt-0 mb-2">
              <div
                className="block select-none rounded-lg btn_green py-3 px-6 mx-auto font-sans text-xs font-bold"
                type="button"
              >
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
      </div>
    </div>
  );
}

export default UserProfile;
