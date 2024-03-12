import { Meteor } from "meteor/meteor";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import OSM from "ol/source/OSM";
import { createEffect, onCleanup, onMount } from "solid-js";
import { defaults as ControlDefaults } from "ol/control";
import { defaults as InteractionDefaults } from "ol/interaction";
import { useGeographic } from "ol/proj";
import TileState from "ol/TileState";

useGeographic();
export const OLMapDashboard = ({ layer }) => {
  let layerRef = null;
  let mapRef: Map = null;
  let weatherLayerRef: TileLayer<XYZ> = null;

  createEffect(() => {
    layerRef = layer();

    if (mapRef) {
      weatherLayerRef.getSource().refresh();
      mapRef.render();
    }
  });

  onMount(() => {
    const controls = ControlDefaults({ rotate: false });
    const interactions = InteractionDefaults({
      altShiftDragRotate: false,
      pinchRotate: false,
    });

    weatherLayerRef = new TileLayer({
      source: new XYZ({
        url: "{x}{y}{z}",
        cacheSize: 3000,
        tileLoadFunction(tile, src) {
          Meteor.callAsync("map", {
            tileCoord: tile.tileCoord,
            layer: layerRef,
          })
            .then((data) => {
              //@ts-ignore problem with XYZ source definition
              tile.getImage().src = data;
            })
            .catch((e) => {
              tile.setState(TileState.ERROR);
            });
        },
      }),
    });

    mapRef = new Map({
      target: "map-dashboard",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        weatherLayerRef,
      ],
      view: new View({
        center: [0, 0],
        zoom: 4,
        extent: [-180, -85, 180, 85],
        maxZoom: 9,
        minZoom: 4,
        constrainResolution: true,
      }),
      controls,
      interactions,
    });
  });

  onCleanup(() => {
    mapRef.setTarget(null);
  });

  return (
    <div class="w-full h-full relative">
      <div id="map-dashboard" class="w-full h-full"></div>
    </div>
  );
};
