import { createToaster } from "@ark-ui/solid";
import { createSignal, onMount } from "solid-js";
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
  const [loading, setLoading] = createSignal(true);
  onMount(async () => {
    try {
      await tryLogInWithCookies();
      navigate("/home");
      setLoading(false);
    } catch {}
  });

  return (
    <>
      {loading() ? (
        <div class="h-screen w-screen flex items-center justify-center text-4xl">
          <h1 class="relative flex items-center justify-center gap-4">
            {/* Ping */}
            <span class="relative flex h-7 w-7 justify-center items-center">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
              <span class="relative inline-flex rounded-full h-5 w-5 bg-black"></span>
            </span>
          </h1>
        </div>
      ) : (
        <>
          <div>{props.children}</div>
          <Toaster />
        </>
      )}
    </>
  );
};
