import alexa from 'alexa-app';
import handlers from './handlers.js';

const app = new alexa.app();

app.launch(handlers.handleLaunchIntent);
app.intent('SetLocation', handlers.handleLocationIntent);
app.intent('Forecast', handlers.handleForecast);
app.intent('ForecastNow', handlers.handleNowForecast);
app.intent('ForecastDay', handlers.handleDayForecast);
app.intent('ForecastWeek', handlers.handleWeekForecast);
app.intent('AMAZON.HelpIntent', handlers.handleHelpIntent);

export default app;
