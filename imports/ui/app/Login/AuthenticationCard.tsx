import { createSignal } from "solid-js";
import { Button } from "~/components/button";
import * as Card from "~/components/card";
import * as Tabs from "~/components/tabs";
import { FormLabel } from "~/components/form-label";
import { Input } from "~/components/input";
import { AuthInfo, logIn, signUp } from "~/lib/auth";
import { formToJson } from "~/lib/utils";
import { cx } from "~/lib/create-style-context";

/**
 * Need to manually create enum-like object
 * to be type-compatible with components
 */
const AUTH_VARIANTS = {
  SIGN_UP: "sign-up",
  LOG_IN: "log-in",
};

const AUTH_VARIANTS_CONFIGS = [
  {
    id: AUTH_VARIANTS.SIGN_UP,
    label: "SIGN UP",
    description:
      "Create an account with the required information if you don't have one yet.",
    cta: {
      label: "SIGN UP",
      classes: "bg-blue-700",
    },
  },
  {
    id: AUTH_VARIANTS.LOG_IN,
    label: "LOG IN",
    description:
      "Discover the bigest realtime dashboard of realtime weather data",
    cta: {
      label: "LOG IN",
      classes: "bg-green-700",
    },
  },
];

export const SignUpCard = () => {
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);

  const handleAuthentication = async (event: SubmitEvent, action: string) => {
    event.preventDefault();
    if (loading()) return;

    const authInfo = formToJson(event.target as HTMLFormElement) as AuthInfo;
    try {
      if (action == AUTH_VARIANTS.SIGN_UP) {
        await signUp(authInfo);
      }
      await logIn(authInfo);
    } catch (error) {
      setError(error.reason);
    }
  };

  return (
    <Card.Root maxW="sm">
      <Tabs.Root value={"log-in"}>
        <Card.Header>
          <Card.Title>
            <Tabs.List class="grid grid-flow-col">
              {AUTH_VARIANTS_CONFIGS.map((option) => (
                <Tabs.Trigger value={option.id}>{option.label}</Tabs.Trigger>
              ))}
              <Tabs.Indicator />
            </Tabs.List>
          </Card.Title>
          <Card.Description class="text-base">
            {AUTH_VARIANTS_CONFIGS.map((auth_variant) => (
              <Tabs.Content value={auth_variant.id}>
                {auth_variant.description}
              </Tabs.Content>
            ))}
          </Card.Description>
        </Card.Header>
        {AUTH_VARIANTS_CONFIGS.map((option) => (
          <Tabs.Content value={option.id}>
            <Card.Body>
              <form
                class="grid gap-3"
                id={option.id}
                onSubmit={(event) => handleAuthentication(event, option.id)}
              >
                <div>
                  <label for="username">Username</label>
                  <Input name="username" placeholder="Your Username" />
                </div>
                <div>
                  <label for="password">Password</label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Your Password"
                  />
                </div>

                <FormLabel class="text-red-700">{error()}</FormLabel>
              </form>
            </Card.Body>
            <Card.Footer>
              <Button
                class={cx(option.cta.classes, "relative w-1/3")}
                form={option.id}
                formAction="submit"
              >
                <span class="absolute flex h-4 w-4 -right-1 -top-1">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
                </span>
                {option.cta.label}
              </Button>
            </Card.Footer>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </Card.Root>
  );
};
