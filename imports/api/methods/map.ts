import { check } from "meteor/check";
import axios from "axios";
let loadedTiles = 0;
export const startMethodMap = () => {
  Meteor.methods({
    async map({ tileCoord, layer }) {
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
        console.log("Loaded Tiles", loadedTiles++);
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
