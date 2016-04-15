'use strict';

var winston = require('winston'),
    util    = require('util'),
    colors  = require('colors');

var setUpWinston = function() {
    winston.level = 'verbose';

    // Log the Error message too as otherwise Winston only logs the stack trace.
    var oldError = winston.log;
    winston.log = function() {
        var newArgs = [];
        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            if (arg && arg.stack) {
                newArgs.push(util.inspect(arg));
            }
            newArgs.push(arg);
        }
        oldError.apply(oldError, newArgs);
    };

    winston.loggers.add('fanwish', {
        transports: [ new (winston.transports.Console)({level: 'verbose'}) ]
    });
};

module.exports = function(app) {
    setUpWinston();

    app.use(function (req, res, next) {
        var url = req.url;
        var params;

        if(req.method == 'GET') {
            if(url.indexOf('?') >= 0) {
                url = url.substring(0, url.indexOf('?'));
            }
            params = toSecureParams(req.query);
        }
        else {
            params = toSecureParams(req.body);
        }

        // log request method, url and params, colorizing each
        winston.verbose(
            colors.cyan(req.method),
            colors.green(url),
            (Object.keys(params).length > 0 ? '\n' + colors.grey(util.inspect(params)) : '')
        );
        next();
    });

    var toSecureParams = function(obj) {
        var params = {};
        for(var param in obj) {
            params[param] = obj[param];
            if (/password/i.test(param)) {
                params[param] = '*****';
            }
        }
        return params;
    };
};
