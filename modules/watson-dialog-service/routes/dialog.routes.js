'use strict';

var dialogs = require('../controllers/dialog.controller');

module.exports = (app) => {
    app.route('/api/users/:userId/conversation')
        .get(dialogs.getConversationByUserId)
        .post(dialogs.create);

    app.route('/conversation')
        .post(dialogs.conversation);

    app.route('/profile')
        .post(dialogs.profile);
};
