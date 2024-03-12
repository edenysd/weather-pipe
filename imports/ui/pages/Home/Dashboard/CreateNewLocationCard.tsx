import * as Card from "~/components/card";
import { FormLabel } from "~/components/form-label";
import { Input } from "~/components/input";
import { cx } from "~/lib/create-style-context";
import { OLMapDashboard } from "./OLMapDashboard";
import { parseFloatAndClamp } from "~/lib/utils";
import { Button } from "~/components/button";
import { createSignal } from "solid-js";

export const CreateNewLocationCard = ({ draftNewLocation }) => {
  const [lat, setLat] = createSignal(0);
  const [lng, setLng] = createSignal(0);
  const [locationName, setLocationName] = createSignal({
    value: "",
    error: "",
  });
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    if (!locationName().value) {
      setLocationName((oldVal) => ({
        ...oldVal,
        error: "Name field is required",
      }));
    }
  };
  return (
    <Card.Root
      class={cx(
        "w-full transition-all duration-300 h-fit shadow-sm",
        draftNewLocation() ? "max-h-[1000px] border-[1px]" : "max-h-0 border-0"
      )}
      maxW="full"
    >
      <form onSubmit={handleSubmit}>
        <Card.Header>
          <Card.Title>Add new location</Card.Title>
        </Card.Header>
        <Card.Body class="grid grid-cols-1 xl:grid-cols-2 gap-8">
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
                  value={locationName().value}
                  onChange={(e) =>
                    setLocationName((oldVal) => ({
                      ...oldVal,
                      value: e.target.value,
                    }))
                  }
                  placeholder="Enter location name"
                />
                <FormLabel class="text-red-800">
                  {locationName().error}
                </FormLabel>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <FormLabel>Lat</FormLabel>
                  <Input
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
        <Card.Footer class="flex justify-between items-center">
          <Button type="submit">ADD LOCATION</Button>
        </Card.Footer>
      </form>
    </Card.Root>
  );
};
