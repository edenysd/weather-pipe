import { Show, createSignal, onCleanup } from "solid-js";
import { Tracker } from "meteor/tracker";
import { LocationsData } from "../../../../api/collections/LocationsData";
import { UserPreferences } from "../../../../api/collections/UserPreferences";
import { Index } from "solid-js";
import { LocationCard } from "./LocationCard";

export const DashboardLocationsList = (props) => {
  const locationsSubscription = Meteor.subscribe("dashboard-locations");
  const preferencesSubscription = Meteor.subscribe(
    "dashboard-user-preferences"
  );

  const [processedPreferences, setProcessedPreferences] = createSignal([]);

  const [isReady, setIsReady] = createSignal(
    locationsSubscription.ready() && preferencesSubscription.ready()
  );

  Tracker.autorun(async () => {
    setIsReady(
      locationsSubscription.ready() && preferencesSubscription.ready()
    );

    const locations = LocationsData.find().fetch();
    if (!locations.length) return;

    const locationsMap = {};
    locations.forEach((location) => {
      locationsMap[location._id] = location;
    });

    const rawPreferences = UserPreferences.find(
      {},
      { sort: { order: -1 } }
    ).fetch();
    const preferences = rawPreferences.map((rawPreference) => {
      return {
        ...rawPreference,
        current: locationsMap[rawPreference.locationId]?.current,
        forecast: locationsMap[rawPreference.locationId]?.forecast,
        lastUpdate: locationsMap[rawPreference.locationId]?.lastUpdate,
      };
    });

    setProcessedPreferences(preferences);
  });

  onCleanup(() => {
    locationsSubscription.stop();
    preferencesSubscription.stop();
  });

  return (
    <div class="w-full h-full flex flex-col items-center">
      <Show
        when={isReady()}
        fallback={
          <div
            class={
              "h-7 w-7 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
            }
            role="status"
          />
        }
      >
        <Show
          when={processedPreferences().length}
          fallback={
            <h1 class="text-xl font-light">
              ☝️ Add new locations to keep track ☝️
            </h1>
          }
        >
          <div class="grid grid-cols-1 xl:grid-cols-2 w-full gap-4">
            <Index
              each={processedPreferences()}
              fallback={
                <h1 class="text-xl font-light">
                  ☝️ Add new locations to keep track ☝️
                </h1>
              }
            >
              {(preference, index) => (
                <LocationCard
                  preference={preference}
                  isFirst={index == 0}
                  isLast={index == processedPreferences().length - 1}
                  handleRemove={() => {
                    console.log(preference());
                    Meteor.call("remove-preference", { id: preference()._id });
                  }}
                  handleMove={(move) => {
                    Meteor.call("move-preference", {
                      id: preference()._id,
                      move,
                    });
                  }}
                />
              )}
            </Index>
          </div>
        </Show>
      </Show>
    </div>
  );
};
