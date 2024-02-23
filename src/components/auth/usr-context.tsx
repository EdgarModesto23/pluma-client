import { useContext } from "react";
import { UserContext } from "./User";

export const useUserInfo = () => {
  return useContext(UserContext);
};
