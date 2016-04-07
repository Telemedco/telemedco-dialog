'use strict';

var yesOrNo = {
	items: ['no', 'yes'],
	type: 'yesorno'
};

module.exports = {
    'Where does it hurt?': {
        items: ['arm', 'chest', 'hand'],
        type: 'multiple'
    },
    'How long has it been hurting?': {
        items: ['1 day', '1 week', '2 week', '1 month'],
        type: 'single'
    },
    'Are you experiencing pain in your chest?': yesOrNo,
    'Do you use tobacco?': yesOrNo,
    'Do you have a history of Diabetes?': yesOrNo,
    'Do you have a history of high blood pressure?': yesOrNo,
    'Do you have a history of high cholesterol or triglyceride levels?': yesOrNo,
    'Do you have a history of heart disease?': yesOrNo,
    'Are you a male over the age of 45 or a female over the age of 55?': yesOrNo,
    'Do you exercise on a regular basis?': yesOrNo,
    'Are you obese?': yesOrNo,
    'Do you a history of excessive stress?': yesOrNo
};
