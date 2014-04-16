var mongoose            = require('mongoose').mongoose;
var UserModel           = require('./lib/models/user').UserModel;
var OAuthClientModel    = require('./lib/models/oauthClient').OAuthClientModel;
var AccessTokenModel    = require('./lib/models/accessToken').AccessTokenModel;
var RefreshTokenModel   = require('./lib/models/refreshToken').RefreshTokenModel;
var faker               = require('Faker');

// Connect to database
var db = require('./lib/db/mongo');

UserModel.remove({}, function(err) {
  var user = new UserModel({ username: "andrey", password: "simplepassword" });
  user.save(function(err, user) {
    if(err) return console.log(err);
    else console.log("New user - %s:%s",user.username,user.password);
  });

  for(i=0; i<4; i++) {
    var user = new UserModel({ username: faker.random.first_name().toLowerCase(), password: faker.Lorem.words(1)[0] });
    user.save(function(err, user) {
      if(err) return console.log(err);
      else console.log("New user - %s:%s",user.username,user.password);
    });
  }
});

OAuthClientModel.remove({}, function(err) {
  var client = new OAuthClientModel({ name: "OurService iOS client v1", clientKey: "mobileV1", clientSecret:"abc123456" });
  client.save(function(err, client) {
    if(err) return console.log(err);
    else console.log("New client - %s:%s",client.clientKey,client.clientSecret);
  });
});
AccessTokenModel.remove({}, function (err) {
  if (err) return console.log(err);
});
RefreshTokenModel.remove({}, function (err) {
  if (err) return console.log(err);
});

setTimeout(function() {
  mongoose.disconnect();
}, 3000);