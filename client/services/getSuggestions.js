import axios from "axios";

export default async function getSuggestions(digitString) {
  const {data} = await axios.get(`http://localhost:4000/${digitString}`);
  console.log("from axios", data);
  return _dedupe(data);
}

function _dedupe(arr) {
  const ids = new Set();
  return arr.filter(item => {
    return ids.has(item) ? false : ids.add(item);
  });
}