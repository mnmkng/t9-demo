const passport = require("passport");
const User = require("../models/user");
const { Strategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local");

const localOptions = {
  usernameField: "email",
};

const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    let user = await User.findOne({email});
    if (!user) return done(null, false);
    const match = await user.comparePassword(password);
    if (match) return done(null, user);
    return done(null, false);
  } catch (e) {
    return done(e, false);
  }
});

const cookieExtractor = function(req) {
  if (req && req.cookies) {
    return req.cookies["access_token"];
  }
  return null;
};

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.AUTH_SECRET
};

const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {

  try {
    done(null, await User.findById(payload.sub) || false);
  } catch (e) {
    return done(e, false);
  }

});

passport.use(jwtLogin);
passport.use(localLogin);

