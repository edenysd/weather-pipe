import { createSignal } from "solid-js";

import { Button } from "~/components/button";
import * as Card from "~/components/card";
import { Input } from "~/components/input";

export const AuthenticationCard = () => {
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
        <label for="name">E-Mail</label>
        <Input id="name" placeholder="Your E-Mail" />

        <label for="password">Password</label>
        <Input id="password" type="password" placeholder="Your Password" />
      </Card.Body>
      <Card.Footer>
        <Button width="full">Create Account</Button>
      </Card.Footer>
    </Card.Root>
  );
};

export const Login = () => {
  const [logged, setlogged] = createSignal(false);
  return (
    <section class="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
      <AuthenticationCard />
    </section>
  );
};
