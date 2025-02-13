const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const UserModel = require("../model/UserModel");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          image: profile.photos[0].value,
        };

        try {
          let user = await UserModel.findOne({ googleId: profile.id });
          if (user) {
            return done(null, user);
          } else {
            user = await UserModel.create(newUser);
            return done(null, user);
          }
        } catch (error) {
          console.log(error.message);
          return done(error, null);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
