import { createMemo, onMount } from "solid-js";
import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";
import { useLocation, useNavigate } from "@solidjs/router";
import { Meteor } from "meteor/meteor";

export const HomeLayout = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = createMemo(() => location.pathname);

  onMount(async () => {
    // Send unauthenticated users to login page
    if (!Meteor.user()) {
      navigate("/");
      return;
    }

    //Redirect /dashboard
    if (pathname() === "/home") {
      navigate("dashboard");
    }
  });

  if (!Meteor.user()) return null;

  return (
    <>
      <SideBar>
        <NavBar />
        <div>{props.children}</div>
      </SideBar>
    </>
  );
};
