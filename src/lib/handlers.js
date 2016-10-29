import Promise from 'bluebird';

import cowrap from './alexa-cowrap.js';
import forecast from './forecast.js';
import {setLocation, getLocation} from './location.js';

const exports = {};

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
exports.handleLaunchIntent = function(request, response) {

}

exports.handleLocationIntent = cowrap(function* (request, response) {
  yield setLocation(request.sessionDetails.userId, request.slot('location'))

  response.say('Location saved!');

  if (request.session('originalRequestData')) {
    var fn = exports['handle' + request.session('originalRequestData').name];
    if (fn) {
      response.say('In ' + request.slot('location'));
      fn(request, response);
    }
    else {
      response.send();
    }
  }
  else {
    response.send()
  }
});

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
exports.handleForecast = cowrap(function* (request, response) {
  forecast(request.sessionDetails.userId, request.slot('location'))
    .catch(function (reason) {
      response
	.shouldEndSession(false)
	.session('originalRequestData', request.data.request.intent)
	.say('You need to save your location first.')
	.say('For example, you could say "my location is Brooklyn New York".')
	.send();
      return Promise.reject();
    })
    .then(function (data) {
      response
	.say(data.temp.speech)
	.say(data.feelsLike.speech)
	.say(data.hourSummary)
	.say(data.daySummary)
	.send();
    });
});

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
exports.handleNowForecast = cowrap(function* (request, response) {
  forecast
    .fetch(request.sessionDetails.userId, request.slot('location'))
    .catch(function () {
      response.send();
      return Promise.reject();
    })
    .then(function (data) {
      response
	.say(data.temp.speech)
	.say(data.feelsLike.speech)
	.say(data.hourSummary)
	.send();
    });
});

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
exports.handleDayForecast = cowrap(function* (request, response) {
  forecast
    .fetch(request.sessionDetails.userId, request.slot('location'))
    .catch(function () {
      response.send();
      return Promise.reject();
    })
    .then(function (data) {
      response
	.say(data.daySummary)
	.send();
    });
});

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
exports.handleWeekForecast = cowrap(function* (request, response) {
  forecast
    .fetch(request.sessionDetails.userId, request.slot('location'))
    .catch(function () {
      response.send();
      return Promise.reject();
    })
    .then(function (data) {
      response
	.say(data.weekSummary)
	.send();
    });
});

/**
 * Handles requests for help with the skill.
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
exports.handleHelpIntent = function (request, response) {

};

export default exports;
