import { Meteor } from "meteor/meteor";
import "meteor/aldeed:collection2/static";
import "/imports/api/collections/attachSchemas";
import { startMethodMap } from "/imports/api/methods/map";
import { startMethodAddLocation } from "/imports/api/methods/locations";
import { createOWTimer } from "/imports/api/timers/OWTimer";
import { publishLocationsDashboard } from "/imports/api/publications/locationsData";
import { publishUserPreferencesDashboard } from "/imports/api/publications/userPreferences";

Meteor.startup(async () => {
  startMethodMap();
  createOWTimer();
  startMethodAddLocation();
  publishUserPreferencesDashboard();
  publishLocationsDashboard();
});
