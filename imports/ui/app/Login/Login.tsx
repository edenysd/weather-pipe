import { createSignal } from "solid-js";

import { Button } from "~/components/button";
import * as Card from "~/components/card";
import { Input } from "~/components/input";
import { formToJson } from "~/lib/utils";

type AuthInfo = { name: string; password: string };

export const AuthenticationCard = ({ handleAuth = (v: AuthInfo) => {} }) => {
  const handleAuthentication = (event: SubmitEvent) => {
    event.preventDefault();

    handleAuth(formToJson(event.target as HTMLFormElement) as AuthInfo);
  };

  return (
    <Card.Root maxW="sm">
      <Card.Header>
        <Card.Title>Sign Up</Card.Title>
        <Card.Description>
          Create an account and discover the worlds' best UI component
          framework.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <form id="form-login" onSubmit={handleAuthentication}>
          <label for="name">E-Mail</label>
          <Input id="name" name="name" placeholder="Your E-Mail" />

          <label for="password">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Your Password"
          />
        </form>
      </Card.Body>
      <Card.Footer>
        <Button form="form-login" formAction="submit">
          Create Account
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export const Login = () => {
  const [logged, setlogged] = createSignal(false);

  const handleAuth = (authInfo: AuthInfo) => {
    console.log(authInfo);
  };

  return (
    <section class="flex flex-col items-center justify-center absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <div class="p-3 md:p-0 lg:w-1/3">
        <AuthenticationCard handleAuth={handleAuth} />
      </div>
    </section>
  );
};
