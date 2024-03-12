import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { onMount } from "solid-js";
import { defaults as ControlDefaults } from "ol/control";
import { defaults as InteractionDefaults } from "ol/interaction";
import { Overlay } from "ol";
import { FaSolidMarker } from "solid-icons/fa";

export const OLMapDashboard = (props) => {
  onMount(() => {
    const controls = ControlDefaults({ rotate: false });
    const interactions = InteractionDefaults({
      altShiftDragRotate: false,
      pinchRotate: false,
    });

    const map = new Map({
      target: "map-dashboard",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
      controls,
      interactions,
    });

    const markerElement = document.getElementById("marker");

    var overlay = new Overlay({
      element: markerElement,
      autoPan: true,
      position: [0, 0],
    });

    map.addOverlay(overlay);
    map.on("singleclick", function (event) {
      if (event.pixel) {
        var coordinate = event.coordinate;
        overlay.setPosition(coordinate);
      } else {
        overlay.setPosition(undefined);
      }
    });
  });
  return (
    <div class="w-full h-full relative">
      <div id="map-dashboard" class="w-full h-full"></div>
      <FaSolidMarker
        class="-translate-y-full pointer-events-none"
        size={24}
        id="marker"
      />
    </div>
  );
};
