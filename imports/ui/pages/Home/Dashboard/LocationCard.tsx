import { Index, createEffect, createSignal } from "solid-js";
import * as Card from "~/components/card";
import { ForecastElement } from "./ForecastElement";
import * as Menu from "~/components/menu";
import { TbDotsVertical, TbTrashFilled } from "solid-icons/tb";
import { FaSolidAnglesLeft, FaSolidAnglesRight } from "solid-icons/fa";
import { cx } from "~/lib/create-style-context";

const hourTimeFormatter = new Intl.DateTimeFormat("en", {
  timeStyle: "short",
});

const shortTimeFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  weekday: "short",
  day: "numeric",
});

export const LocationCard = ({
  preference,
  handleMove,
  handleRemove,
  isFirst,
  isLast,
}) => {
  const [forecastedList, setForecastedList] = createSignal([]);

  createEffect(() => {
    if (!preference().forecast) return;

    const forecast3H: [] = preference().forecast.list.map((ftemp: any) => ({
      dayStr: shortTimeFormatter.format(new Date(ftemp.dt * 1000)),
      minTemp: ftemp.main.temp_min,
      maxTemp: ftemp.main.temp_max,
      icon: ftemp.weather[0].icon,
    }));

    const forecastDays = [];
    for (let i = 0; i < forecast3H.length; i += 8) {
      forecastDays.push(forecast3H[i]);
    }

    setForecastedList(forecastDays);
  });
  console.log(isFirst, isLast);
  return (
    <Card.Root maxW="full" class="shadow-sm border-[1px]">
      <Card.Header class="flex flex-row justify-between p-4">
        <Card.Title class="w-fit">{preference().name}</Card.Title>
        <Menu.Root>
          <Menu.Trigger class="aspect-square w-6">
            <TbDotsVertical class="w-full h-full" />
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content class="w-full">
              <Menu.ItemGroup class="w-full" id="group-1">
                <Menu.Item
                  class="flex flex-row gap-2 text-base"
                  id="remove-location"
                  onClick={handleRemove}
                >
                  <TbTrashFilled />
                  Remove location
                </Menu.Item>
                <Menu.Item
                  class={cx(
                    "flex flex-row gap-2 text-base",
                    isFirst
                      ? "pointer-events-none text-gray-400 fill-gray-400"
                      : ""
                  )}
                  id="move-left"
                  onClick={async () => handleMove(+1)}
                >
                  <FaSolidAnglesLeft class="fill-inherit" />
                  Move Left
                </Menu.Item>
                <Menu.Item
                  class={cx(
                    "flex flex-row gap-2 text-base",
                    isLast
                      ? "pointer-events-none text-gray-400 fill-gray-400"
                      : ""
                  )}
                  id="move-rigth"
                  onClick={() => handleMove(-1)}
                >
                  <FaSolidAnglesRight class="fill-inherit" />
                  Move Right
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Card.Header>
      <Card.Body class="flex flex-col gap-4 p-4">
        <div class="flex flex-col items-center w-full">
          <div class="flex items-center h-fit">
            <img
              class="aspect-square w-28"
              src={`https://openweathermap.org/img/wn/${
                preference().current?.weather[0].icon
              }@4x.png`}
              style={{
                filter: "drop-shadow(2px 2px 5px #0004)",
              }}
            />
            <div class="flex flex-col items-center">
              <div class="text-3xl font-mono font-semibold tracking-tighter">
                {preference().current?.main.temp}°C
              </div>
              <div class="font-light">
                {preference().current?.weather[0].description}
              </div>
            </div>
          </div>
          <div class="text-xl font-semibold tracking-tighter italic  -translate-y-4">
            {preference().current?.name}
          </div>
        </div>
        <div class="flex items-center justify-evenly w-full p-4">
          <Index each={forecastedList()} fallback={"-"}>
            {(forecast, index) => (
              <ForecastElement forecast={forecast()} index={index} />
            )}
          </Index>
        </div>
      </Card.Body>
      <Card.Footer class="flex justify-between items-center p-4 pt-0 font-light text-sm">
        <div>
          Fetched:{" "}
          {hourTimeFormatter.format(new Date(preference().lastUpdate || null))}
        </div>
        <div>
          Updated:{" "}
          {hourTimeFormatter.format(
            new Date(preference().current?.dt * 1000 || null)
          )}
        </div>
      </Card.Footer>
    </Card.Root>
  );
};
