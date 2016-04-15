'use strict';

var express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    _ = require('lodash'),
    glob = require('glob'),
    path = require('path');

module.exports.initMiddleware = function(app) {
    app.set('showStackError', true);
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());
};

module.exports.initViewEngine = function(app) {
    app.use(express.static(__dirname + '/../../public'));
};

module.exports.initErrorHandler = function(app) {
    if (!process.env.VCAP_SERVICES) {
        app.use(errorhandler());
    }
};

module.exports.initWinstonLogger = function(app) {
    require('./middleware')(app);
};

module.exports.initExpressErrorHandler = function(app) {
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.code = 404;
        err.message = 'Not Found';
        next(err);
    });

    app.use(function(err, req, res, next) {
        var error = {
            code: err.code || 500,
            error: err.error || err.message
        };

        res.status(error.code).json(error);
    });
};

module.exports.initModulesRoutes = function(app) {
    glob.sync('./modules/**/routes/*.routes.js').forEach(function(file) {
        require(path.resolve(file))(app);
    });
};

module.exports.init = function(db) {
    var app = express();

    this.initMiddleware(app);
    this.initViewEngine(app);
    this.initErrorHandler(app);
    this.initWinstonLogger(app);
    this.initModulesRoutes(app);
    this.initExpressErrorHandler(app);

    return app;
};
