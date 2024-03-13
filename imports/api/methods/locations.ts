import { check } from "meteor/check";
import {
  UserPreferences,
  getNextOrderValue,
} from "../collections/UserPreferences";
import { Meteor } from "meteor/meteor";
import { updateLocationData } from "../collections/LocationsData";

export const startMethodAddLocation = () => {
  Meteor.methods({
    async ["add-location"]({ name, lat, lng }) {
      if (!this.userId) {
        throw new Meteor.Error(
          "not-permited",
          "Please log in to call this method"
        );
      }

      check(name, String);
      check(lat, Number);
      check(lng, Number);

      try {
        const locationId = await updateLocationData({ lat, lng });

        const draftUserPreference = {
          userId: this.userId,
          name,
          lat,
          lng,
          locationId,
          order: getNextOrderValue({ userId: this.userId }),
        };

        UserPreferences.insert(draftUserPreference);
      } catch (e) {
        console.error(e);
        throw new Meteor.Error(
          "add-location-error",
          "failed to add new location"
        );
      }
    },
  });
};
