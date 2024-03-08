/* @refresh reload */
import { render } from "solid-js/web";
import { Meteor } from "meteor/meteor";
import { App } from "./App";
import { Login } from "./app/Login";

Meteor.startup(() => {
  render(
    () => (
      <Router root={App}>
        <Route path="/" component={Login} />
      </Router>
    ),
    document.getElementById("app")
  );
});
