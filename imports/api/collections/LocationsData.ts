import axios from "axios";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const LocationsData = new Mongo.Collection("location-data");

LocationsData.schema = new SimpleSchema({
  lat: { type: Number, defaultValue: 0 },
  lng: { type: Number, defaultValue: 0 },
  current: { type: Object },
  forecast: { type: Object },
  lastUpdate: { type: Date },
});
