'use strict';

var config = require('../config'),
    cloudant = require('./cloudant'),
    express = require('./express'),
    chalk = require('chalk');

module.exports.init = (done) => {
    cloudant.connect((db) => {
        var app = express.init(db);
        if (done) done(app, db, config);
    });
};

module.exports.start = function start(done) {
    var _this = this;

    _this.init((app, db, config) => {
        app.listen(config.port, '0.0.0.0', () => {
            console.log(chalk.yellow('--'));
            console.log(chalk.green(config.title));
            console.log();
            console.log(chalk.green('Date:            ' + new Date()));
            console.log(chalk.green('Server:          ' + 'http://' + config.host + ':' + config.port));
            console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
            console.log(chalk.green('Database:        ' + config.db.uri));
            console.log(chalk.green('App version:     ' + config.version));
            console.log(chalk.yellow('--'));

            if (done) done(app, db, config);
        });
    });
};
