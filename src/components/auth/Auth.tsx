import axios from "axios";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserInfo } from "./User";
import { useUserInfo } from "./usr-context";
type AuthProviderProps = {
  token: string | null;
  setToken: (newToken: string) => void;
};

export const AuthContext = createContext<AuthProviderProps | null>(null);
const baseURL = import.meta.env.VITE_API_URL;
const url = baseURL + "user/get";

const AuthProvider = ({ children }) => {
  const user = useUserInfo();
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("access_token"));
  // Function to set the authentication token
  const setToken = useCallback(
    (newToken: string) => {
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        })
        .then((response) => {
          const newUser: UserInfo = {
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
            name: response.data.name,
          };
          user?.setUser(newUser);
        })
        .catch((response) => {
          console.log(response);
        });
      setToken_(newToken);
    },
    [user]
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ` + token;
      localStorage.setItem("access_token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("access_token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token, setToken]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
