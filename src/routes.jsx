import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./pages/_layouts/auth";
import { MainLayout } from "./pages/_layouts/main";
import { Auth } from "./pages/auth";
import { Home } from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "/sign-in", element: <Auth /> }],
  },
]);
