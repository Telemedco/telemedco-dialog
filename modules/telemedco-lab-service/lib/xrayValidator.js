'use strict';

var validator = {},
    Joibird = require('joibird');

validator.validate = (user) => {
    var userSchema = Joibird
        .object().keys({
            userId: Joibird.string().required(),
            report: Joibird.array().min(1).required()
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
