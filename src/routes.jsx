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
import { MasterLayout } from "./pages/_layouts/master";

import { ListTenants } from "./pages/_master/tenant";
import { CreateTenant } from "./pages/_master/tenant/create";
import { UpdateTenant } from "./pages/_master/tenant/update";
import { CloneTenant } from "./pages/_master/tenant/clone";

import { ListUsers } from "./pages/users/list";

import { ListUsers as AdmListUsers } from "./pages/_master/users/list";
import { CreateUsers as AdmCreateUsers } from "./pages/_master/users/create";
import { UpdateUsers as AdmUpdateUsers } from "./pages/_master/users/update";
import { CloneUsers as AdmCloneUsers } from "./pages/_master/users/clone";

import { ListCoins } from "./pages/coins/list";
import { CreateCoins } from "./pages/coins/create";
import { UpdateCoins } from "./pages/coins/update";
import { CloneCoins } from "./pages/coins/clone";

import { ListBaseOmies } from "./pages/baseOmie/list";
import { CreateBaseOmies } from "./pages/baseOmie/create";
import { UpdateBaseOmies } from "./pages/baseOmie/update";
import { CloneBaseOmies } from "./pages/baseOmie/clone";
import { FirstAccess } from "./pages/login/firstLogin";

import { AccessDenied } from "./pages/accessDenied";
import { ListAssistant } from "./pages/_master/assistent";
import { CreateAssistant } from "./pages/_master/assistent/create";
import { UpdateAssistente } from "./pages/_master/assistent/update";
import { Settings } from "./pages/setting";
import { Triggers } from "./pages/triggers";
import { Rastreabilidade } from "./pages/rastreabilidade";

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

      { path: "/moedas", element: <ListCoins /> },
      { path: "/moedas/create", element: <CreateCoins /> },
      { path: "/moeda/:id", element: <UpdateCoins /> },
      { path: "/moeda/:id/clone", element: <CloneCoins /> },
      { path: "/base-omies", element: <ListBaseOmies /> },
      { path: "/base-omies/create", element: <CreateBaseOmies /> },
      { path: "/base-omie/:id", element: <UpdateBaseOmies /> },
      { path: "/base-omie/:id/clone", element: <CloneBaseOmies /> },
      { path: "/settings", element: <Settings /> },
      { path: "/settings/rastreabilidade", element: <Rastreabilidade /> },
      { path: "/gatilhos", element: <Triggers /> },
    ],
  },
  {
    path: "/adm",
    element: <MasterLayout />,
    children: [
      { path: "/adm/tenants/", element: <ListTenants /> },
      { path: "/adm/tenants/create", element: <CreateTenant /> },
      { path: "/adm/tenant/:id", element: <UpdateTenant /> },
      { path: "/adm/tenant/:id/clone", element: <CloneTenant /> },
      { path: "/adm/usuarios", element: <AdmListUsers /> },
      { path: "/adm/usuarios/create", element: <AdmCreateUsers /> },
      { path: "/adm/usuario/:id", element: <AdmUpdateUsers /> },
      { path: "/adm/usuario/:id/clone", element: <AdmCloneUsers /> },

      { path: "/adm/assistentes/", element: <ListAssistant /> },
      { path: "/adm/assistentes/create", element: <CreateAssistant /> },
      { path: "/adm/assistentes/:id", element: <UpdateAssistente /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/multi-tenant", element: <MultiTenant /> },
      { path: "/primeiro-acesso", element: <FirstAccess /> },
      { path: "/acesso-negado", element: <AccessDenied /> },
    ],
  },
]);
