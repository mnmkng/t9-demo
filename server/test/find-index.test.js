const findIndexToInsert = require("../src/trie/find-index");

describe("findIndexToInsert", () => {
  test("handles empty array", () => {
    expect(findIndexToInsert([], 5)).toBe(0);
  });

  test("will fail on invalid array", () => {
    expect(() => findIndexToInsert([3, 4], 3)).toThrow();
  });

  test("handles single item array", () => {
    expect(expect(findIndexToInsert([["word", 20]], 20)).toBe(0));
    expect(expect(findIndexToInsert([["word", 20]], 5)).toBe(1));
    expect(expect(findIndexToInsert([["word", 20]], 30)).toBe(0));
  });

  test("handles large arrays", () => {
    for (var i = 0; i < 20; i++) {
      const source = _generateArray();
      // shallow copy is enough since we don't modify the internal arrays
      const dupe = [...source];
      const tuple = ["x", Math.round(Math.random() * length)];
      const idx = findIndexToInsert(source, tuple[1]);
      // modify arrays
      source.push(tuple);
      dupe.splice(idx, 0, tuple);
      expect(source.sort(_desc)).toEqual(dupe);
    }
  });
});

function _generateArray() {
  const length = Math.round(Math.random() * 1000);
  const arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(["x", Math.round(Math.random() * length)]);
  }
  return arr.sort(_desc);
}

function _desc(a, b) {
  return b[1] - a[1];
}
