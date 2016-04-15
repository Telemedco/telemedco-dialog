'use strict';

var users = require('../controllers/user.controller');

module.exports = (app) => {
    app.route('/api/users')
        .post(users.create);
};
