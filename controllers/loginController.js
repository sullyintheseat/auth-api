
const passport = require('passport');
const SnapAuth = require('../schemas/accounts/SnapAuth');

LoginController = {

  loginSnapchat: (req, res, next) => {
    try{ 
      passport.authenticate('snapchat')(req, res, next);
    } catch(e) {
      res.status(500).send(e);
    }
  },

  loginSnapchatCB: async (req, res, next) => {
    passport.authenticate('snapchat',{ scope: ['profile'] },
    function (err, profile) {
      if (err) {
        res.status(200).send(err.message);
      } else {
        let obj = {
          snapid: profile.profile.id,
          snaptoken: profile.accessToken,
          snaprefresh: profile.refreshToken
        };
       LoginController.push(obj, res); 
      }
    }
  )(req, res, next);
  },

  push: async (obj, res) => {
    try {
      let val = await SnapAuth.createSnap(obj);
      res.redirect(`https://pwa.digitalseat.io/snapback/${val}`)
    } catch (err) {
      res.status(500).send('Unknown error')
    }
  },

  failed: (req, res) => {
    res.status(400).send('nope');
  },

  getRecordById: async (req, res) => {
    try {
      let record = await SnapAuth.getRecordBy(req.params.id);
      if(Booleanr(ecord)) {
        res.status(200).send(record);
      } else {
        res.status(401).send('Record not found');
      }
    } catch (err) {
      res.status(500).send('Unknown error')
    }
  }
}

module.exports.Controller = LoginController;
module.exports.controller = (app) => {
  app.get('/v1/user/auth/snapchat', LoginController.loginSnapchat);
  app.get('/v1/user/auth/snapchat/return', LoginController.loginSnapchatCB);
  app.get('/v1/user/auth/record/:id', LoginController.getRecordById);
  app.get('/login', LoginController.failed);
}