"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = require("./constants");

const twilio = require('twilio');
const client = twilio(_constants.TWILIO_ACCOUNT_SID, _constants.TWILIO_AUTH_TOKEN);

exports.default = {
	sendSms(phoneNumber, OTPMessage) {
		return new Promise(async (resolve, reject) => {
			client.messages.create({
				body: OTPMessage,
				from: _constants.TWILIO_FROM_PHONE,
				to: phoneNumber
			}).then(message => resolve(message)).catch(function (error) {
				resolve(null);
				console.log("error at sending sms" + JSON.stringify(error));
			});
		});
	}
};