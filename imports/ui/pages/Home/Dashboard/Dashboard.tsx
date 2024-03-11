import { useNavigate } from "@solidjs/router";
import { Button } from "~/components/button";

export const Dashboard = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <div>{props.children}</div>
    </>
  );
};
