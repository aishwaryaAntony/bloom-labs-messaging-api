"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = require("./constants");

const plivo = require('plivo');
const client = new plivo.Client(_constants.PLIVO_AUTH_ID, _constants.PLIVO_AUTH_TOKEN);

exports.default = {
    sendSms(phoneNumber, OTPMessage, messageUuid) {
        console.log(`PLIVO --- ${phoneNumber} == ${OTPMessage}`);
        return new Promise(async (resolve, reject) => {
            client.messages.create({
                src: _constants.PLIVO_FROM_PHONE,
                dst: phoneNumber,
                text: OTPMessage,
                url: `${_constants.MESSAGE_API_DOMAIN_URL}message/update-sms-status?message_uuid=${messageUuid}`
            }).then(message => resolve(message)).catch(function (error) {
                resolve(null);
                console.log("Error at sending sms" + JSON.stringify(error));
            });
        });
    }
};