'use strict';

var app = require('./config/lib/app'),
    signal = require('./signal'),
    config = require('./config/config'),
    server;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

signal.setupTerminationHandlers(config.title);
signal.setupUncaughtException();
server = app.start();
