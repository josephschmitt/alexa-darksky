import Promise from 'bluebird';
import geo from 'geocoder';
import dotenv from 'dotenv';
import dynasty from 'dynasty';

const Geocoder = Promise.promisifyAll(geo);
const config = dotenv.config();
const dynoClient = dynasty({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  region: config.AWS_REGION
});
const users = dynoClient.table(config.AWS_DYNAMODB_USERS_TABLE);

/**
 * Saves coordinates to the database.
 * @param {Object} userId
 * @returns {Promise}
 */
function save(userId, coord) {
  return users.insert({
    userId: userId,
    location: coord
  });
}

/**
 * Loads coordinates from the database.
 * @param {Object} userId
 * @returns {Promise}
 */
function load(userId) {
  return users
    .find(userId)
    .then(function (user) {
      return user && user.location || Promise.reject('User not found.');
    });
}

/**
* Turns a place into latitude and longitude coordinates.
* @param {String} place
* @returns {Promise}
*/
function geocode(place) {
  return Geocoder.geocodeAsync(place).then(function (data) {
    return data.results[0].geometry.location;
  });
}

/**
 * Returns the coordinates for either a requested or previously saved location.
 * @param {Object} userId
 * @returns {Promise}
 */
export function getLocation(userId, location) {
  return location ? geocode(location) : load(userId);
}

/**
 * Saves a location as coordinates to the database.
 * @param {[type]} userId [description]
 * @param {[type]} location [description]
 */
export function setLocation(userId, location) {
  return geocode(location).then(function (coord) {
    save(userId, coord);
  });
}
