'use strict';

var _ = require('lodash'),
	path = require('path'),
    defaultConfig,
    environmentConfig,
    config;

defaultConfig = require(path.join(process.cwd(), 'config/env/default'));
environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV || 'development')) || {};
config = _.merge(defaultConfig, environmentConfig);

module.exports = config;
