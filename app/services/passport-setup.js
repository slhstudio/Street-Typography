const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/userModel')
require('dotenv').config({ path: 'variables.env' });

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy({
    //options for the google strategy
    callbackURL:'/auth/google/callback',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }, async (accessToken, refreshToken, email, done) => {
  //check if user already exists
    const currUser = await User.findOne({googleId: email.id});
    if (currUser) {
      //already have user
      console.log('user is' + currUser);
      done(null, currentUser);
    } else {
        const newUser = await (new User({
          username: email.displayName,
          googleId: email.id,
          email: email.emails[0].value
        })).save();
        console.log(user);
        done(null, newUser);
    // .then(newUser => {
    //   console.log('new user created' + newUser)
    // });
      }
  })
)