const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require('dotenv').config({ path: 'variables.env' });

passport.use(
  new GoogleStrategy({
    //options for the google strategy
    clientID: `${CLIENT_ID}`,
    clientSecret: `${CLIENT_SECRET}`
  }), () => {
    //passport callback function
  }
)