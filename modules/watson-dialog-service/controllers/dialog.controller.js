'use strict';

var dialogService = require('../services/dialog.service'),
    dialogValidator = require('../lib/dialogValidator'),
    watsonDialog = require('../lib/watsonDialog'),
    getChoiceByQuestion = require('../lib/getChoiceByQuestion'),
    _ = require('lodash'),
    extend = require('util')._extend;

exports.create = function(req, res, next) {
    return dialogValidator.validate(req.body)
        .then(function(dialog) {
            return dialogService.createDialog(dialog);
        })
        .then(function(data) {
            res.status(201).json(data);
        })
        .catch(function(err) {
            if (_.get(err, 'name') === 'ValidationError') {
                res.status(400).json(err.details || []);
            } else {
                next(err);
            }
        });
};

exports.conversation = function(req, res, next) {
    var params = extend({ dialog_id: watsonDialog.dialog_id }, req.body);

    watsonDialog.dialog.conversation(params, function(err, results) {
        if (err) {
            return next(err);
        } else {
            var choice = getChoiceByQuestion(results);
            if (!_.isNull(choice)) {
                results.choice = choice;
            }

            res.status(200).json({
                dialog_id: watsonDialog.dialog_id,
                conversation: results
            });
        }
    });
};

exports.profile = function(req, res, next) {
    var params = extend({ dialog_id: watsonDialog.dialog_id }, req.body);
    watsonDialog.dialog.getProfile(params, function(err, results) {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(results);
        }
    });
};
