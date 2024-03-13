import { createSignal, onCleanup } from "solid-js";
import { Button } from "~/components/button";
import { CreateNewLocationCard } from "./CreateNewLocationCard";
import { Tracker } from "meteor/tracker";
import { LocationsData } from "../../../../api/collections/LocationsData";
import { UserPreferences } from "../../../../api/collections/UserPreferences";

export const Dashboard = (props) => {
  const [draftNewLocation, setDraftNewLocation] = createSignal(false);

  const locationsSubscription = Meteor.subscribe("dashboard-locations");
  const preferencesSubscription = Meteor.subscribe(
    "dashboard-user-preferences"
  );

  const [isReady, setIsReady] = createSignal(
    locationsSubscription.ready() && preferencesSubscription.ready()
  );

  const [links, setLinks] = createSignal([]);

  Tracker.autorun(async () => {
    setIsReady(
      locationsSubscription.ready() && preferencesSubscription.ready()
    );
    console.log(LocationsData.find().fetch());
    console.log(UserPreferences.find().fetch());
  });
  onCleanup(() => {
    locationsSubscription.stop();
  });
  return (
    <div class="w-full h-full flex flex-col items-center p-8 gap-8">
      <section class="flex flex-col items-center gap-4">
        <h3 class="text-2xl text-gray-700 font-light">
          Welcome <b>{Meteor.user().username}</b>
        </h3>
        {draftNewLocation() ? (
          <Button
            class="w-40 border-red-700 text-red-900"
            variant="outline"
            onClick={() => setDraftNewLocation(false)}
          >
            CANCEL CREATION
          </Button>
        ) : (
          <Button class="w-40" onClick={() => setDraftNewLocation(true)}>
            NEW LOCATION
          </Button>
        )}
      </section>
      <CreateNewLocationCard draftNewLocation={draftNewLocation} />
    </div>
  );
};
