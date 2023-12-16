import React, { useState, useRef } from "react";
import RadioBtn from "../../../components/Input/radioButton";
import TitleCard from "../../../components/Cards/TitleCard";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getUser, updateProfile, updateProfileImage } from "../../../apis/apis";
import { toast } from "react-toastify";
import { useUser } from "../../../store/store";
import { useForm } from "react-hook-form";
import CustomInput from "../../../components/Input/CustomInput";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address"
    )
    .required("Email is required"),
  userName: Yup.string().required("User Name is required"),
  gender: Yup.string()
    .matches(/^(male|female|non-binary)$/i, "Invalid gender")
    .required("Gender is required"),
  birthDate: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
    .required("Birth date is required"),
  location: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Only letters and spaces are allowed for location"
    )
    .required("Location is required"),
  university: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Only letters and spaces are allowed for university"
    )
    .required("University is required"),
  emergencyContact: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Emergency contact is required"),
  bio: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed for bio")
    .required("Bio is required"),
  goals: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed for goals")
    .required("Goals are required"),
  personalInterest: Yup.string()
    .matches(
      /^[a-zA-Z\s]+$/,
      "Only letters and spaces are allowed for personal interest"
    )
    .required("Personal interest is required"),
});
function ProfileSettings() {
  const userId = localStorage.getItem("userId");
  const [, setUser] = useUser();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: async () => {
      const res = await getUser(userId);
      if (res) {
        const {
          email,
          age,
          gender,
          birthDate,
          music,
          location,
          university,
          emergencyContact,
          bio,
          goals,
          personalInterest,
          academicYear,
          profileImageUrl,
          userName,
        } = res;
        if (profileImageUrl) {
          setImagePreview(profileImageUrl);
        }
        return {
          email,
          age,
          gender,
          birthDate,
          music,
          location,
          university,
          emergencyContact,
          bio,
          goals,
          personalInterest,
          academicYear,
          userName,
        };
      }
      return {
        email: "",
        userName: "",
        gender: "",
        birthDate: "",
        location: "",
        university: "",
        emergencyContact: "",
        bio: "",
        goals: "",
        personalInterest: "",
      };
    },
  });

  const handleUpdate = async (userData) => {
    try {
      let data = await updateProfile({ userId, ...userData });
      if (profileImage) {
        const formData = new FormData();
        formData.append("profileImage", profileImage);
        formData.append("userId", userId);
        data = await updateProfileImage(formData);
      }
      setUser(data);
      toast.success("Profile Updated!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  const [profileImage, setProfileImage] = useState();

  const [imagePreview, setImagePreview] = useState("");

  const profilePic = () => {
    fileInputRef.current.click();
  };
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const imagePreview = e.target.files[0];
    setProfileImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(imagePreview);
  };
  return (
    <>
      <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-1 gap-3">
        <div className="col-span-2">
          <TitleCard title="Edit Profile" topMargin="mt-2">
            <div className="avatar-upload mb-1">
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
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-full w-[192px] h-[192px]"
                />
              ) : (
                <div className="avatar-preview"></div>
              )}
            </div>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              cols="50"
              placeholder="Enter Bio"
              {...register("bio")}
            ></textarea>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <CustomInput
                label="Email Id"
                other={{ ...register("email"), disabled: true }}
                error={errors.email?.message}
              />
              <CustomInput
                label="User Name"
                other={{ ...register("userName") }}
                error={errors.userName?.message}
              />
              <RadioBtn
                labelTitle="Gender"
                subTitle1="Male"
                subTitle2="Female"
                selectedValue={watch("gender")}
                onSelect={(value) => setValue("gender", value)}
              />
              <CustomInput
                type="date"
                label="Date Of Birth"
                other={{ ...register("birthDate") }}
                error={errors.birthDate?.message}
              />
              <CustomInput
                label="Location"
                other={{ ...register("location") }}
                error={errors.location?.message}
              />
              <CustomInput
                label="University"
                other={{ ...register("university") }}
                error={errors.university?.message}
              />
              <CustomInput
                label="Emergency Contact"
                other={{ ...register("emergencyContact") }}
                error={errors.emergencyContact?.message}
              />
              <CustomInput
                label="Goals"
                other={{ ...register("goals") }}
                error={errors.goals?.message}
              />
              <CustomInput
                label="Personal Interest"
                other={{ ...register("personalInterest") }}
                error={errors.personalInterest?.message}
              />
            </div>
            <button
              className="mt-5 btn btn_green float-left"
              onClick={handleSubmit(handleUpdate)}
            >
              Update
            </button>
          </TitleCard>
        </div>
      </div>
    </>
  );
}

export default ProfileSettings;
