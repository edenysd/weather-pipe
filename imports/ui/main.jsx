/* @refresh reload */
import { Meteor } from "meteor/meteor";
import { render } from "solid-js/web";

import { lazy } from "solid-js";
import { Login } from "./app/Login";
import { Router } from "@solidjs/router";

const routes = [
  {
    path: "/",
    component: Login,
  },
];

export const App = () => {
  return (
    <div>
      <Router>{routes}</Router>
    </div>
  );
};

Meteor.startup(() => {
  render(() => <App />, document.getElementById("root"));
});
