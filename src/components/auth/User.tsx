import { createContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./auth-context";
import axios from "axios";

interface UserContextProps {
  user: UserInfo;
  setUser: (newUser: UserInfo) => void;
}

export interface UserInfo {
  id: string;
  email: string;
  username: string;
  name: string;
}

export const UserContext = createContext<UserContextProps | null>(null);

const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userID, setUserID] = useState<string>("");

  const setUser = (newUser: UserInfo) => {
    setUserID(newUser.id);
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
        .get(url, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((response) => {
          const newUser: UserInfo = {
            id: response.data.id,
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
      id: userID,
      email: userEmail,
      username: username,
      name: name,
    };

    const context: UserContextProps = {
      user: currentUser,
      setUser: setUser,
    };
    return context;
  }, [userEmail, username, name, userID]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
