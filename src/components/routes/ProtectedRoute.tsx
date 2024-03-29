import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/auth-context";

export const ProtectedRoute = () => {
  const token = useAuth();
  if (!token?.token) {
    return <Navigate to="/login/" />;
  }

  return <Outlet />;
};
