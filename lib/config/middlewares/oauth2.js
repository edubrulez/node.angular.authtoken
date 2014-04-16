var oauth2orize = require('oauth2orize'),
    passport = require('passport'),
    crypto = require('crypto'),
    UserModel = require('../../models/user').UserModel,
    RefreshTokenModel = require('../../models/refreshToken').RefreshTokenModel,
    AccessTokenModel = require('../../models/accessToken').AccessTokenModel;

var env = process.env.NODE_ENV || 'development'
  , config = require('../config')[env];

// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
  UserModel.findOne({ username: username }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    if (!user.checkPassword(password)) { return done(null, false); }

    RefreshTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
      if (err) return done(err);
    });

    AccessTokenModel.remove({ userId: user.userId, clientId: client.clientId }, function (err) {
      if (err) return done(err);
    });

    var tokenValue = crypto.randomBytes(32).toString('base64');
    var refreshTokenValue = crypto.randomBytes(32).toString('base64');
    var token = new AccessTokenModel({ token: tokenValue, clientKey: client.clientKey, userId: user.userId });
    var refreshToken = new RefreshTokenModel({ token: refreshTokenValue, clientKey: client.clientKey, userId: user.userId });

    refreshToken.save(function (err) {
      if (err) {
        return done(err);
      }
    });

    token.save(function (err, token) {
      if (err) { return done(err); }
      done(null, tokenValue, refreshTokenValue, { 'expires_in': config.security.tokenLife });
    });
  });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
  console.log('RefreshToken: %s', refreshToken);
  RefreshTokenModel.findOne({ token: refreshToken }, function(err, token) {
    if (err) { return done(err); }
    if (!token) { return done(null, false); }
    if (!token) { return done(null, false); }

    UserModel.findById(token.userId, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      RefreshTokenModel.remove({ userId: user.userId, clientKey: client.clientKey }, function (err) {
        if (err) return done(err);
      });
      AccessTokenModel.remove({ userId: user.userId, clientKey: client.clientKey }, function (err) {
        if (err) return done(err);
      });

      var tokenValue = crypto.randomBytes(32).toString('base64');
      var refreshTokenValue = crypto.randomBytes(32).toString('base64');
      var token = new AccessTokenModel({ token: tokenValue, clientId: client.clientId, userId: user.userId });
      var refreshToken = new RefreshTokenModel({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
      refreshToken.save(function (err) {
        if (err) { return done(err); }
      });
      var info = { scope: '*' }
      token.save(function (err, token) {
        if (err) { return done(err); }
        done(null, tokenValue, refreshTokenValue, { 'expires_in': config.security.tokenLife });
      });
    });
  });
}));

// token endpoint
exports.token = [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  server.token(),
  server.errorHandler()
]

exports.server = server;