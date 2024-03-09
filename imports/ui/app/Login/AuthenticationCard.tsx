import { Button } from "~/components/button";
import * as Card from "~/components/card";
import { Input } from "~/components/input";
import { AuthInfo, handleAuth } from "~/lib/auth";
import { formToJson } from "~/lib/utils";

export const AuthenticationCard = () => {
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
