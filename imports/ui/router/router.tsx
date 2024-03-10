import { Router } from "@solidjs/router";
import { App } from "~/App";
import { NotFound } from "~/pages/404";
import { Login } from "~/pages/Login/Login";

const routes = [
  {
    path: "/",
    component: Login,
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
