import React from "react";
import PopUp from "../../components/Modal";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { addFeedback } from "../../apis/apis";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  rating: Yup.number().required("Rating is required"),
  review: Yup.string().matches(
    /^[a-zA-Z\s]+$/,
    "Only letters and spaces are allowed for review"
  ),
});
const FeedbackHandle = ({
  isModalOpen,
  closeModal,
  userId,
  userId2,
  userName,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      addFeedback({
        ...data,
        dateOfService: new Date(),
        reviewBy: userId,
        reviewFor: userId2,
      }),
    onSuccess: () => {
      closeModal();
      toast.success("Feedback added successfully");
    },
  });
  return (
    <PopUp isOpen={isModalOpen} onClose={closeModal}>
      <div className="popUpHead">
        <h5 className="text-md text-center font-bold">
          How would you rate your overall experience with {userName || ""}?
        </h5>
        <span className="popUpClose" onClick={closeModal}>
          <XMarkIcon></XMarkIcon>
        </span>
      </div>
      <p className="text-sm text-center mt-2">We’d love to know!</p>
      <div className="flex flex-row justify-center gap-5 px-5">
        <button
          className="flex flex-row mt-4"
          onClick={() => setValue("rating", 1)}
        >
          <img
            src="/bad.png"
            alt="bad"
            className={
              watch("rating") === 1 ? "border rounded border-green-500" : ""
            }
          />
        </button>
        <button
          className="flex flex-row mt-4"
          onClick={() => setValue("rating", 2)}
        >
          <img
            src="/notGood.png"
            alt="notGood"
            className={
              watch("rating") === 2 ? "border rounded border-green-500" : ""
            }
          />
        </button>
        <button
          className="flex flex-row mt-4"
          onClick={() => setValue("rating", 3)}
        >
          <img
            src="/happy.png"
            alt="happy"
            className={
              watch("rating") === 3 ? "border rounded border-green-500" : ""
            }
          />
        </button>
        <button
          className="flex flex-row mt-4"
          onClick={() => setValue("rating", 4)}
        >
          <img
            src="/good.png"
            alt="good"
            className={
              watch("rating") === 4 ? "border rounded border-green-500" : ""
            }
          />
        </button>
        <button
          className="flex flex-row mt-4"
          onClick={() => setValue("rating", 5)}
        >
          <img
            src="/amazing.png"
            alt="amazing"
            className={
              watch("rating") === 5 ? "border rounded border-green-500" : ""
            }
          />
        </button>
      </div>
      {errors?.rating?.message ? (
        <p className="text-xs text-red-500 mt-1">{errors.rating.message}</p>
      ) : null}
      <textarea
        className="textarea mt-3 textarea-bordered w-full"
        rows="4"
        cols="50"
        placeholder="Enter Feedback"
        {...register("review")}
      ></textarea>
      {errors?.review?.message ? (
        <p className="text-xs text-red-500 mt-1">{errors.review.message}</p>
      ) : null}
      <button
        className="m-1 btn btn_green float-center"
        onClick={handleSubmit(mutate)}
        disabled={isPending}
      >
        Add Feedback
      </button>
    </PopUp>
  );
};

export default FeedbackHandle;
