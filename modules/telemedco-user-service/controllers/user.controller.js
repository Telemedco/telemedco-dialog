'use strict';

var userService = require('../services/user.service'),
    userValidator = require('../lib/userValidator'),
    loginValidator = require('../lib/loginValidator'),
    request = require('request'),
    config = require('../../../config/config'),
    queryString = require('querystring'),
    _ = require('lodash');

function getKandyUri(data) {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    var query = {
        key: config.kandy.apiKey,
        domain_api_secret: config.kandy.secretKey,
        user_id: _.get(data, 'user_id')
    };
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

    return config.kandy.uri + 'domains/users/accesstokens?' + queryString.stringify(query);
}

exports.create = (req, res, next) => {
    return userValidator.validate(req.body)
        .then(user => {
            return userService.createUser(user);
        })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            if (_.get(err, 'name') === 'ValidationError') {
                res.status(400).json(err.details || []);
            } else {
                next(err);
            }
        });
};

exports.login = (req, res, next) => {
    return loginValidator.validate(req.body)
        .then(body => {
            return request({
                method: 'GET',
                uri: getKandyUri(req.body)
            }, (err, response, body) => {
                res.status(response.statusCode).json(JSON.parse(body));
            });
        })
        .catch(err => {
            if (_.get(err, 'name') === 'ValidationError') {
                res.status(400).json(err.details || []);
            } else {
                next(err);
            }
        });
};
