import { Meteor } from "meteor/meteor";
import { UserPreferences } from "../collections/UserPreferences";
import {
  addUserOWSubscription,
  removeUserOWSubscription,
} from "../timers/OWTimer";

export const publishUserPreferencesDashboard = () => {
  Meteor.publish("dashboard-user-preferences", function (listId, limit) {
    //Secure publication
    if (!this.userId) {
      return this.ready();
    }
    addUserOWSubscription(this.userId);
    this.onStop(() => {
      removeUserOWSubscription(this.userId);
    });

    return UserPreferences.find({
      userId: this.userId,
    });
  });
};
