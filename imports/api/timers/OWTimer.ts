import {
  LocationsData,
  updateLocationData,
} from "../collections/LocationsData";
import { UserPreferences } from "../collections/UserPreferences";

const userOWSubscriptionCount = new Map();
export const addUserOWSubscription = (userId) => {
  userOWSubscriptionCount.set(
    userId,
    (userOWSubscriptionCount.get(userId) || 0) + 1
  );
};

export const removeUserOWSubscription = (userId) => {
  userOWSubscriptionCount.set(
    userId,
    (userOWSubscriptionCount.get(userId) || 0) - 1
  );
};

export const createOWTimer = () => {
  Meteor.setInterval(() => {
    const subscriptedUserList = [];
    userOWSubscriptionCount.forEach((subscriptionCount, userId) => {
      if (subscriptionCount > 0) subscriptedUserList.push(userId);
    });

    const coorArr = UserPreferences.find(
      {
        userId: {
          $in: subscriptedUserList,
        },
      },
      {
        fields: {
          _id: 0,
          locationId: 1,
        },
      }
    )
      .fetch()
      .map((doc) => doc.locationId);

    const uniqueCoordArray = [...new Set(coorArr as Array<Object>)];

    const uniqueLocationsCoords = LocationsData.find(
      {
        _id: { $in: uniqueCoordArray },
      },
      {
        fields: {
          _id: 0,
          lat: 1,
          lng: 1,
        },
      }
    ).fetch();

    uniqueLocationsCoords.forEach(updateLocationData);
  }, 1000 * 60);
};
