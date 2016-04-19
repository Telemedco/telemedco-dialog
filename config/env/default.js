'use strict';

module.exports = {
    title: 'Telemedco Watson Service',
    version: '1.2.0',
    port: process.env.VCAP_APP_PORT || 3000,
    host: process.env.VCAP_APP_HOST || 'localhost'
};
