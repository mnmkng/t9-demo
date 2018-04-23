const express = require("express");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("./auth/passport");

const router = express.Router();

const { signup, signin, signout, refreshCookie } = require("./auth/auth");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

router.use(cors({
  maxAge: 600,
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));
router.use(morgan("short"));
router.use(cookieParser());
router.use(bodyParser.json());

router.all("/", (req, res) => {
  res.status(403).json({status: 403, message: "Unauthorized"})
});

router.post("/signup", signup);

router.post("/signin", requireSignin, signin);

router.post("/signout", signout);

router.post("/refreshAuth", requireAuth, refreshCookie);


// public route
router.get("/demo", (req, res) => {
  res.json([]);
});
router.get("/demo/:digits", (req, res) => {
  const trie = req.app.get("trie_en_demo");
  res.json(trie.getSuggestions(req.params.digits, 2));
});

// authenticated route
router.get("/english", requireAuth, (req, res) => {
  res.json([]);
});
router.get("/english/:digits", requireAuth, (req, res) => {
  const trie = req.app.get("trie_en");
  res.json(trie.getSuggestions(req.params.digits, 2));
});

module.exports = router;