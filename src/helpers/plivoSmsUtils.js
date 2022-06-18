import { PLIVO_AUTH_TOKEN, PLIVO_AUTH_ID, PLIVO_FROM_PHONE, MESSAGE_API_DOMAIN_URL } from "./constants";
const plivo = require('plivo');
const client = new plivo.Client(PLIVO_AUTH_ID, PLIVO_AUTH_TOKEN);

export default {
    sendSms(phoneNumber, OTPMessage, messageUuid) {
        console.log(`PLIVO --- ${phoneNumber} == ${OTPMessage}`)
        return new Promise(async (resolve, reject) => {
            client.messages.create(
                {
                    src: PLIVO_FROM_PHONE,
                    dst: phoneNumber,
                    text: OTPMessage,
                    url: `${MESSAGE_API_DOMAIN_URL}message/update-sms-status?message_uuid=${messageUuid}`
                }
            ).then(message => resolve(message)).catch(function (error) {
                resolve(null)
                console.log("Error at sending sms" + JSON.stringify(error))
            });
        });
    }
}