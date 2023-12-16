import { atom, useAtom } from "jotai";

const parsData = () => {
  let user = null;
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    return user;
  }
};

const userAtom = atom(parsData());

export const useUser = () => useAtom(userAtom);
