import { check } from "meteor/check";
import axios from "axios";

export const startMethodMapProxy = () => {
  Meteor.methods({
    async ["map-proxy"]({ tileCoord, layer }) {
      if (!this.userId) {
        throw new Meteor.Error(
          "not-permited",
          "Please log in to call this method"
        );
      }

      if (tileCoord?.length !== 3) {
        throw new Meteor.Error(
          "validation-error",
          "tilecoord must be an array with 3 elements"
        );
      }

      check(tileCoord[0], Number);
      check(tileCoord[1], Number);
      check(tileCoord[2], Number);
      check(layer, String);
      this.unblock();

      try {
        const response = await axios.get(
          `https://tile.openweathermap.org/map/${layer}/${tileCoord[0]}/${tileCoord[1]}/${tileCoord[2]}.png?appid=${Meteor.settings.OW_API_KEY}`,
          {
            responseType: "arraybuffer",
          }
        );

        return (
          "data:image/png; base64," +
          Buffer.from(response.data, "binary").toString("base64")
        );
      } catch (e) {
        console.error(e);
        throw new Meteor.Error("tile-error", "failed to fetch tile");
      }
    },
  });
};
