import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import { Button } from "~/components/button";

export const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };

  onMount(() => {
    navigate("/404");
  });
  return (
    <section class="flex flex-col items-center justify-center absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <h1 class="text-7xl text-black font-thin">Not Found</h1>
      <h1 class="text-5xl text-black mb-10">404</h1>
      <Button class="z-2" size="xl" color="black" onClick={goHome}>
        Go Home
      </Button>
    </section>
  );
};
