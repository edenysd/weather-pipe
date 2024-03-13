import { Meteor } from "meteor/meteor";
import { LocationsData } from "../collections/LocationsData";
import { UserPreferences } from "../collections/UserPreferences";
import { publishComposite } from "meteor/reywood:publish-composite";

export const publishLocationsDashboard = () => {
  publishComposite("dashboard-locations", function (listId, limit) {
    //Secure publication
    if (!this.userId) {
      return this.ready();
    }
    const userId = this.userId;
    return {
      find() {
        return UserPreferences.find({
          userId,
        });
      },
      children: [
        {
          find(userPreferencesLocationIds) {
            return LocationsData.find({
              _id: userPreferencesLocationIds.locationId,
            });
          },
        },
      ],
    };
  });
};
