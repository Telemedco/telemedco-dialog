'use strict';

var validator = {},
    Joibird = require('joibird');

validator.validate = (user) => {
    var userSchema = Joibird
        .object().keys({
            userId: Joibird.string().required(),
            dialogId: Joibird.string().required(),
            conversationId: Joibird.string().required(),
            clientId: Joibird.string().required(),
            startTime: Joibird.string().required(),
            endTime: Joibird.string().required(),
            riskFactor: Joibird.number().min(0).max(10).required(),
            conversation: Joibird.array().min(1).required()
        })
        .options({
            convert: false,
            abortEarly: false
        })
        .unknown(false);

    return Joibird
        .validate(user, userSchema);
};

module.exports = validator;
