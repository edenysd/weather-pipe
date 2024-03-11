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
    if (!Meteor.user()) {
      navigate("/");
      return;
    }
    //Redirect
    if (pathname() === "/home") {
      navigate("dashboard");
    }
  });

  return (
    <>
      <NavBar />
      <SideBar />
      <div>{props.children}</div>
    </>
  );
};
