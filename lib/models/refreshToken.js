var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../config/config')[env],
    Schema = mongoose.Schema;

// RefreshToken
var RefreshTokenSchema = new Schema({
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

var RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);

module.exports.RefreshTokenModel = RefreshTokenModel;