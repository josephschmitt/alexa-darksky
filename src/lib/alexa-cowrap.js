import co from 'co';

/**
 * Works like the co.wrap function but instead of returning a Promise it returns false so that
 * Alexa knows to wait for a response.
 * @param {Function} fn
 * @returns {Boolean} false
 */
export default function alexaCoWrap(fn) {
  createResponse.__generatorFunction__ = fn;
  return createResponse;

  function createResponse() {
    co.call(this, fn.apply(this, arguments));
    return false;
  }
}
