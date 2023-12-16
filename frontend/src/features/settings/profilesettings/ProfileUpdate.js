import React, { useState, useRef } from "react";
import TitleCard from "../../../components/Cards/TitleCard";
import TextAreaInput from "../../../components/Input/TextAreaInput";

const ProfileUpdate = () => {
  //For Editing Profile Image
  const [imagePreview, setImagePreview] = useState("");
  const divStyle = {
    backgroundImage: 'url(${imagePreview})&auto=format&fit=crop&w=2000&q=80")',
    overflow: "hidden",
  };
  const profilePic = (input) => {
    fileInputRef.current.click();
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const imagePreview = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(imagePreview);
  };
  return (
    <>
      <TitleCard title="Edit Profile Photo" topMargin="mt-2">
        <div className="container">
          <div className="avatar-upload">
            <div className="avatar-edit">
              <input
                type="file"
                id="imageUpload"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg"
              />
              <label for="" onClick={profilePic}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 upload-button"
                >
                  <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                  <path
                    fillRule="evenodd"
                    d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <div className="avatar-preview">
              <div id="imagePreview" style={divStyle}>
                {imagePreview && <img src={imagePreview} alt="Preview" />}
              </div>
            </div>
          </div>
          <div class="avatar-detail">
            <div class="text-center px-14">
              <h2 class="text-gray-800 text-3xl font-bold">Mohit Dhiman</h2>
              <a
                class="text-gray-400 mt-2 hover:text-blue-500"
                href="https://www.instagram.com/immohitdhiman/"
                target="BLANK()"
              >
                @immohitdhiman
              </a>
              <TextAreaInput
                rows="4"
                cols="50"
                placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
              />
            </div>
          </div>
        </div>
      </TitleCard>
    </>
  );
};

export default ProfileUpdate;
