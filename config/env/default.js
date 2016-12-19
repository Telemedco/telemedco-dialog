'use strict';

module.exports = {
    title: 'Telemedco Watson Service',
    version: '1.5.0',
    port: process.env.PORT || process.env.VCAP_APP_PORT || 3000,
    host: process.env.VCAP_APP_HOST || 'localhost',
    kandy: {
        uri: 'https://api.kandy.io/v1.2/',
        apiKey: 'DAK011685e4e54a49f88d61cdee5361b4e8',
        secretKey: 'DASc66a5a30e32b4af08159ff9a56a428a6'
    },
    db: {
        uri: 'https://5a033180-f3df-4da3-a65b-954f3be1f3fe-bluemix:55485c3fa96cb9e43c575522197d08a6835dac282965bfd45a8ff1f518c0c1f6@5a033180-f3df-4da3-a65b-954f3be1f3fe-bluemix.cloudant.com',
        name: 'telemedco-dev'
    },
    streamUri: 'https://text-to-speech-nodejs-sjehutch-1028.mybluemix.net/api/voice/',
    conversation: {
        username: '3ad0ff35-f54b-4b11-967a-14c001b1773f',
        password: 'bAzuwpot0fJQ',
        workspaceId: 'f812b527-5bdc-4a5a-bdb1-07b1bc42df79'
    }
};
