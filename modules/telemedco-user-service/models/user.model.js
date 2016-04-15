'use strict';

var mongoose = require('mongoose'),
    Mixed = mongoose.Schema.Types.Mixed,
    Bluebird = require('bluebird'),
    UserSchema,
    UserModel;

UserSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    });

UserModel = mongoose.model('User', UserSchema);

Bluebird.promisifyAll(UserModel);
Bluebird.promisifyAll(UserModel.prototype);

module.exports = UserModel;
