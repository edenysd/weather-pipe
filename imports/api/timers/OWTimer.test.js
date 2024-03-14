import expect from "expect";
import {
  addUserOWSubscription,
  getAllLocationsCoordForSubcribedUsers,
  removeUserOWSubscription,
  userOWSubscriptionCount,
} from "./OWTimer";
import { Meteor } from "meteor/meteor";
import { startMethodAddLocation } from "../methods/locations";
import { LocationsData } from "../collections/LocationsData";

describe("Unit OWTimer subscriptions", function () {
  beforeEach(() => {
    userOWSubscriptionCount.clear();
  });

  it("check the subscription count return to cero in normal enviroment", function () {
    addUserOWSubscription("user-1");
    addUserOWSubscription("user-1");
    removeUserOWSubscription("user-1");
    removeUserOWSubscription("user-1");
    addUserOWSubscription("user-1");
    removeUserOWSubscription("user-1");

    expect(userOWSubscriptionCount.get("user-1")).toBe(0);
  });

  it("check the subscription count keep correct number of current subscriptions", function () {
    addUserOWSubscription("user-1");
    addUserOWSubscription("user-1");
    removeUserOWSubscription("user-1");
    expect(userOWSubscriptionCount.get("user-1")).toBe(1);
  });
});

describe("Integration OWTimer locations data", function () {
  const locationPreferenceUser1 = { name: "user-1-location", lat: 0, lng: 0 };
  const locationPreferenceUser2 = {
    name: "user-1-location",
    lat: -1,
    lng: -1,
  };

  before(async function (done) {
    // High value to ensure the tests run even with low speed network
    this.timeout(40000);
    startMethodAddLocation();
    Meteor.users.insert({ _id: "user-1", username: "user-1" });
    Meteor.users.insert({ _id: "user-2", username: "user-2" });

    await Meteor.server.method_handlers["add-location"].apply(
      { userId: "user-1" },
      [locationPreferenceUser1]
    );

    await Meteor.server.method_handlers["add-location"].apply(
      { userId: "user-2" },
      [locationPreferenceUser2]
    );
    done();
  });

  beforeEach(() => {
    userOWSubscriptionCount.clear();
  });

  it("check get locations coords empty if no user subscribed", function () {
    expect(getAllLocationsCoordForSubcribedUsers().length).toBe(0);
    addUserOWSubscription("user-1");
    removeUserOWSubscription("user-1");
    expect(getAllLocationsCoordForSubcribedUsers().length).toBe(0);
  });

  it("check get locations coords match locations coords for only subscribed users", function () {
    addUserOWSubscription("user-1");
    const currentLocations = getAllLocationsCoordForSubcribedUsers();

    expect(currentLocations.length).toBe(1);
    expect(currentLocations[0].lat).toBe(locationPreferenceUser1.lat);
    expect(currentLocations[0].lng).toBe(locationPreferenceUser1.lng);
  });
});
