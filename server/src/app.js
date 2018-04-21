"use strict";

const express = require("express");
const cors = require("cors");

const {trieBuilderSync} = require("./trie-builder");

const app = express();
app.set("trie_en", trieBuilderSync("en"));

app.use(cors());

app.get("/:digits", (req, res) => {
  const trie = req.app.get("trie_en");

  res.json(trie.getSuggestions(req.params.digits, 2))
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000.")
});