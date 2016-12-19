'use strict';

var dialogService = require('../services/dialog.service'),
    dialogValidator = require('../lib/dialogValidator'),
    _ = require('lodash'),
    config = require('../../../config/config'),
    Conversation = require('watson-developer-cloud/conversation/v1'); 

// Create the service wrapper
var conversation = new Conversation({
    // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
    // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
    username: config.conversation.username,
    password: config.conversation.password,
    url: 'https://gateway.watsonplatform.net/conversation/api',
    version_date: '2016-10-21',
    version: 'v1'
});

exports.getConversationByUserId = (req, res, next) => {
    return dialogService.getHistoryById(req.params.userId)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            next(err);
        });
};

exports.create = (req, res, next) => {
    return dialogValidator.validate(req.body)
        .then((dialog) => {
            dialog.workspaceId = config.conversation.workspaceId;
            
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
    var workspace = process.env.WORKSPACE_ID || config.conversation.workspaceId;
    
    if (!workspace || workspace === '<workspace-id>') {
        return res.json({
            'output': {
                'text': 'The app has not been configured with a workspace.'
            }
        });
    }

    var payload = {
        workspace_id: workspace,
        context: req.body.context || {},
        input: req.body.input || {}
    };

    // Send the input to the conversation service
    conversation.message(payload, function(err, data) {
        if (err) {
            return res.status(err.code || 500).json(err);
        }

        return res.status(200).json(data);
    });
};
