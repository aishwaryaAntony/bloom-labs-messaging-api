"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _plivoSmsUtils = require("./plivoSmsUtils");

var _plivoSmsUtils2 = _interopRequireDefault(_plivoSmsUtils);

var _emailUtils = require("./emailUtils");

var _emailUtils2 = _interopRequireDefault(_emailUtils);

var _messageHistory = require("./messageHistory");

var _messageHistory2 = _interopRequireDefault(_messageHistory);

var _updateMessageStatus = require("./updateMessageStatus");

var _updateMessageStatus2 = _interopRequireDefault(_updateMessageStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	sendSmsOrEmail(IncomingMessage, options, sequelize) {
		return new Promise(async (resolve, reject) => {
			try {
				let {
					id, name, phone_number, country_code, email, type, message_purpose, description, email_content
				} = IncomingMessage;

				let newMessageHistory = await _messageHistory2.default.createMessageHistory(IncomingMessage, sequelize);
				let response = null;
				if (type === "SMS") {
					console.log(`SMS -- Sent for ${country_code}${phone_number}`);
					await _plivoSmsUtils2.default.sendSms(`${country_code}${phone_number}`, description, newMessageHistory.message_uuid);
				}
				if (type === "EMAIL") {
					console.log(`Email -- Sent for ${email}`);
					response = await _emailUtils2.default.sendEmail(message_purpose, email, name, JSON.parse(email_content));
					await _updateMessageStatus2.default.updateSmsOrEmailStatus(newMessageHistory.message_uuid, response === null ? "NOT_SENT" : "MESSAGE_SENT", sequelize);
				}

				await IncomingMessage.destroy({
					where: {
						id: id
					}
				});

				resolve("success");
			} catch (error) {
				resolve(null);
				console.log(error);
				console.log("Error While sending message error=====================>" + error);
			}
		});
	}
};