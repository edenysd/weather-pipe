import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { createEffect, onMount } from "solid-js";
import { defaults as ControlDefaults } from "ol/control";
import { defaults as InteractionDefaults } from "ol/interaction";
import { Overlay } from "ol";
import { FaSolidMarker } from "solid-icons/fa";
import { useGeographic } from "ol/proj";

useGeographic();
export const OLMapDashboard = ({ lat, lng, setLat, setLng }) => {
  let overlayRef = null;

  createEffect(() => {
    const coordinate = [lat(), lng()];
    overlayRef?.setPosition(coordinate);
  });

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
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
        extent: [-180, -85, 180, 85],
      }),
      controls,
      interactions,
    });

    const markerElement = document.getElementById("marker");

    overlayRef = new Overlay({
      element: markerElement,
      autoPan: true,
      position: [0, 0],
    });

    map.addOverlay(overlayRef);
    map.on("singleclick", function (event) {
      if (event.pixel) {
        var coordinate = event.coordinate;
        overlayRef.setPosition(coordinate);
        setLat(coordinate[0]);
        setLng(coordinate[1]);
      } else {
        overlayRef.setPosition(undefined);
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
