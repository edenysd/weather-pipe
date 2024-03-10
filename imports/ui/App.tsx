import { createToaster } from "@ark-ui/solid";
import { onMount } from "solid-js";
import * as Toast from "~/components/toast";
import { tryLogInWithCookies } from "./lib/auth";
import { useNavigate } from "@solidjs/router";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
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
