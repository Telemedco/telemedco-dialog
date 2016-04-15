'use strict';

var validator = {},
    Joibird = require('joibird');

validator.validate = (user) => {
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
        .unknown(true);

    return Joibird
        .validate(user, userSchema);
};

module.exports = validator;
