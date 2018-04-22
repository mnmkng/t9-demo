const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

router.get("/demo/:digits", (req, res) => {
  const trie = req.app.get("trie_en_demo");
  res.json(trie.getSuggestions(req.params.digits, 2));
});

router.get("/english/:digits", (req, res) => {
  const trie = req.app.get("trie_en");
  res.json(trie.getSuggestions(req.params.digits, 2));
});

module.exports = router;