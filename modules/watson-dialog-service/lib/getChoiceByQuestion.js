'use strict';

var constants  = require('./constants'),
	_ = require('lodash');

module.exports = function(obj) {
    var response = _.get(obj, 'response', []),
        choices = null;

    _.forEach(response, function(v) {
        var choice = constants[v];

        if (!_.isUndefined(choice) && _.isObject(choice)) {
            choices = choice;
        }
    });

    return choices;
};
