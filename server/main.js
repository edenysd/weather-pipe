import { Meteor } from "meteor/meteor";
import "meteor/aldeed:collection2/static";
import "/imports/api/collections/attachSchemas";
import { startMethodMapProxy } from "/imports/api/methods/mapProxy";
import { startMethodAddLocation } from "/imports/api/methods/locations";
import { createOWTimer } from "/imports/api/timers/OWTimer";
import { publishLocationsDashboard } from "/imports/api/publications/locationsData";
import { publishUserPreferencesDashboard } from "/imports/api/publications/userPreferences";
import { startMethodsUserPreferences } from "/imports/api/methods/userPreferences";

Meteor.startup(async () => {
  startMethodMapProxy();
  createOWTimer();
  startMethodAddLocation();
  publishUserPreferencesDashboard();
  publishLocationsDashboard();
  startMethodsUserPreferences();
});
