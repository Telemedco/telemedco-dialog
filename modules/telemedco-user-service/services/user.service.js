'use strict';

var service = {},
    User = require('../models/user.model');

service.createUser = function(user) {
    user = new User(user);
    return user.saveAsync();
};

module.exports = service;
