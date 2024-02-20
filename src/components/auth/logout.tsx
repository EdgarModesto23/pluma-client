import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth.tsx";
import { useEffect } from "react";

const Logout = () => {
  const token = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token?.token) {
      navigate("/login/");
    }
  }, [token?.token, navigate]);

  const handleLogout = () => {
    token?.setToken();
  };

  setTimeout(() => {
    handleLogout();
  }, 100);

  return <>Logout Page</>;
};

export default Logout;
