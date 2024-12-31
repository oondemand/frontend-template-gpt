import { createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "./pages/_layouts/auth";
import { MainLayout } from "./pages/_layouts/main";
import { Login } from "./pages/login";
import { Home } from "./pages/home";

import { ListIncludes } from "./pages/inlcudes/list";
import { CreateInclude } from "./pages/inlcudes/create";
import { UpdateInclude } from "./pages/inlcudes/update";
import { CloneInclude } from "./pages/inlcudes/clone";

import { ListTemplates } from "./pages/templates/list";
import { CreateTemplate } from "./pages/templates/create";
import { UpdateTemplate } from "./pages/templates/update";
import { CloneTemplate } from "./pages/templates/clone";

import { MultiTenant } from "./pages/login/multiTenant";
import { ListTenants } from "./pages/tenant";

import { MasterLayout } from "./pages/_layouts/master";
import { CreateTenant } from "./pages/tenant/create";
import { UpdateTenant } from "./pages/tenant/update";
import { CloneTenant } from "./pages/tenant/clone";

import { ListUsers } from "./pages/users/list";
import { CreateUsers } from "./pages/users/create";
import { UpdateUsers } from "./pages/users/update";

import { ListCoins } from "./pages/coins/list";
import { CreateCoins } from "./pages/coins/create";
import { UpdateCoins } from "./pages/coins/update";
import { CloneCoins } from "./pages/coins/clone";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/includes", element: <ListIncludes /> },
      { path: "/includes/create", element: <CreateInclude /> },
      { path: "/include/:id", element: <UpdateInclude /> },
      { path: "/include/:id/clone", element: <CloneInclude /> },
      { path: "/templates", element: <ListTemplates /> },
      { path: "/templates/create", element: <CreateTemplate /> },
      { path: "/template/:id", element: <UpdateTemplate /> },
      { path: "/template/:id/clone", element: <CloneTemplate /> },
      { path: "/usuarios", element: <ListUsers /> },
      { path: "/usuarios/create", element: <CreateUsers /> },
      { path: "/usuario/:id", element: <UpdateUsers /> },
      { path: "/usuario/:id/clone", element: <UpdateUsers /> },
      { path: "/moedas", element: <ListCoins /> },
      { path: "/moedas/create", element: <CreateCoins /> },
      { path: "/moeda/:id", element: <UpdateCoins /> },
      { path: "/moeda/:id/clone", element: <CloneCoins /> },
      {
        path: "/",
        element: <MasterLayout />,
        children: [
          { path: "/tenants/", element: <ListTenants /> },
          { path: "/tenants/create", element: <CreateTenant /> },
          { path: "/tenant/:id", element: <UpdateTenant /> },
          { path: "/tenant/:id/clone", element: <CloneTenant /> },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/multi-tenant", element: <MultiTenant /> },
    ],
  },
]);
