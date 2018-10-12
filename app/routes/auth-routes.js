const router = require('express').Router();


//auth logout
router.get('/logout', (req, res) => {
  //handle with passport
  res.send('logging out');
})

//auth with google
router.get('/google', (req, res) => {
  //handle with passport
  res.send('logging in with google')
})

module.exports = router;