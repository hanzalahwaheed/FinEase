import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: "",
});

export default userState;
