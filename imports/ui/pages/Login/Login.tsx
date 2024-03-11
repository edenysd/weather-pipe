import { SignUpCard } from "./AuthenticationCard";
import { WiDust } from "solid-icons/wi";

export const Login = () => {
  return (
    <section class="flex flex-col lg:flex-row lg:justify-evenly gap-5 items-center justify-center absolute top-0 h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div class="flex flex-col items-center justify-center">
        <WiDust class="text-9xl" color="white" />
        <h1 class="text-4xl md:text-7xl -translate-y-4 text-white">
          Weather Pipe
        </h1>
      </div>
      <div class="p-3 md:p-0 lg:w-1/3">
        <SignUpCard />
      </div>
    </section>
  );
};
