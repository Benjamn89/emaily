const passport = require("passport");
const GoogleStretegy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/config");
const { use } = require("passport");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStretegy(
    {
      clientID: keys.googleClient,
      clientSecret: keys.googleSecret,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({
        googleId: profile.id,
      }).then((existingUser) => {
        if (existingUser) {
          console.log("You allready in the database");
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
