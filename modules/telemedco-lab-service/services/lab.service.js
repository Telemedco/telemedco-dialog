'use strict';

var service = {},
    dbStorage = require('../../../config/lib/dbStorage'),
    Promise = require('bluebird');

service.getLabReportByUserId = (id) => {
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

service.getXrayReportByUserId = (id) => {
    return new Promise((resolve, reject) => {
        dbStorage
            .getDb()
            .find({
                selector: {userId: id, type: 'xray'}
            }, (err, result, header) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
};

service.createXrayLabReport = (data) => {
    data.type = 'xray';
    return new Promise((resolve, reject) => {
        dbStorage
            .getDb()
            .insert(data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
    });
};

module.exports = service;
