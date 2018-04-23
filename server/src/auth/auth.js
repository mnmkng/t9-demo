const jwt = require("jwt-simple");

const User = require("../models/user");

const COOKIE_OPTS = {httpOnly: true, maxAge: 600000};

module.exports = {
  async signup (req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).send({ error: "You must provide email and password." })
    }

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(422).json({ error: "Email is in use." })
      }
      user = new User({
        email,
        password
      });
      await user.save();
      res.cookie("access_token", _tokenForUser(user), COOKIE_OPTS);
      res.status(200).send();
    } catch (e) {
      return next(e);
    }
  },
  signin (req, res) {
    res.cookie("access_token", _tokenForUser(req.user), COOKIE_OPTS);
    res.status(200).send();
  },
  signout (req, res) {
    res.clearCookie("access_token", COOKIE_OPTS);
    res.status(200).send();
  },
  /**
   * An endpoint that validates a cookie and returns a new one
   * (using the same token internally). Mainly used to re-authenticate
   * frontend after page refresh.
   * @param req
   * @param res
   */
  refreshCookie (req, res) {
    res.cookie("access_token", req.cookies["access_token"], COOKIE_OPTS);
    res.status(200).send();
  }


};

function _tokenForUser (user) {
  const payload = {
    sub: user.id,
    iat: Date.now()
  };
  return jwt.encode(payload, process.env.AUTH_SECRET);
}