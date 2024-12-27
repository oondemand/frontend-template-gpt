import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./pages/_layouts/auth";
import { MainLayout } from "./pages/_layouts/main";
import { Login } from "./pages/login";
import { Home } from "./pages/home";

import { ListIncludes } from "./pages/inlcudes/list";
import { ListTemplates } from "./pages/templates/list";
import { CreateInclude } from "./pages/inlcudes/create";
import { UpdateInclude } from "./pages/inlcudes/update";

import { CreateTemplate } from "./pages/templates/create";
import { UpdateTemplate } from "./pages/templates/update";

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
        path: "/include/:id",
        element: <UpdateInclude />,
      },
      {
        path: "/templates",
        element: <ListTemplates />,
      },
      {
        path: "/templates/create",
        element: <CreateTemplate />,
      },
      {
        path: "/template/:id",
        element: <UpdateTemplate />,
      },
    ],
  },

  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
]);
