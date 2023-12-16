import axiosInstance from "../utils/axiosInstance";

export const getChatUser = async (userId) =>
  await axiosInstance
    .get(`/rooms/get-chat-list?userId=${userId}`)
    .then((res) => res.data?.data);

export const createChatRoom = async (data) =>
  await axiosInstance
    .post(`/rooms/create-chat`, data)
    .then((res) => res.data?.data);

export const getChatRoom = async (roomId, userId) =>
  await axiosInstance
    .get(`/message/message-listing?chatRoomId=${roomId}&userId=${userId}`)
    .then((res) => res.data.data);

export const sendMessage = async (data) =>
  await axiosInstance
    .post(`/message/add-message`, data)
    .then((res) => res.data.data);

export const readMessage = async (data) =>
  await axiosInstance.put("/message/message-read", data);

export const deleteMessage = async (data) =>
  await axiosInstance.put("/message/delete-chat", data);

export const updateProfile = async (data) =>
  await axiosInstance
    .put("/users/edit-user", data)
    .then((res) => res.data.data);

export const updateProfileImage = async (data) =>
  await axiosInstance
    .put("/users/edit-image", data)
    .then((res) => res.data.data);

export const getUser = async (userId) =>
  await axiosInstance
    .get(`/users/get-user-by-id?userId=${userId}`)
    .then((res) => res.data.data)
    .catch(() => null);

export const addFeedback = async (data) =>
  await axiosInstance
    .post("/rating/add-feedback", data)
    .then((res) => res.data.data);

export const addProfileImage = async (data) =>
  await axiosInstance
    .post("/resources/add-image", data)
    .then((res) => res.data.data);
