'use strict';

module.exports = {
    db: {
        uri: process.env.TELEMEDCO_MONGO_URI || 'mongodb://localhost/telemedco-prod',
        options: {
            user: '',
            pass: ''
        },
        debug: process.env.MONGODB_DEBUG || false
    }
};
