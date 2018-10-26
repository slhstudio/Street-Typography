const userController = {};

userController.isSignedIn = (req, res) => {
  if (!req.user) {
    res.send(false)
  } else if (!req.user.username) res.send(req.user.email);
    else res.send(req.user.username);
  
}

module.exports = userController;