'use strict';

var labs = require('../controllers/lab.controller');

module.exports = (app) => {

    app.route('/api/lab/:userId')
        .get(labs.getLabReportByUserId);

    app.route('/api/lab/xray/:userId')
        .get(labs.getXrayLabReportByUserId);

    app.route('/api/lab/xray')
        .post(labs.createXrayLabReport);
};
