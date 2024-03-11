import { HashRouter as Router } from "@solidjs/router";
import { App } from "~/App";
import { NotFound } from "~/pages/404";
import { Home } from "~/pages/Home/Home";
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
        component: Home,
      },
      {
        path: "/map",
        component: Home,
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
