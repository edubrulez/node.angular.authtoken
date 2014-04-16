var mongoose = require('mongoose')
  , User = mongoose.model('User');

exports.registerUser = function(req, res) {
  var newUser = new User(req.body);
  newUser.provider = 'local';

  User
    .findOne({ email: newUser.email })
    .exec(function(err, user){
      if(err) return next(err)
      if(!user){
        newUser.save(function(err){
          if (err) return res.send({ errors: err.errors, user:newUser });
        });
      } else {
        return res.send({ errors: [{"type":"email already registered"}], user:newUser })
      }
    });
};