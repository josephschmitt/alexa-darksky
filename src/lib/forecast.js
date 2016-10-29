import co from 'co';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import ForecastIo from 'forecastio';
import location from './location.js';

const config = dotenv.config();
const forecastIo = new ForecastIo(config.API_KEY);

export default co.wrap(function* (userId, place) {
  try {
    const coord = yield location.getLocation(userId, place);
    const forecast = yield forecastIo.forecast(coord.lat, coord.lng);

    const currently = forecast.currently;
    const temp = Math.round(currently.temperature);
    const feelsLike = Math.round(currently.apparentTemperature);

    return Promise.resolve({
      temp: {
	speech: 'It\'s currently ' + temp + ' degrees.',
	value: temp
      },
      feelsLike: (feelsLike && Math.abs(feelsLike - temp) > config.FEELS_LIKE_THRESHOLD) && {
	speech: 'Feels like ' + feelsLike + ' degrees.',
	value: feelsLike
      },
      hourSummary: forecast.minutely.summary,
      daySummary: forecast.hourly.summary,
      weekSummary: forecast.daily.summary
    });
  } catch (e) {
    return Promise.reject('No location saved.');
  }
});
