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

export async function getLocationCurrentWeather({ lat, lng }) {
  const currentWeatherResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${Meteor.settings.OW_API_KEY}&units=metric`
  );
  return currentWeatherResponse.data;
}

export async function getLocationForecastWeather({ lat, lng }) {
  const forecastWeatherResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${Meteor.settings.OW_API_KEY}&units=metric`
  );
  return forecastWeatherResponse.data;
}

export async function updateLocationData({ lat, lng }) {
  const currentWeather = await getLocationCurrentWeather({ lat, lng });
  const forecastWeather = await getLocationForecastWeather({ lat, lng });

  const storedLocation = LocationsData.findOne({
    lat,
    lng,
  });

  if (!storedLocation) {
    return await LocationsData.insertAsync({
      lat,
      lng,
      current: currentWeather,
      forecast: forecastWeather,
      lastUpdate: new Date(),
    });
  } else {
    LocationsData.update(
      { _id: storedLocation._id },
      {
        lat,
        lng,
        current: currentWeather,
        forecast: forecastWeather,
        lastUpdate: new Date(),
      }
    );
    return storedLocation._id;
  }
}
