'use strict';

var service = {},
    dbStorage = require('../../../config/lib/dbStorage'),
    labData = require('../../../data/lab.json'),
    _ = require('lodash'),
    Promise = require('bluebird');

service.createDialog = (dialog) => {
    var _this = this;
    dialog.type = 'conversation';
    return new Promise((resolve, reject) => {
        dbStorage
            .getDb()
            .insert(dialog, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    service.createLabReport(dialog);
                    resolve(result);
                }
            });
    });
};

service.createLabReport = (obj) => {
    var userId = _.get(obj, 'userId');
    if (!_.isNull(userId)) {
        var report = labData;
        report.userId = userId;
        report.type = 'lab';

        dbStorage
            .getDb()
            .insert(report);
    }
};

module.exports = service;
