'use strict';

var streamUri = require('../../../config/config').streamUri;

function getStreamUriByQuestionId(id, yesOrNo, obj) {
    var yesOrNo = {
        items: ['no', 'yes'],
        type: 'yesorno',
        uri: null
    };

    if (typeof obj != 'undefined') {
        var uri = streamUri + id;
        obj.uri = uri;
        return obj;
    }

    if (yesOrNo) {
        var uri = streamUri + id;
        yesOrNo.uri = uri;
        return yesOrNo;
    }
}

module.exports = {
    'Where does it hurt?': getStreamUriByQuestionId(10, false, {
        items: ['arm', 'chest', 'hand'],
        type: 'multiple'
    }),
    'How long has it been hurting?': getStreamUriByQuestionId(11, false, {
        items: ['1 day', '1 week', '2 week', '1 month'],
        type: 'single'
    }),
    'Are you experiencing pain in your chest?': getStreamUriByQuestionId(0, true),
    'Do you use tobacco?': getStreamUriByQuestionId(1, true),
    'Do you have a history of Diabetes?': getStreamUriByQuestionId(2, true),
    'Do you have a history of high blood pressure?': getStreamUriByQuestionId(3, true),
    'Do you have a history of high cholesterol or triglyceride levels?': getStreamUriByQuestionId(4, true),
    'Do you have a history of heart disease?': getStreamUriByQuestionId(5, true),
    'Are you a male over the age of 45 or a female over the age of 55?': getStreamUriByQuestionId(6, true),
    'Do you exercise on a regular basis?': getStreamUriByQuestionId(7, true),
    'Are you obese?': getStreamUriByQuestionId(8, true),
    'Do you a history of excessive stress?': getStreamUriByQuestionId(9, true)
};
