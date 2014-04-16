/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../config/config')[env],
    Schema = mongoose.Schema;

/**
 * AccessToken Schema
 */
var AccessTokenSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  clientKey: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

///**
// * Statics
// */
//AccessTokenSchema.statics = {
//    load: function(id, cb) {
//        this.findOne({
//            _id: id
//        }).exec(cb);
//    }
//};

var AccessTokenModel = mongoose.model('AccessToken', AccessTokenSchema);

module.exports.AccessTokenModel = AccessTokenModel;
