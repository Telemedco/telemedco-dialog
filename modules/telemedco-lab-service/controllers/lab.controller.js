'use strict';

var labService = require('../services/lab.service'),
    xrayValidator = require('../lib/xrayValidator'),
    _ = require('lodash');

exports.getLabReportByUserId = (req, res, next) => {
    return labService.getLabReportByUserId(req.params.userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
};

exports.getXrayLabReportByUserId = (req, res, next) => {
    return labService.getXrayReportByUserId(req.params.userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
};

exports.createXrayLabReport = (req, res, next) => {
    return xrayValidator.validate(req.body)
        .then((report) => {
            return labService.createXrayLabReport(report);
        })
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((err) => {
            if (_.get(err, 'name') === 'ValidationError') {
                res.status(400).json(err.details || []);
            } else {
                next(err);
            }
        });
};
