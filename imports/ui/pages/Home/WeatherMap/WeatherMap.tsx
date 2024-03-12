import { WeatherMapCard } from "./WeatherMapCard";

export const WeatherMap = (props) => {
  return (
    <div class="w-full h-full flex flex-col items-center p-8 gap-8">
      <section class="flex flex-col w-full h-full items-center gap-4">
        <h3 class="text-2xl text-gray-700 font-light">
          Explore multiple climate parameters dynamically
        </h3>
        <WeatherMapCard />
      </section>
    </div>
  );
};
