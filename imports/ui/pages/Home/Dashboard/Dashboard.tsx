import { createSignal } from "solid-js";
import { Button } from "~/components/button";
import * as Card from "~/components/card";
import { FormLabel } from "~/components/form-label";
import { Input } from "~/components/input";
import { cx } from "~/lib/create-style-context";

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
      <Card.Root
        class={cx(
          "w-full transition-all duration-300 h-fit shadow-sm",
          draftNewLocation()
            ? "max-h-[1000px] border-[1px]"
            : "max-h-0 border-0"
        )}
        maxW="full"
      >
        <Card.Header>
          <Card.Title>Add new location</Card.Title>
        </Card.Header>
        <Card.Body class="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div class="min-h-[400px]">MAP</div>
          <div>
            <div class="grid grid-cols-1 gap-4">
              <div>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter location name" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel>Lat</FormLabel>
                  <Input placeholder="Location latitude" />
                </div>
                <div>
                  <FormLabel>Lng</FormLabel>
                  <Input placeholder="Location longitude" />
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
        <Card.Footer class="flex justify-between items-center">
          <Button>ADD LOCATION</Button>
        </Card.Footer>
      </Card.Root>
    </div>
  );
};
