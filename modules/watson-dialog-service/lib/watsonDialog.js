'use strict';

var fs = require('fs'),
    path = require('path'),
    bluemix = require('../../../config/lib/bluemix'),
    extend = require('util')._extend,
    watson = require('watson-developer-cloud'),
    credentials,
    dialogIdInJson,
    dialogId,
    dialog;

credentials =  extend({
    url: '<url>',
    username: '<username>',
    password: '<password>',
    version: 'v1'
}, bluemix.getServiceCreds('dialog'));

dialogIdInJson = (() => {
    try {
        var dialogsFile = path.join(process.cwd(), 'dialogs', 'dialog-id.json'),
            obj = JSON.parse(fs.readFileSync(dialogsFile));
        return obj[Object.keys(obj)[0]].id;
    } catch (e) {
    }
})();

dialogId = process.env.DIALOG_ID || dialogIdInJson || '<missing-dialog-id>';
dialog = watson.dialog(credentials);

module.exports.dialog = dialog;
module.exports.dialogId = dialogId;
