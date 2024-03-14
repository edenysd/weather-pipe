import {
  LocationsData,
  updateLocationData,
} from "../collections/LocationsData";
import { UserPreferences } from "../collections/UserPreferences";

export const userOWSubscriptionCount = new Map();

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

export function getAllLocationsCoordForSubcribedUsers() {
  const subscribedUserList = [];
  userOWSubscriptionCount.forEach((subscriptionCount, userId) => {
    if (subscriptionCount > 0) subscribedUserList.push(userId);
  });

  const coorArr = UserPreferences.find(
    {
      userId: {
        $in: subscribedUserList,
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

  return uniqueLocationsCoords;
}

function fetchLocationsDataForSubscribedUsers() {
  getAllLocationsCoordForSubcribedUsers().forEach(updateLocationData);
}

export const createOWTimer = () => {
  Meteor.setInterval(fetchLocationsDataForSubscribedUsers, 1000 * 60);
};
