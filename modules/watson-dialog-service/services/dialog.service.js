'use strict';

var service = {},
    Dialog = require('../models/dialog.model');

service.createDialog = (dialog) => {
    dialog = new Dialog(dialog);
    return dialog.saveAsync();
};

module.exports = service;
