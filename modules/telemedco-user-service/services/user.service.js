'use strict';

var service = {},
    User = require('../models/user.model');

service.createUser = (user) => {
    user = new User(user);
    return user.saveAsync();
};

module.exports = service;
