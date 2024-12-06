import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./pages/_layouts/auth";
import { MainLayout } from "./pages/_layouts/main";
import { Login } from "./pages/login";
import { Home } from "./pages/home";

import { ListIncludes } from "./pages/inlcudes/list";
import { ListTemplates } from "./pages/templates/list";
import { CreateInclude } from "./pages/inlcudes/create";
import { CreateTemplate } from "./pages/templates/create";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/includes",
        element: <ListIncludes />,
      },
      {
        path: "/includes/create",
        element: <CreateInclude />,
      },
      {
        path: "/templates",
        element: <ListTemplates />,
      },
      {
        path: "/templates/create",
        element: <CreateTemplate />,
      },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
]);
