import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

export const UserPreferences = new Mongo.Collection("user-preferences");

UserPreferences.schema = new SimpleSchema({
  name: { type: String },
  lat: { type: Number, defaultValue: 0 },
  lng: { type: Number, defaultValue: 0 },
  userId: { type: String },
  locationId: { type: String, defaultValue: "" },
  order: { type: Number, defaultValue: 0, optional: true },
  wideValue: { type: Number, defaultValue: 1, optional: true },
});

export const getNextOrderValue = ({ userId }) => {
  const orderArr = UserPreferences.find(
    { userId },
    {
      fields: {
        _id: 0,
        order: 1,
      },
    }
  )
    .fetch()
    .map((preferemce) => preferemce.order);

  const nextOrderValue =
    orderArr.reduce((a, b) => Math.max(a || 0, b || 0), {
      order: 0,
    }) + 1;

  return nextOrderValue;
};
