const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config({ path: 'variables.env' });

passport.use(
  new GoogleStrategy({
    //options for the google strategy
    callbackURL:'/auth/google/callback',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    console.log('passport callback fired');
    console.log(profile)
  })
)