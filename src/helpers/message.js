import SMSUtils from "./plivoSmsUtils";
import EMAILUtils from "./emailUtils";
import messageHistory from "./messageHistory";
import updateMessageStatus from "./updateMessageStatus";

export default {
	sendSmsOrEmail(IncomingMessage, options, sequelize) {
		return new Promise(async (resolve, reject) => {
			try {
				let {
					id, name, phone_number, country_code, email, type, message_purpose, description, email_content
				} = IncomingMessage;

				let newMessageHistory = await messageHistory.createMessageHistory(IncomingMessage, sequelize);
				let response = null;
				if (type === "SMS") {
					console.log(`SMS -- Sent for ${country_code}${phone_number}`);
					await SMSUtils.sendSms(`${country_code}${phone_number}`, description, newMessageHistory.message_uuid);					
				}
				if (type === "EMAIL") {
					console.log(`Email -- Sent for ${email}`);
					response = await EMAILUtils.sendEmail(message_purpose, email, name, JSON.parse(email_content));
				 	await updateMessageStatus.updateSmsOrEmailStatus(newMessageHistory.message_uuid, response === null ? "NOT_SENT" : "MESSAGE_SENT", sequelize);
				}

				await IncomingMessage.destroy({
					where: {
						id: id
					}
				});

				resolve("success")

			} catch (error) {
				resolve(null)
				console.log(error)
				console.log("Error While sending message error=====================>" + error)
			}
		});

	}
}