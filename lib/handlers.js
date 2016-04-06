'use strict';

var forecast = require('./forecast.js');

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
function handleLaunchIntent(request, response) {

}

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
function handleForecast(request, response) {
  forecast.fetch(request.slot('cityName')).then(function (data) {
    response
      .say(data.temp.speech)
      .say(data.feelsLike.speech)
      .say(data.hourSummary)
      .say(data.daySummary)
      .send();
  });

  return false;
}

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
function handleNowForecast(request, response) {
  forecast.fetch(request.slot('cityName')).then(function (data) {
    response
      .say(data.temp.speech)
      .say(data.feelsLike.speech)
      .say(data.hourSummary)
      .send();
  });

  return false;
}

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
function handleDayForecast(request, response) {
  forecast.fetch(request.slot('cityName')).then(function (data) {
    response
      .say(data.daySummary)
      .send();
  });

  return false;
}

/**
 * Handles requests when launching the skill
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
function handleWeekForecast(request, response) {
  forecast.fetch(request.slot('cityName')).then(function (data) {
    response
      .say(data.weekSummary)
      .send();
  });

  return false;
}

/**
 * Handles requests for help with the skill.
 * @param {Object} request -- Request object from AlexaApp module.
 * @param {Object} response -- Response object from AlexaApp module.
 */
function handleHelpIntent(request, response) {

}

module.exports = {
  handleLaunchIntent: handleLaunchIntent,
  handleForecast: handleForecast,
  handleNowForecast: handleNowForecast,
  handleDayForecast: handleDayForecast,
  handleWeekForecast: handleWeekForecast,
  handleHelpIntent: handleHelpIntent
};
