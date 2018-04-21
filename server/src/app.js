"use strict";

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
mongoose.pluralize(null);
const cors = require("cors");

const { trieBuilderFromFile, trieBuilderFromDB } = require("./trie-builder");
const English = require("./models/english");

const app = express();
app.set("trie_en_demo", trieBuilderFromFile("en"));

app.use(cors());

app.get("/t9/:digits", (req, res) => {
  const trie = req.app.get("trie_en_demo");

  res.json(trie.getSuggestions(req.params.digits, 2))
});

async function main () {

  await mongoose.connect(process.env.MONGO_URI);

  console.log("Loading English word list from database...");
  const englishTrie = await trieBuilderFromDB(English);
  console.log("English word list loaded.");

  app.set("trie_en", englishTrie);

  app.listen(4000, () => {
    console.log("Server is listening on port 4000.")
  });
}

module.exports = main;