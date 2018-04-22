const jwt = require("jwt-simple");

const User = require("../models/user");

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
      return res.json({ token: _tokenForUser(user) });
    } catch (e) {
      return next(e);
    }
  },
  async login (req, res, next) {
    res.json({ token: _tokenForUser(req.user) })
  }
};

function _tokenForUser (user) {
  const payload = {
    sub: user.id,
    iat: Date.now()
  };
  return jwt.encode(payload, process.env.AUTH_SECRET);
}