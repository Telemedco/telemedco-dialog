'use strict';

var users = require('../controllers/user.controller');

module.exports = function(app) {
    app.route('/api/users')
        .post(users.create);
};
