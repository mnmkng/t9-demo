"use strict";
import axios from "axios";

const TrivialCache = require("./trivialCache");

const API_URL = "http://localhost:4000";

const cache = new TrivialCache(100);

export default async function getSuggestions(endpoint, digitString) {

  const cacheKey = `${endpoint}/${digitString}`;
  const value = cache.get(cacheKey);

  if (value) return value;

  try {
    const {data} = await axios.get(`${API_URL}/${cacheKey}`);
    console.log("from axios", data);
    return cache.set(cacheKey, _dedupe(data));
  } catch (e) {
    return [];
  }
}

/**
 * Ensure keys are unique to prevent React warnings
 * in case of bad data from API. O(n) so no significant
 * impact on performance.
 * @param arr
 * @returns {Array}
 * @private
 */
function _dedupe(arr) {
  const ids = new Set();
  return arr.filter(item => {
    return ids.has(item) ? false : ids.add(item);
  });
}