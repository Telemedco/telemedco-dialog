'use strict';

var labService = require('../services/lab.service');

exports.getLabReportByUserId = (req, res, next) => {
    return labService.getReportById(req.params.userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
};
