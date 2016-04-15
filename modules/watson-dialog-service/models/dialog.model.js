'use strict';

var mongoose = require('mongoose'),
    Mixed = mongoose.Schema.Types.Mixed,
    Bluebird = require('bluebird'),
    ConversationSchema,
    DialogSchema,
    DialogModel;

ConversationSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    type: {
        type: String,
        enum: ['multiple', 'yesorno', 'single'],
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
},
{
    versionKey: false
});

DialogSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    dialogId: {
        type: String,
        required: true
    },
    conversationId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    riskFactor: {
        type: Number,
        required: true
    },
    conversation: [ConversationSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    versionKey: false
});

DialogModel = mongoose.model('Dialog', DialogSchema);

Bluebird.promisifyAll(DialogModel);
Bluebird.promisifyAll(DialogModel.prototype);

module.exports = DialogModel;
