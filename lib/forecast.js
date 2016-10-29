'use strict';

var ForecastIo = require('forecastio');

var location = require('./location.js');
var config = require('dotenv').config();

function fetch(userId, place) {
  var forecastIo = new ForecastIo(config.API_KEY);

  return location.getLocation(userId, place)
    .catch(function () {
      return Promise.reject('No location saved.');
    })
    .then(function (coord) {
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
