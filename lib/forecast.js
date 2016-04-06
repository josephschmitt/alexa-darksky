'use strict';

var Promise = require('bluebird');
var ForecastIo = require('forecastio');
var Geocoder = Promise.promisifyAll(require('geocoder'));

var config = require('dotenv').config();

function fetch(location) {
  location = location || config.DEFAULT_LOCATION;

  return Geocoder.geocodeAsync(location).then(function (data) {
    var coord = data.results[0].geometry.location;
    var forecastIo = new ForecastIo(config.API_KEY);

    return forecastIo.forecast(coord.lat, coord.lng);
  })
  .then(function(data) {
    var currently = data.currently;
    var temp = Math.round(currently.temperature);
    var feelsLike = Math.round(currently.apparentTemperature);

    return {
      temp: {
        speech: 'It\'s currently ' + temp + ' degrees.',
        value: temp
      },
      feelsLike: (feelsLike && Math.abs(feelsLike - temp) > config.FEELS_LIKE_THRESHOLD) && {
        speech: 'Feels like ' + feelsLike + ' degrees.',
        value: feelsLike
      },
      hourSummary: data.minutely.summary,
      daySummary: data.hourly.summary,
      weekSummary: data.daily.summary
    }
  });
}

module.exports.fetch = fetch;
