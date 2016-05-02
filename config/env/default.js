'use strict';

module.exports = {
    title: 'Telemedco Watson Service',
    version: '1.5.0',
    port: process.env.VCAP_APP_PORT || 3000,
    host: process.env.VCAP_APP_HOST || 'localhost',
    kandy: {
        uri: 'https://api.kandy.io/v1.2/',
        apiKey: 'DAK011685e4e54a49f88d61cdee5361b4e8',
        secretKey: 'DASc66a5a30e32b4af08159ff9a56a428a6'
    }
};
