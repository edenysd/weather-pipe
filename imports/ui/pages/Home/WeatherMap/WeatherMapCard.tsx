import * as Card from "~/components/card";
import { cx } from "~/lib/create-style-context";
import { OLMapDashboard } from "./OLMapWeather";
import { Button } from "~/components/button";
import { createSignal } from "solid-js";

export const WeatherMapCard = () => {
  const [layer, setLayer] = createSignal("");
  return (
    <Card.Root
      class={cx(
        "w-full h-full transition-all duration-300 shadow-sm border-[1px]"
      )}
      maxW="full"
    >
      <Card.Header>
        <Card.Title>Add new location</Card.Title>
      </Card.Header>
      <Card.Body class="w-full h-full grid grid-cols-1 gap-8">
        <div class="h-full">
          <OLMapDashboard layer={layer} />
        </div>
      </Card.Body>
      <Card.Footer class="flex justify-between items-center">
        <Button type="submit">ADD LOCATION</Button>
      </Card.Footer>
    </Card.Root>
  );
};
