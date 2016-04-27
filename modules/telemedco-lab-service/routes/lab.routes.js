'use strict';

var labs = require('../controllers/lab.controller');

module.exports = (app) => {

    app.route('/api/users/:userId/lab')
        .get(labs.getLabReportByUserId);

    app.route('/api/users/:userId/xray')
        .get(labs.getXrayLabReportByUserId)
        .post(labs.createXrayLabReport);
};
