'use strict';

var config = require('../config'),
    chalk = require('chalk'),
    mongoose = require('mongoose');

module.exports.connect = (cb) => {
    var _this = this,
        db;

    db = mongoose.connect(config.db.uri, config.db.options, (err) => {
        if (err) {
            console.error(chalk.red('Could not connect to MongoDB!'));
            console.log(err);
        } else {
            mongoose.set('debug', true);
            if (cb) cb(db);
        }
    });
};

module.exports.disconnect = (cb) => {
    mongoose.disconnect((err) => {
        console.info(chalk.yellow('Disconnected from MongoDB.'));
        cb(err);
    });
};
