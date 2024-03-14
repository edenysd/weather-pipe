import { Index, createEffect, createSignal } from "solid-js";
import * as Card from "~/components/card";
import { ForecastElement } from "./ForecastElement";

const hourTimeFormatter = new Intl.DateTimeFormat("en", {
  timeStyle: "short",
});

const shortTimeFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  weekday: "short",
  day: "numeric",
});

export const LocationCard = ({ preference }) => {
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

  return (
    <Card.Root maxW="full" class="shadow-sm border-[1px]">
      <Card.Header class="p-4">
        <Card.Title>{preference().name}</Card.Title>
      </Card.Header>
      <Card.Body class="flex flex-col gap-4 p-4">
        <div class="flex flex-col items-center w-full">
          <div class="flex items-center h-fit">
            <img
              class="aspect-square w-28"
              src={`https://openweathermap.org/img/wn/${
                preference().current?.weather[0].icon
              }@4x.png`}
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
        <div class="flex items-center justify-center w-full p-4">
          <Index each={forecastedList()} fallback={"-"}>
            {(forecast) => <ForecastElement forecast={forecast()} />}
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
