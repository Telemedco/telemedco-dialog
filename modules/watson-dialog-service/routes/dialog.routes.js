'use strict';

var dialogs = require('../controllers/dialog.controller');

module.exports = (app) => {
    app.route('/conversation/history')
        .post(dialogs.create);

    app.route('/conversation')
        .post(dialogs.conversation);

    app.route('/profile')
        .post(dialogs.profile);
};
