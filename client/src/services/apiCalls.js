import axios from "axios";
import TrivialCache from "./trivialCache";

const API_URL = "http://localhost:4000";

const cache = new TrivialCache(100);

export async function getSuggestions(endpoint, digitString) {
  const cacheKey = `${endpoint}/${digitString}`;
  const value = cache.get(cacheKey);

  if (value) return value;

  try {
    const { data } = await axios.get(`${API_URL}/${cacheKey}`, {
      withCredentials: true
    });
    return cache.set(cacheKey, _dedupe(data));
  } catch (e) {
    return [];
  }
}

export async function signin(credentials) {
  return axios.post(`${API_URL}/signin`, credentials, {
    withCredentials: true
  });
}

export async function signout(credentials) {
  return axios.post(`${API_URL}/signout`, null, { withCredentials: true });
}

export async function refreshAuth() {
  return axios.post(`${API_URL}/refreshAuth`, null, { withCredentials: true });
}

/**
 * Ensure keys are unique to prevent React warnings
 * in case of bad data from API (which will not happen
 * with data from DB since they are "name" indexed,
 * but might happen with data from files, since the Trie
 * itself doesn't currently dedupe. It's O(n) anyway
 * so no significant impact on performance.
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
