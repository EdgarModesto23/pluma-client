import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./Auth";
import axios from "axios";

export interface UserInfo {
  email: string;
  username: string;
  name: string;
}

const UserContext = createContext<UserInfo | null>(null);

const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");

  const setUser = (newUser: UserInfo) => {
    setUserEmail(newUser.email);
    setUsername(newUser.username);
    setName(newUser.name);
  };
  const baseURL = import.meta.env.VITE_API_URL;
  const url = baseURL + "user/get";
  const token = useAuth();

  useEffect(() => {
    if (token?.token) {
      axios
        .get(url)
        .then((response) => {
          const newUser: UserInfo = {
            email: response.data.email,
            username: response.data.username,
            name: response.data.name,
          };
          setUser(newUser);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  });

  const contextValue = useMemo(() => {
    const currentUser: UserInfo = {
      email: userEmail,
      username: username,
      name: name,
    };
    return currentUser;
  }, [userEmail, username, name]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
export const useUserInfo = () => {
  return useContext(UserContext);
};

export default UserProvider;
