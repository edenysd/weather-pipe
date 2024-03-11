import { HashRouter as Router, useNavigate } from "@solidjs/router";
import { App } from "~/App";
import { NotFound } from "~/pages/404";
import { Dashboard } from "~/pages/Home/Dashboard/Dashboard";
import { HomeLayout } from "~/pages/Home/HomeLayout";
import { Login } from "~/pages/Login/Login";

const routes = [
  {
    path: "/",
    component: Login,
  },
  {
    path: "/home",
    component: HomeLayout,
    children: [
      {
        path: "/",
        component: Dashboard,
      },
      {
        path: "/dashboard",
        component: Dashboard,
      },
      {
        path: "/map",
        component: Dashboard,
      },
    ],
  },
  {
    path: "/404",
    component: NotFound,
  },
  {
    path: "/*all",
    component: NotFound,
  },
];

export const AppRouter = () => {
  return <Router root={App}>{routes}</Router>;
};
