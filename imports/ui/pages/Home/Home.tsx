import { useNavigate } from "@solidjs/router";
import { Button } from "~/components/button";

export const Home = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div>{props.children}</div>
    </>
  );
};
