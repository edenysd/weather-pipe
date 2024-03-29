import * as Card from "~/components/card";
import { FormLabel } from "~/components/form-label";
import { Input } from "~/components/input";
import { cx } from "~/lib/create-style-context";
import { OLMapDashboard } from "./OLMapDashboard";
import { parseFloatAndClamp } from "~/lib/utils";
import { Button } from "~/components/button";
import { Show, createSignal } from "solid-js";
import { Meteor } from "meteor/meteor";
import { toast } from "~/App";

export const CreateNewLocationCard = ({ draftNewLocation }) => {
  const [lat, setLat] = createSignal(0);
  const [lng, setLng] = createSignal(0);
  const [loading, setLoading] = createSignal(false);
  const [locationName, setLocationName] = createSignal({
    value: "",
    error: "",
  });

  const clearFields = () => {
    setLat(0);
    setLng(0);
    setLocationName({
      value: "",
      error: "",
    });
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!locationName().value) {
      setLocationName((oldVal) => ({
        ...oldVal,
        error: "Name field is required",
      }));
      return;
    }
    setLoading(true);
    try {
      await Meteor.callAsync("add-location", {
        name: locationName().value,
        lat: lat(),
        lng: lng(),
      });
      toast().create({
        title: "Location Added",
        description: "Now we will track this location for you.",
      });
      clearFields();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div class="flex w-full overflow-visible">
      <Card.Root
        class={cx(
          "flex flex-col w-full transition-all duration-300 h-fit shadow-sm",
          draftNewLocation()
            ? "max-h-[1000px] border-[1px]"
            : "max-h-0 border-0"
        )}
        maxW="full"
      >
        <form onSubmit={handleSubmit}>
          <Card.Header class="p-4">
            <Card.Title>Add new location</Card.Title>
          </Card.Header>
          <Card.Description class="pl-4">
            Mark the location you want to track <b>on the map</b> and give it a
            name
          </Card.Description>
          <Card.Body class="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4">
            <div class="min-h-[400px]">
              <OLMapDashboard
                lat={lat}
                lng={lng}
                setLat={setLat}
                setLng={setLng}
              />
            </div>
            <div>
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <FormLabel>Name</FormLabel>
                  <Input
                    disabled={loading()}
                    value={locationName().value}
                    onChange={(e) =>
                      setLocationName((oldVal) => ({
                        ...oldVal,
                        value: e.target.value,
                      }))
                    }
                    placeholder="This name is for informational purposes only."
                  />
                  <FormLabel class="text-red-800">
                    {locationName().error}
                  </FormLabel>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <FormLabel>Lat</FormLabel>
                    <Input
                      disabled={loading()}
                      type="number"
                      step="any"
                      min={-180}
                      max={180}
                      value={lat()}
                      onChange={(e) =>
                        setLat(parseFloatAndClamp(e.target.value, -180, 180))
                      }
                      placeholder="Location latitude"
                    />
                  </div>
                  <div>
                    <FormLabel>Lng</FormLabel>
                    <Input
                      disabled={loading()}
                      min={-85}
                      max={85}
                      type="number"
                      step="any"
                      value={lng()}
                      onChange={(e) =>
                        setLng(
                          setLng(parseFloatAndClamp(e.target.value, -85, 85))
                        )
                      }
                      placeholder="Location longitude"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
          <Card.Footer class="flex justify-between items-center p-4 pt-0">
            <Button disabled={loading()} type="submit" class="w-32">
              <Show
                when={!loading()}
                fallback={
                  <div
                    class={
                      "h-7 w-7 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    }
                    role="status"
                  />
                }
              >
                ADD LOCATION
              </Show>
            </Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </div>
  );
};
