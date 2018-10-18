const router = require('express').Router();
const passport = require('passport');

//auth logout
router.get('/logout', (req, res) => {
  //handle with passport
  res.send('logging out');
})

//auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['email']
}));

//callbback route for google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.send('you reached the callback URL');
});

module.exports = router;