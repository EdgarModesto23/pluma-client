import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import { ProtectedRoute } from "./ProtectedRoute";
import App from "../pages/App";
import SignIn from "../pages/sign-in";
import Register from "../pages/register";
import Logout from "../auth/logout";

const Routes = () => {
  const token = useAuth();

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/app/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/app/",
          element: <App />,
          children: [
            {
              path: "/app/:boardid",
              element: <App />,
            },
          ],
        },
        {
          path: "/app/logout",
          element: <Logout />,
        },
      ],
    },
    {
      path: "/login/",
      element: <SignIn />,
    },
    {
      path: "/register/",
      element: <Register />,
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <SignIn />,
    },
    {
      path: "/login/",
      element: <SignIn />,
    },
    {
      path: "/register/",
      element: <Register />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...(!token?.token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
