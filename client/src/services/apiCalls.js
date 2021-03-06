import axios from "axios";
import TrivialCache from "./trivialCache";

const API_URL = "http://localhost:4000";

const cache = new TrivialCache(100);

/**
 * This endpoint handles the relevant data fetching anc caching.
 * @param endpoint
 * @param digitString
 * @returns {Promise<*>}
 */
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

export async function signup(credentials) {
  return axios.post(`${API_URL}/signup`, credentials, {
    withCredentials: true
  });
}

export async function signout(credentials) {
  return axios.post(`${API_URL}/signout`, null, { withCredentials: true });
}

/**
 * Since I'm using JWTs stored in Cookies for auth, because I've read
 * somewhere that storing them in Local Storage is not really safe,
 * I need to refresh my auth state somehow after page reload.
 */
export async function refreshAuth() {
  return axios.post(`${API_URL}/refreshAuth`, null, { withCredentials: true });
}

/**
 * Ensure keys are unique to prevent React warnings
 * in case of bad data from API, which will not happen
 * since the Trie itself dedupes its entries.
 * I'm keeping it because it's O(n) anyway
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
