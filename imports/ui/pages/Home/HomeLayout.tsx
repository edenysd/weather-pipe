import { NavBar } from "./NavBar";
import { SideBar } from "./SideBar";

export const HomeLayout = (props) => {
  return (
    <>
      <NavBar />
      <SideBar />
      <div>{props.children}</div>
    </>
  );
};
