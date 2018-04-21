"use strict";

const express = require("express");
const mongoose = require("mongoose");
mongoose.pluralize(null);

const { trieBuilderFromFile, trieBuilderFromDB } = require("./trie/trie-builder");
const English = require("./models/english");
const router = require("./router");

const PORT = process.env.PORT || 4000;

async function main () {

  await mongoose.connect(process.env.MONGO_URI);

  const app = express();

  console.log("Loading demo English word list from file...");
  app.set("trie_en_demo", trieBuilderFromFile("en"));
  console.log("Demo word list loaded.");

  console.log("Loading English word list from database...");
  const englishTrie = await trieBuilderFromDB(English);
  app.set("trie_en", englishTrie);
  console.log("English word list loaded.");

  app.use("/", router);

  app.listen(PORT, () => {
    console.log(`API server is listening on port ${PORT}.`)
  });
}

module.exports = main;