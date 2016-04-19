'use strict';

var service = {},
    dbStorage = require('../../../config/lib/dbStorage'),
    Promise = require('bluebird');

service.getReportById = (id) => {
    return new Promise((resolve, reject) => {
        dbStorage
            .getDb()
            .find({
                selector: {userId: id, type: 'lab'},
                fields: ['_id', '_rev', 'userId', 'tests']
            }, (err, result, header) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
};

module.exports = service;
