const express = require("express");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("./auth/passport");

const router = express.Router();

const { signup, login } = require("./auth/auth");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

router.use(cors({
  maxAge: 600,
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));
router.use(morgan("short"));
router.use(cookieParser());
router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.status(403).send("Unauthorized")
});

router.post("/signup", signup);

router.post("/signin", requireLogin, login);


// public route
router.get("/demo", (req, res) => {
  res.json([]);
});
router.get("/demo/:digits", (req, res) => {
  const trie = req.app.get("trie_en_demo");
  res.json(trie.getSuggestions(req.params.digits, 2));
});

// authenticated route
router.get("/english", (req, res) => {
  res.json([]);
});
router.get("/english/:digits", requireAuth, (req, res) => {
  const trie = req.app.get("trie_en");
  res.json(trie.getSuggestions(req.params.digits, 2));
});

module.exports = router;