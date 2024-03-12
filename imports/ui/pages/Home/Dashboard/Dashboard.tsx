import { createSignal } from "solid-js";
import { Button } from "~/components/button";
import { CreateNewLocationCard } from "./CreateNewLocationCard";

export const Dashboard = (props) => {
  const [draftNewLocation, setDraftNewLocation] = createSignal(false);

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
