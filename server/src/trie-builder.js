const fs = require("fs");
const path = require("path");

const Trie = require("./trie");

exports.trieBuilderSync = function trieBuilderSync(lang) {
  if (typeof lang !== "string" || lang.length !== 2) {
    throw new Error("Language identifier must be a two character string. Example: en cz")
  }
  lang = lang.toLowerCase();
  let buffer;
  try {
    buffer = fs.readFileSync(path.join(__dirname, "..", "dictionaries", `${lang}.txt`))
  } catch (e) {
    if (e.code === "ENOENT") {
      throw new Error(`Unable to load a dictionary for language ${lang}. No dictionary available.`)
    }
    throw e;
  }
  const tuples = buffer.toString().trim().split(/\r?\n/g).map(line => line.split(/[\t ]/g));

  const trie = new Trie();
  tuples.forEach(t => trie.insert(t[1], Number(t[0])));
  return trie;
};