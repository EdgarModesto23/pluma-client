import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth-context.tsx";
import { useContext, useEffect } from "react";
import { UserContext, UserInfo } from "./User.tsx";
const Logout = () => {
  const token = useAuth();
  const navigate = useNavigate();

  const user = useContext(UserContext);

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
    token?.setToken("");
  };

  setTimeout(() => {
    handleLogout();
  }, 100);

  return <>Logout Page</>;
};

export default Logout;
