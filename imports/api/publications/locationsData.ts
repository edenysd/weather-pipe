import { Meteor } from "meteor/meteor";
import { LocationsData } from "../collections/LocationsData";
import { UserPreferences } from "../collections/UserPreferences";

export const publishLocationsDashboard = () => {
  Meteor.publish("dashboard-locations", function (listId, limit) {
    //Secure publication
    if (!this.userId) {
      return this.ready();
    }

    const userPreferencesLocationIds = UserPreferences.find({
      userId: this.userId,
    }).map((preference) => preference.locationId);

    return LocationsData.find({
      _id: { $in: userPreferencesLocationIds },
    });
  });
};
