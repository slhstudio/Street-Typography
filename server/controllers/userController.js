const userController = {};

userController.isSignedIn = (req, res) => {
  if (!req.user) {
    res.send(false)
  } else {
      res.send(req.user.username);
  }
}

module.exports = userController;