const router = require('express').Router();
const passport = require('passport');

//auth logout
router.get('/logout', (req, res) => {
  //handle with passport
  req.logout();
  res.redirect('/');
})

//auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['email']
}));

//callbback route for google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

module.exports = router;