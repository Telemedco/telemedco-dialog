'use strict';

var fs = require('fs'),
    path = require('path'),
    bluemix = require('../../../config/lib/bluemix'),
    extend = require('util')._extend,
    watson = require('watson-developer-cloud');

var credentials =  extend({
    url: '<url>',
    username: '<username>',
    password: '<password>',
    version: 'v1'
}, bluemix.getServiceCreds('dialog'));

var dialog_id_in_json = (function() {
    try {
        var dialogsFile = path.join(process.cwd(), 'dialogs', 'dialog-id.json');
        var obj = JSON.parse(fs.readFileSync(dialogsFile));
        return obj[Object.keys(obj)[0]].id;
    } catch (e) {
    }
})();

var dialog_id = process.env.DIALOG_ID || dialog_id_in_json || '<missing-dialog-id>';
var dialog = watson.dialog(credentials);

module.exports.dialog = dialog;
module.exports.dialog_id = dialog_id;
