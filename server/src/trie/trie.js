"use strict";

const findIndexToInsert = require("./find-index");

const DIGITS = {
  "a": "2", "b": "2", "c": "2",
  "d": "3", "e": "3", "f": "3",
  "g": "4", "h": "4", "i": "4",
  "j": "5", "k": "5", "l": "5",
  "m": "6", "n": "6", "o": "6",
  "p": "7", "q": "7", "r": "7", "s": "7",
  "t": "8", "u": "8", "v": "8",
  "w": "9", "x": "9", "y": "9", "z": "9"
};

/**
 * An ES6+ refactor of a T9 Trie implementation by Mitch Robb.
 * In addition to the original implementation, it fixes all tests
 * that were failing and implements binary search to speed up array insertions.
 * @link http://mitchrobb.com/blog/Solving-T9-Autocomplete-with-a-Prefix-Tree/
 */
class Trie {
  constructor () {
    this.children = new Map(); // {digit: Trie}
    this.words = [];
    this.wordSet = new Set();
  }

  insert (word, useFrequency) {
    // Traverse the tree to the node where the word should be inserted. If any
    // needed nodes do not exist along the way, they are created.
    // console.log("insert", word, useFrequency);
    const nodeToAddWord = traverseAddingNodes(this);

    // Insert the word into the wordlist of the node returned above. Use the
    // data provided (frequency of use in English text) to place the word in the
    // correct position, so that we can recommend more common words first.
    insertWordIntoListByFrequency(nodeToAddWord, word, useFrequency);

    function traverseAddingNodes (node) {
      let i = 0, len = word.length;
      // Traverse the tree"s existing nodes as far as possible.
      for (i, len; i < len; i++) {
        var thisLetter = word[ i ];
        var thisDigit = DIGITS[ thisLetter ];

        if (node.children.has(thisDigit)) {
          node = node.children.get(thisDigit);
        } else {
          break;
        }
      }

      // If we reach this point and we still aren"t at the node we want, it means
      // that other words matching this key pattern haven"t been inserted before.
      // Continue, this time adding the required nodes as we go.
      for (i, len; i < len; i++) {
        thisLetter = word[ i ];
        thisDigit = DIGITS[ thisLetter ];
        node.children.set(thisDigit, new Trie());
        node = node.children.get(thisDigit);
      }

      return node;
    }

    function insertWordIntoListByFrequency ({words: list, wordSet}, word, useFrequency) {

      // I'm using an ES6 set to track duplicate words, it almost doubles the memory
      // footprint but is significantly faster than looping through the arrays
      // all the time. I clear the wordSets after the Trie is complete.
      if (wordSet.has(word)) return;

      const wordToInsert = [ word, useFrequency ]; // Store word in a tuple.
      const wordsLength = list.length;

      if (!wordsLength) {
        // Handle the case where this node has no words yet
        list.push(wordToInsert);
      } else {
        // Find where to insert this word among others, based on its
        // frequency property.
        const idx = findIndexToInsert(list, useFrequency);
        list.splice(idx, 0, wordToInsert)
      }
      wordSet.add(word);
    }
  }

  // Purges the wordSets from the Tries that are used to
  // keep track of dupe words. It could get pretty large.
  purgeSets() {
    this.children.forEach((subTrie) => {
      subTrie.wordSet.clear();
      subTrie.purgeSets();
    });
  }

  getSuggestions (digitString, suggestionDepth) {
    // Ensure only numbers are passed down
    digitString = digitString.replace(/[^\d+]/g, "");
    if (digitString === "") return [];

    // Traverse the tree based on the key digits in digitString, to find the node
    // where relevant words are stored.
    let result = [];
    let node = this;

    for (var i = 0; i < digitString.length; i++) {
      let thisDigit = digitString[ i ];
      if (!node.children.has(thisDigit)) return [];
      node = node.children.get(thisDigit);
    }

    // Add all the words to the result.
    result = result.concat(node.words.map(wordTuple => {
      return wordTuple[ 0 ];
    }));

    // If suggestionDepth is > 0, the caller is asking for recommendations of
    // words longer than the number of keys pressed.
    return suggestionDepth > 0 ?
      result.concat(getDeeperSuggestions(node, suggestionDepth)) :
      result;

    function getDeeperSuggestions (root, maxDepth) {
      // We traverse down every possible branch from the result node (the node
      // corresponding to the keypad entry), saving words we see as we go and
      // stopping when we reach the specified depth.

      // deepSuggestions is an array with (maxDepth) subarrays.
      // Each of the subarrays will be one depth level"s suggestions.
      let deepSuggestions = [];

      // The traverse function (below) fills deepSuggestions with results.
      traverse(root, 0);
      // Each level is sorted individually, because we want shallower results to
      // always be suggested first. (this is an implementation detail and
      // there"s a possibility sorting everything together might give
      // better results in practice.)
      deepSuggestions = deepSuggestions.map(level => {
        return level.sort((a, b) => {
          return b[ 1 ] - a[ 1 ];
        });
      });

      // At this point, deepSuggestions is an array of arrays (one for each level
      // of depth). Each of those subarrays contains word tuples.
      return deepSuggestions.reduce((result, level) => {
        // Merge each level into a single flat array.
        return result.concat(level.map(wordTuple => {
          // Keep only the word itself, discarding the frequency number
          return wordTuple[ 0 ];
        }));
      }, []);

      function traverse (root, depth) {
        // Basic tree traversal, collecting results up to the required depth.
        if (depth) { // Result already contains depth 0
          const d = depth - 1;
          if (!deepSuggestions[d]) deepSuggestions[d] = [];
          deepSuggestions[ d ] = deepSuggestions[ d ].concat(root.words);
        }

        // The stop function below handles empty results at maxDepth.
        if (stop()) {
          return;
        }

        root.children.forEach((subTrie) => {
          traverse(subTrie, depth + 1);
        });

        // Only stop the tree traversal when at least a single result is
        // retrieved. Otherwise, continue digging deeper, overriding maxDepth.
        // This function was added to fix a failing test
        // in the original implementation. (The last one).
        function stop() {
          const reachedMax = depth >= maxDepth;
          if (!reachedMax) return false;
          const hasResult = result.length;
          if (hasResult) return true;
          const hasDeepResult = deepSuggestions.filter(arr => arr.length).length;
          return !!hasDeepResult;
        }
      }
    }
  }
}

module.exports = Trie;