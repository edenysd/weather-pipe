/* @refresh reload */
import { Meteor } from "meteor/meteor";
import { render } from "solid-js/web";
import { AppRouter } from "./router/router";

Meteor.startup(() => {
  render(() => <AppRouter />, document.getElementById("root"));
});
