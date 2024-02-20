import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AuthProvider from "./components/auth/Auth.tsx";
import Routes from "./components/routes/index.tsx";
import UserProvider from "./components/auth/User.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <Routes />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
