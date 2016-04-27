'use strict';

var validator = {},
    Joibird = require('joibird');

validator.validate = (body) => {
    var userSchema = Joibird
        .object().keys({
            firstName: Joibird.string().required(),
            lastName: Joibird.string().required(),
            dateOfBirth: Joibird.string().required()
        })
        .options({
            convert: false,
            abortEarly: false
        })
        .unknown(false);

    return Joibird
        .validate(body, userSchema);
};

module.exports = validator;
