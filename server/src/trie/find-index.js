/**
 * A function that uses binary search to find
 * an index where a target should be placed
 * to maintain descending order in the source array.
 *
 * The function is closely coupled with the Trie
 * implementation and assumes an array of tuples
 * where the second item is to be compared.
 * @param arr
 * @param target
 * @returns {number}
 */
function findIndexToInsert(arr, target) {



  let s = 0;
  let e = arr.length;
  let m;

  while (s < e) {
    m = Math.floor((s + e) / 2);
    const candidate = arr[m][1];
    if (candidate == null)
      throw new Error(
        "Invalid input array. Make sure you are passing an array of tuples"
      );
    if (candidate === target) return m;
    if (candidate > target) {
      s = m + 1;
    } else {
      e = m - 1;
    }
  }

  // If we didn't find a match, it means we have
  // a last item left and its either undefined
  // (out of array bounds) in which case we just use
  // its index. Same goes if the value is less than
  // the target. If the target is greater, we return
  // index + 1 to insert after it.
  if (arr[s] && arr[s][1] > target) return s + 1;
  return s;
}

module.exports = findIndexToInsert;