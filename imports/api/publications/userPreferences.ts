import { Meteor } from "meteor/meteor";
import { UserPreferences } from "../collections/UserPreferences";

export const publishUserPreferencesDashboard = () => {
  Meteor.publish("dashboard-user-preferences", function (listId, limit) {
    //Secure publication
    if (!this.userId) {
      return this.ready();
    }

    return UserPreferences.find({
      userId: this.userId,
    });
  });
};
