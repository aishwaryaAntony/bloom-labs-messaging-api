import { TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID, TWILIO_FROM_PHONE } from "./constants";
const twilio = require('twilio');
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export default {
	sendSms(phoneNumber, OTPMessage) {
		return new Promise(async (resolve, reject) => {
			client.messages
				.create({
					body: OTPMessage,
					from: TWILIO_FROM_PHONE,
					to: phoneNumber
				})
				.then(message => resolve(message))
				.catch(function (error) {
					resolve(null)
					console.log("error at sending sms" + JSON.stringify(error))
				});
		});
	}
}