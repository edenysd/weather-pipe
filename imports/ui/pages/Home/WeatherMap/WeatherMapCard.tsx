import * as Card from "~/components/card";
import { cx } from "~/lib/create-style-context";
import { OLMapDashboard } from "./OLMapWeather";
import { createSignal } from "solid-js";
import * as Select from "~/components/select";
import { FaSolidCheck, FaSolidUpDown } from "solid-icons/fa";

const LAYER_OPTIONS = [
  {
    value: "temp_new",
    label: "Temperature",
  },
  {
    value: "wind_new",
    label: "Wind speed",
  },
  {
    value: "clouds_new",
    label: "Clouds",
  },
  {
    value: "precipitation_new",
    label: "Precipitation",
  },
  {
    value: "pressure_new",
    label: "Sea level pressure",
  },
];

export const WeatherMapCard = () => {
  const [layer, setLayer] = createSignal("temp_new");
  return (
    <Card.Root
      class={cx(
        "w-full h-full transition-all duration-300 shadow-sm border-[1px]"
      )}
      maxW="full"
    >
      <Card.Header class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <Select.Root
          positioning={{ sameWidth: true }}
          items={LAYER_OPTIONS}
          value={[layer()]}
          onValueChange={(e) => {
            setLayer(e.value[0]);
          }}
        >
          <Select.Label>Layer</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select a layer" />
              <FaSolidUpDown />
            </Select.Trigger>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              <Select.ItemGroup id="layer">
                {LAYER_OPTIONS.map((item) => (
                  <Select.Item item={item}>
                    <Select.ItemText>{item.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <FaSolidCheck />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </Card.Header>
      <Card.Body class="w-full h-full grid grid-cols-1 p-0">
        <div class="h-full">
          <OLMapDashboard layer={layer} />
        </div>
      </Card.Body>
    </Card.Root>
  );
};
