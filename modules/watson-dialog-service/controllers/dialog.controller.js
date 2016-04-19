'use strict';

var dialogService = require('../services/dialog.service'),
    dialogValidator = require('../lib/dialogValidator'),
    watsonDialog = require('../lib/watsonDialog'),
    getChoiceByQuestion = require('../lib/getChoiceByQuestion'),
    _ = require('lodash'),
    extend = require('util')._extend;

exports.create = (req, res, next) => {
    return dialogValidator.validate(req.body)
        .then((dialog) => {
            return dialogService.createDialog(dialog);
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

exports.conversation = (req, res, next) => {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    var params = extend({ dialog_id: watsonDialog.dialogId }, req.body);
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

    watsonDialog.dialog.conversation(params, (err, results) => {
        if (err) {
            return next(err);
        } else {
            var choice = getChoiceByQuestion(results);
            if (!_.isNull(choice)) {
                results.choice = choice;
            }

            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            res.status(200).json({
                dialog_id: watsonDialog.dialogId,
                conversation: results
            });
            // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
        }
    });
};

exports.profile = (req, res, next) => {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    var params = extend({ dialog_id: watsonDialog.dialogId }, req.body);
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    watsonDialog.dialog.getProfile(params, (err, results) => {
        if (err) {
            return next(err);
        } else {
            res.status(200).json(results);
        }
    });
};
