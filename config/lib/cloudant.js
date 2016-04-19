'use strict';

var config = require('../config'),
    chalk = require('chalk'),
    cloudant = require('cloudant'),
    dbStorage = require('./dbStorage');

module.exports.connect = (cb) => {
    var _this = this;

    cloudant(config.db.uri, (err, conn) => {
        if (err) {
            throw new Error(err);
        }

        var db = conn.db.use(config.db.name);

        if (db) {
            dbStorage.setDb(db);
        }

        return cb(db);
    });
};
