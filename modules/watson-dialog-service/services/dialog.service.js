'use strict';

var service = {},
    dbStorage = require('../../../config/lib/dbStorage'),
    Promise = require('bluebird');

service.createDialog = (dialog) => {
    return new Promise((resolve, reject) => {
        dbStorage
            .getDb()
            .insert(dialog, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
};

module.exports = service;
