"use strict";

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _updateMessageStatus = require("../helpers/updateMessageStatus");

var _updateMessageStatus2 = _interopRequireDefault(_updateMessageStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.fetch_messages = async (req, res, next) => {
	try {

		let limit = 50;
		let offset = req.query.offset ? parseInt(req.query.offset) : 0;

		let fetchMessages = await _models2.default.MessageHistory.findAll({
			limit: limit,
			offset: offset,
			order: [['id', 'ASC']]
		});
		res.status(200).json({
			status: 'success',
			payload: fetchMessages,
			message: 'Messages Fetched successfully'
		});
	} catch (error) {
		console.log("Error at fetching messages method- GET / :" + error);
		res.status(500).json({
			status: 'failed',
			payload: null,
			message: 'Error while fetching message'
		});
	}
};

// exports.send_messages = async (req, res, next) => {
// 	try {

// 		let {
// 			member_token, name, phone_number, country_code, email, type, message_purpose, description, email_content
// 		} = req.body;

// 		let newMessage = await db.IncomingMessage.create({
// 			member_token: member_token,
// 			name: name,
// 			phone_number: (type === "SMS" && phone_number !== undefined) ? phone_number : null,
// 			country_code: (type === "SMS" && country_code !== undefined) ? country_code : null,
// 			email: (type === "EMAIL" && email !== undefined) ? email : null,
// 			type: type,
// 			message_purpose: message_purpose,
// 			description: description,
// 			status: "CREATED"
// 		});

// 		if (type === "SMS") {
// 			let response = await SMSUtils.sendSms(`${country_code}${phone_number}`, description)
// 			if (response === null) {
// 				await db.IncomingMessage.update({
// 					status: "NOT_SENT"
// 				}, {
// 					where: {
// 						id: newMessage.id
// 					}
// 				});
// 			} else {
// 				await db.IncomingMessage.update({
// 					status: "MESSAGE_SENT"
// 				}, {
// 					where: {
// 						id: newMessage.id
// 					}
// 				});
// 			}
// 		}
// 		if (type === "EMAIL") {
// 			let response = await EMAILUtils.sendEmail(message_purpose, email, name, email_content)
// 			if (response === null) {
// 				await db.IncomingMessage.update({
// 					status: "NOT_SENT"
// 				}, {
// 					where: {
// 						id: newMessage.id
// 					}
// 				});
// 			} else {
// 				await db.IncomingMessage.update({
// 					status: "MESSAGE_SENT"
// 				}, {
// 					where: {
// 						id: newMessage.id
// 					}
// 				});
// 			}
// 		}

// 		let fetchMessage = await db.IncomingMessage.findOne({
// 			where: {
// 				id: newMessage.id
// 			}
// 		});

// 		res.status(200).json({
// 			status: 'success',
// 			payload: fetchMessage,
// 			message: 'Message Sent successfully'
// 		});

// 	} catch (error) {
// 		console.log("Error at sending message method- POST / :" + error);
// 		res.status(500).json({
// 			status: 'failed',
// 			payload: null,
// 			message: 'Error while sending message'
// 		});
// 	}
// };


exports.new_send_messages = async (req, res, next) => {
	try {

		let {
			member_token, name, phone_number, country_code, email, type, message_purpose, description, email_content
		} = req.body;

		await _models2.default.IncomingMessage.create({
			member_token: member_token,
			name: name !== null ? name : 'User',
			phone_number: type === "SMS" && phone_number !== undefined ? phone_number : null,
			country_code: type === "SMS" && country_code !== undefined ? country_code : null,
			email: type === "EMAIL" && email !== undefined ? email : null,
			type: type,
			message_purpose: message_purpose,
			description: description,
			email_content: email_content !== null ? JSON.stringify(email_content) : null,
			created_by: req.userData.from,
			status: "CREATED"
		});

		res.status(200).json({
			status: 'success',
			payload: null,
			message: 'Message Sent successfully'
		});
	} catch (error) {
		console.log("Error at sending message method- POST / :" + error);
		res.status(500).json({
			status: 'failed',
			payload: null,
			message: 'Error while sending message'
		});
	}
};

exports.update_sms_status = async (req, res, next) => {
	try {
		let { message_uuid } = req.query;
		let {
			MessageUUID, To, From, Type, Status, Units, TotalRate, TotalAmount, MCC, MNC, ErrorCode, ParentMessageUUID, PartInfo, Sequence, MessageTime, QueuedTime, SentTime, DeliveryReportTime, PowerpackUUID
		} = req.body;

		await _updateMessageStatus2.default.updateSmsOrEmailStatusFromPlivo(message_uuid, Status);

		res.status(200).json({
			status: 'success',
			payload: null,
			message: 'Message Status updated successfully'
		});
	} catch (error) {
		console.log("Error at updating message status method- POST / :" + error);
		res.status(500).json({
			status: 'failed',
			payload: null,
			message: 'Error while updating message status'
		});
	}
};