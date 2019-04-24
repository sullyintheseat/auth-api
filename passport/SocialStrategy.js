class SocialStrategy {

  constructor() {
    this.snapchatConnect = this.snapchatConnect.bind(this);
  }

  googleConnect(accessToken, refreshToken, profile, cb) {
    let userLite = {
      providerAccessToken: accessToken,
      providerRefreshToken: null,
      profileAvatar: profile.photos[0].value,
      email: profile.emails[0].value,
      provider: profile.provider,
      displayName: profile.displayName
    };
    cb(null, userLite);
  }

  fbConnect(req, accessToken, refreshToken, profile, cb) {
    let userLite = {
      providerAccessToken: accessToken,
      providerRefreshToken: null,
      profileAvatar: profile._json.picture.data.url,
      email: profile._json.email,
      provider: profile.provider,
      displayName: profile.displayName
    };
    cb(null, userLite);
  };

  twitterConnect(token, tokenSecret, profile, cb) {
    let userLite = {
      providerAccessToken: token,
      providerRefreshToken: tokenSecret,
      profileAvatar: profile._json.profile_image_url_https,
      email: profile._json.email,
      provider: profile.provider,
      displayName: profile.displayName
    };
    cb(null, userLite);
  };

  instagramConnect(req, accessToken, refreshToken, profile, done) {
    let userLite = {
      providerAccessToken: accessToken,
      providerRefreshToken: tokenSecret,
      profileAvatar: null,
      email: profile.email,
      provider: profile.provider,
      displayName: profile.displayName
    };
    cb(err, userLite);
  };

  snapchatConnect(accessToken, refreshToken, profile, cb) { 
    console.log(accessToken, refreshToken, profile)
    cb(null, profile);
  }

}

module.exports = new SocialStrategy();
