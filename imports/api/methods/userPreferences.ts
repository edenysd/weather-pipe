import { check } from "meteor/check";
import {
  UserPreferences,
  getNextOrderValue,
} from "../collections/UserPreferences";
import { Meteor } from "meteor/meteor";

export const startMethodsUserPreferences = () => {
  Meteor.methods({
    async ["remove-preference"]({ id }) {
      if (!this.userId) {
        throw new Meteor.Error(
          "not-permited",
          "Please log in to call this method"
        );
      }

      check(id, String);

      try {
        UserPreferences.remove(id);
      } catch (e) {
        console.error(e);
        throw new Meteor.Error(
          "add-location-error",
          "failed to add new location"
        );
      }
    },
    async ["move-preference"]({ id, move }) {
      if (!this.userId) {
        throw new Meteor.Error(
          "not-permited",
          "Please log in to call this method"
        );
      }

      check(id, String);
      check(move, Number);

      try {
        const current = UserPreferences.findOne(id);
        if (move == -1) {
          const target = UserPreferences.find(
            {
              userId: this.userId,
              order: {
                $lt: current.order,
              },
            },
            {
              sort: {
                order: -1,
              },
              limit: 1,
            }
          ).fetch()[0];

          UserPreferences.update(target._id, {
            $set: { order: current.order },
          });
          UserPreferences.update(current._id, {
            $set: { order: target.order },
          });
        } else if (move == 1) {
          const target = UserPreferences.find(
            {
              userId: this.userId,
              order: {
                $gt: current.order,
              },
            },
            {
              sort: {
                order: 1,
              },
              limit: 1,
            }
          ).fetch()[0];

          UserPreferences.update(target._id, {
            $set: { order: current.order },
          });
          UserPreferences.update(current._id, {
            $set: { order: target.order },
          });
        } else {
          throw new Meteor.Error(
            "move-preference-error",
            "value must be 1 or -1"
          );
        }
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
