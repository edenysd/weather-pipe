import { Show, createSignal, onCleanup } from "solid-js";
import { Tracker } from "meteor/tracker";
import { LocationsData } from "../../../../api/collections/LocationsData";
import { UserPreferences } from "../../../../api/collections/UserPreferences";

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
    console.log(preferences);
    setProcessedPreferences(preferences);
  });
  onCleanup(() => {
    locationsSubscription.stop();
    preferencesSubscription.stop();
  });

  return (
    <div class="w-full h-full flex flex-col items-center p-4 gap-4">
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
          fallback={<div>My Content</div>}
        >
          ADD LOCATION
        </Show>
      </Show>
    </div>
  );
};
