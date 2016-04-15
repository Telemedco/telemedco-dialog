'use strict';

var config = require('../config'),
    chalk = require('chalk'),
    mongoose = require('mongoose');

module.exports.connect = function(cb) {
    var _this = this,
        db;

    db = mongoose.connect(config.db.uri, config.db.options, function(err) {
        if (err) {
            console.error(chalk.red('Could not connect to MongoDB!'));
            console.log(err);
        } else {
            mongoose.set('debug', true);
            if (cb) cb(db);
        }
    });
};

module.exports.disconnect = function(cb) {
    mongoose.disconnect(function(err) {
        console.info(chalk.yellow('Disconnected from MongoDB.'));
        cb(err);
    });
};
