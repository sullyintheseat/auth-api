
const passport = require('passport');

LoginController = {

  loginSnapchat: (req, res, next) => {
    try{ 
      passport.authenticate('snapchat')(req, res, next);
    } catch(e) {
      res.status(500).send(e);
    }
  },

  loginSnapchatCB: (req, res, next) => {
    passport.authenticate('snapchat',{ scope: ['profile'] },
    function (err, profile) {
      if (err) {
        res.status(200).send(err.message);
      } else {
        res.status(200).send(profile);
      }
    }
  )(req, res, next);
  },

  failed: (req, res) => {
    res.status(400).send('nope');
  }
}

module.exports.Controller = LoginController;
module.exports.controller = (app) => {
  app.get('/v1/user/auth/snapchat', LoginController.loginSnapchat);
  app.get('/v1/user/auth/snapchat/return', LoginController.loginSnapchatCB);
  app.get('/login', LoginController.failed);
}