import { AuthenticationCard } from "./AuthenticationCard";

export const Login = () => {
  return (
    <section class="flex flex-col items-center justify-center absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div class="p-3 md:p-0 lg:w-1/3">
        <AuthenticationCard />
      </div>
    </section>
  );
};
