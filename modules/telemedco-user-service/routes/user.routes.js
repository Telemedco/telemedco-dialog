'use strict';

var users = require('../controllers/user.controller');

module.exports = (app) => {
    app.route('/api/users')
        .post(users.create);

    app.route('/api/users/login')
        .post(users.login);
};
