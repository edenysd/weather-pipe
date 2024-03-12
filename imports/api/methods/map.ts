import { check } from "meteor/check";
import axios from "axios";
let i = 0;
export const startMethodMap = () => {
  Meteor.methods({
    async map({ tileCoord }) {
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
      this.unblock();

      try {
        const response = await axios.get(
          `https://tile.openstreetmap.org/${tileCoord[0]}/${tileCoord[1]}/${tileCoord[2]}.png`,
          {
            responseType: "arraybuffer",
          }
        );

        return (
          "data:image/[format]; base64," +
          Buffer.from(response.data, "binary").toString("base64")
        );
      } catch (e) {
        throw new Meteor.Error("tile-error", "failed to fetch tile");
      }
    },
  });
};
