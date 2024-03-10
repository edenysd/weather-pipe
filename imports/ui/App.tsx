import { createToaster } from "@ark-ui/solid";
import { onMount } from "solid-js";
import * as Toast from "~/components/toast";
import { tryLogInWithCookies } from "./lib/auth";
import { useNavigate } from "@solidjs/router";
import { FaSolidXmark } from "solid-icons/fa";
/**
 * @important
 * This invocation cause some warnings in SolidJS
 * about possible memory leaks. In the future
 * the toast property needs to by passed using
 * more secure techniques
 */
export const [Toaster, toast] = createToaster({
  placement: "top-end",
  render(toast: any) {
    return (
      <Toast.Root>
        <Toast.Title class="mb-2">{toast().title}</Toast.Title>
        <Toast.Description>{toast().description}</Toast.Description>
        <Toast.CloseTrigger>
          <FaSolidXmark />
        </Toast.CloseTrigger>
      </Toast.Root>
    );
  },
});

export const App = (props) => {
  const navigate = useNavigate();

  onMount(async () => {
    try {
      await tryLogInWithCookies();
      navigate("/home");
    } catch {}
  });

  return (
    <>
      <div>{props.children}</div>
      <Toaster />
    </>
  );
};
