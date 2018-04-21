import axios from "axios";

export default async function getSuggestions(digitString) {
  let data;
  try {
    const res = await axios.get(`http://localhost:4000/english/${digitString}`);
    data = res.data;
  } catch (e) {
    return [];
  }
  console.log("from axios", data);
  return _dedupe(data);
}

function _dedupe(arr) {
  const ids = new Set();
  return arr.filter(item => {
    return ids.has(item) ? false : ids.add(item);
  });
}