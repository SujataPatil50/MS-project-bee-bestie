import axios from "axios";

import { toast } from "react-toastify";

const reqUse = async (config) => {
  config.headers = config.headers || {};

  config.headers["token"] = localStorage.getItem("token");

  return config;
};
const resUse = (response) =>
  new Promise((resolve) => {
    resolve(response);
  });
const resUseError = (error) => {
  if (error?.response?.data?.message) {
    toast.error(error.response.data.message);
  } else if (error?.message) {
    toast.error(error.message);
  }
  if (error?.response?.status === 401) {
    localStorage.clear();
    window.location.reload();
  }
  return new Promise((_, reject) => {
    reject({ ...error, error: true });
  });
};

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

axiosInstance.interceptors.request.use(reqUse);

axiosInstance.interceptors.response.use(resUse, resUseError);

export default axiosInstance;
