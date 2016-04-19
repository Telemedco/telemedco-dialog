'use strict';

var service = {},
    dbStorage = require('../../../config/lib/dbStorage'),
    Promise = require('bluebird');

service.createUser = (user) => {
    console.log(user);
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
