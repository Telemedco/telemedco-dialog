'use strict';

var validator = {},
    Joibird = require('joibird');

validator.validate = (user) => {
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    var loginSchema = Joibird
        .object().keys({
            user_id: Joibird.string().required()
        })
        .options({
            convert: false,
            abortEarly: false
        })
        .unknown(false);
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

    return Joibird
        .validate(user, loginSchema);
};

module.exports = validator;
