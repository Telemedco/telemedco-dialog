'use strict';

var express = require('express'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser'),
    errorhandler = require('errorhandler'),
    _ = require('lodash'),
    glob = require('glob'),
    path = require('path');

module.exports.initMiddleware = (app) => {
    app.set('showStackError', true);
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());
};

module.exports.initViewEngine = (app) => {
    app.use(express.static(__dirname + '/../../public'));
};

module.exports.initErrorHandler = (app) => {
    if (!process.env.VCAP_SERVICES) {
        app.use(errorhandler());
    }
};

module.exports.initWinstonLogger = (app) => {
    require('./middleware')(app);
};

module.exports.initExpressErrorHandler = (app) => {
    app.use((req, res, next) => {
        var err = new Error('Not Found');
        err.code = 404;
        err.message = 'Not Found';
        next(err);
    });

    app.use((err, req, res, next) => {
        var error = {
            code: err.code || 500,
            error: err.error || err.message
        };

        res.status(error.code).json(error);
    });
};

module.exports.initModulesRoutes = (app) => {
    glob.sync('./modules/**/routes/*.routes.js').forEach((file) => {
        require(path.resolve(file))(app);
    });
};

module.exports.init = (db) => {
    var app = express();

    this.initMiddleware(app);
    this.initViewEngine(app);
    this.initErrorHandler(app);
    this.initWinstonLogger(app);
    this.initModulesRoutes(app);
    this.initExpressErrorHandler(app);

    return app;
};
