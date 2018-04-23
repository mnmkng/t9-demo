"use strict";

const Trie = require("../src/trie/trie");

describe("Trie", () => {


  describe("Trie()", () => {
    test("exists, with children and fullword properties", () => {
      const t = new Trie();
      expect(typeof Trie).toBe("function");
      expect(t.words).toBeInstanceOf(Array);
      expect(t.children).toBeInstanceOf(Map);
    });
  });

  describe("insertion and retrieval", () => {
    let t;
    beforeEach(() => {
      t = new Trie();

      t.insert("appox", 10000);
      t.insert("apb", 100);
      t.insert("ap", 100);
      t.insert("appo", 20000);
      t.insert("appoz", 20000);
      t.insert("a", 500);
      t.insert("b", 100);
      t.insert("appa", 10000);
      t.insert("c", 700);
      t.insert("appoy", 1000);
      t.insert("appow", 2000);
      t.insert("apq", 300);
      t.insert("app", 100);
    });


    test("should insert words into the tree", () => {
      expect(t.words.length).toBe(0);
      expect(t.children.get("2").words.length).toBe(3);
      expect(t.children.get("2").children.get("7").children.get("2")
        .words[ 0 ]).toEqual([ "apb", 100 ]);
      expect(t.children.get("2").children.get("7").children.get("7")
        .words[ 0 ]).toEqual([ "apq", 300 ]);
      expect(t.children.get("2").children.get("7").children.get("7").children.get("6")
        .words[ 0 ]).toEqual([ "appo", 20000 ]);
    });

    test("should order words descending by their frequency value", () => {
      expect(t.children.get("2").words[ 0 ][ 1 ]).toBe(700);
      expect(t.children.get("2").words[ 1 ][ 1 ]).toBe(500);
      expect(t.children.get("2").words[ 2 ][ 1 ]).toBe(100);
      expect(t.children.get("2").children.get("7").children.get("7").words[ 0 ])
        .toEqual([ "apq", 300 ]);
      expect(t.children.get("2").children.get("7").children.get("7").words[ 1 ])
        .toEqual([ "app", 100 ]);
    });

    test("should not create duplicate entries for words", () => {
      t.insert("a", 750);
      t.insert("app", 100);
      t.insert("app", 1000);

      expect(t.children.get("2").words[ 0 ]).not.toEqual([ "a", 750 ]);
      expect(t.children.get("2").words.length).toBe(3);
      expect(t.children.get("2").children.get("7").children.get("7").words.length).toBe(2);
    });

    test("should purge nested sets to free memory", () => {
      t.purgeSets();

      function recurse(trie) {
        trie.children.forEach(subTrie => {
          expect(subTrie.wordSet.size).toBe(0);
          recurse(subTrie);
        })
      }
      recurse(t);
    });

    test("should suggest words at various depths`", () => {
      expect(t.getSuggestions("272")).toEqual([ "apb" ]);
      expect(t.getSuggestions("277")).toEqual([ "apq", "app" ]);
      expect(t.getSuggestions("277", 1)).toEqual([ "apq", "app", "appo", "appa" ]);
      expect(t.getSuggestions("277", 2)).toEqual([ "apq", "app", "appo", "appa", "appoz", "appox", "appow", "appoy" ]);
      expect(t.getSuggestions("2776")).toEqual([ "appo" ]);
    });

    test("should not throw errors if there is no existing path", () => {
      expect(t.getSuggestions("22222")).toEqual([]);
      // right now it"s giving a bunch of earlier ones?
    });

    test(
      "should automatically dig to build results if there are no matches",
      () => {
        t.insert("approximately", 1);
        expect(t.getSuggestions("2777", 2)).toEqual([ "approximately" ]);
      }
    );
  });
});