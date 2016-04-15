'use strict';

var userService = require('../services/user.service'),
    userValidator = require('../lib/userValidator'),
    _ = require('lodash');

exports.create = (req, res, next) => {
    return userValidator.validate(req.body)
        .then((user) => {
            return userService.createUser(user);
        })
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            if (_.get(err, 'name') === 'ValidationError') {
                res.status(400).json(err.details || []);
            } else {
                next(err);
            }
        });
};