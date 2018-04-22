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
      res.cookie("access_token", _tokenForUser(req.user), {httpOnly: true, maxAge: 600000});
      res.status(200).send();
    } catch (e) {
      return next(e);
    }
  },
  async login (req, res, next) {
    res.cookie("access_token", _tokenForUser(req.user), {httpOnly: true, maxAge: 600000});
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