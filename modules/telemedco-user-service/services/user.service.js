'use strict';

var service = {},
    dbStorage = require('../../../config/lib/dbStorage'),
    Promise = require('bluebird');

service.createUser = (user) => {
    user.type = 'lookup';
    return new Promise((resolve, reject) => {
        dbStorage
            .getDb()
            .insert(user, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
};

module.exports = service;
