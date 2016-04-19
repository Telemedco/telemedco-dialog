'use strict';

var labs = require('../controllers/lab.controller');

module.exports = (app) => {

    app.route('/api/lab/:userId')
        .get(labs.getLabReportByUserId);
};
