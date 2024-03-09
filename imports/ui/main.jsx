/* @refresh reload */
import { Meteor } from "meteor/meteor";
import { render } from "solid-js/web";

import Cookies from "js-cookie";
import { createSignal } from "solid-js";
import { Login } from "./app/Login";
import { Router } from "@solidjs/router";

const routes = [
  {
    path: "/",
    component: Login,
  },
];

const COOKIE_ID = "lg-user-cookie";

export const App = (props) => {
  const [token, setToken] = createSignal(Cookies.get(COOKIE_ID));

  return (
    <>
      Adasasd
      <div>{props.children}</div>
    </>
  );
};

Meteor.startup(() => {
  render(
    () => <Router root={App}>{routes}</Router>,
    document.getElementById("root")
  );
});
