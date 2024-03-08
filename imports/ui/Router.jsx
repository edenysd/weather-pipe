import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import Home from "./pages/Home";
import Users from "./pages/Users";

const App = (props) => (
  <>
    <h1>My Site with lots of pages</h1>
    {props.children}
  </>
);

render(
  () => (
    <Router root={App}>
      <Route path="/users" component={Users} />
      <Route path="/" component={Home} />
    </Router>
  ),
  document.getElementById("app")
);
