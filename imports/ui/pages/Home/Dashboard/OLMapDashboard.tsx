import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { onMount } from "solid-js";
import { defaults as ControlDefaults } from "ol/control";
import { defaults as InteractionDefaults } from "ol/interaction";

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
  });
  return <div id="map-dashboard" class="w-full h-full"></div>;
};
