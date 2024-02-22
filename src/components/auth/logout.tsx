import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth.tsx";
import { useEffect } from "react";
import { UserInfo, useUserInfo } from "./User.tsx";
const Logout = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const user = useUserInfo();

  useEffect(() => {
    const noUser: UserInfo = {
      email: "",
      username: "",
      name: "",
      id: "",
    };

    if (!token?.token) {
      navigate("/login/");
      user?.setUser(noUser);
    }
  }, [token?.token, navigate, user]);

  const handleLogout = () => {
    token?.setToken();
  };

  setTimeout(() => {
    handleLogout();
  }, 100);

  return <>Logout Page</>;
};

export default Logout;
