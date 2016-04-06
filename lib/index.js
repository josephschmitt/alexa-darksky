'use strict';

var alexa = require('alexa-app');
var handlers = require('./handlers.js');

var app = new alexa.app();

app.launch(handlers.handleLaunchIntent);
app.intent('Forecast', handlers.handleForecast);
app.intent('ForecastNow', handlers.handleNowForecast);
app.intent('ForecastDay', handlers.handleDayForecast);
app.intent('ForecastWeek', handlers.handleWeekForecast);
app.intent('AMAZON.HelpIntent', handlers.handleHelpIntent);

module.exports = app;
