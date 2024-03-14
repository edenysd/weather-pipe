import { create } from "domain";
import { set } from "ol/transform";
import { createEffect, createSignal } from "solid-js";

export const ForecastElement = ({ forecast, index }) => {
  const [dayMonth, setDayMonth] = createSignal("");
  const [dayWeek, setDayWeek] = createSignal("");

  createEffect(() => {
    const [draftDWeek, draftDMonth] = forecast.dayStr.split(", ");
    setDayMonth(draftDMonth);
    setDayWeek(index == 0 ? "Today" : draftDWeek);
  });

  return (
    <div class="flex flex-col">
      <div class="flex flex-col items-center font-medium text-sm sm:text-base">
        <div>{dayWeek()}</div>
        <div>{dayMonth()}</div>
      </div>
      <img
        class="aspect-square w-12 sm:w-16"
        style={{
          filter: "drop-shadow(2px 2px 5px #0004)",
        }}
        src={`https://openweathermap.org/img/wn/${forecast.icon}@4x.png`}
      ></img>
      <div class="flex flex-col items-center font-medium text-sm sm:text-base bg-slate-500 text-white rounded-md gap-1 p-1">
        <div>{forecast.maxTemp}°</div>
        <div>{forecast.minTemp}°</div>
      </div>
    </div>
  );
};
