'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _constants = require('./constants');

var path = require('path');
var MailConfig = require('../config/emailConfig');
var hbs = require('nodemailer-express-handlebars');
var AdminGmailTransport = MailConfig.AdminGmailTransport;
var TestResultGmailTransport = MailConfig.TestResultGmailTransport;

var templateAttachments = [{
	filename: 'Logo.png',
	path: path.resolve(__dirname, '../views/logo.png'),
	cid: 'logo'
}];

exports.default = {
	sendEmail(template, toAddress, name, data) {
		return new Promise(async (resolve, reject) => {
			try {
				let subject = "";
				let attachments = [];
				let mailTemplate = "";
				let mail_id = null;

				switch (template) {
					case "OTP":
						MailConfig.ViewOption(AdminGmailTransport, hbs);
						subject = "Welcome to Saguaro Bloom";
						attachments = [...templateAttachments];
						mailTemplate = "otpTemplate";
						mail_id = _constants.ADMIN_EMAIL;
						break;
					case "PASSWORD":
						MailConfig.ViewOption(AdminGmailTransport, hbs);
						subject = "Welcome to Saguaro Bloom";
						attachments = [...templateAttachments];
						mailTemplate = "passwordTemplate";
						mail_id = _constants.ADMIN_EMAIL;
						break;
					case "FORGOT_PASSWORD":
						MailConfig.ViewOption(AdminGmailTransport, hbs);
						subject = "Change Password Request";
						attachments = [...templateAttachments];
						mailTemplate = "forgotPasswordTemplate";
						mail_id = _constants.ADMIN_EMAIL;
						break;
					case "TEST_RESULT":
						MailConfig.ViewOption(TestResultGmailTransport, hbs);
						subject = "Test Results";
						// attachments = [...templateAttachments];
						mailTemplate = "testResultTemplate";
						mail_id = _constants.TEST_RESULT_EMAIL;
						break;
					case "QR_CODE":
						MailConfig.ViewOption(AdminGmailTransport, hbs);
						subject = "QR Code Pass";
						attachments = [...templateAttachments, {
							filename: name + '_qr_code.png',
							path: data.qrCodeImage
						}];
						mailTemplate = "qrCodePassTemplate";
						mail_id = _constants.ADMIN_EMAIL;
						break;
					default:
						console.log("=====================>Invalid Template");
						break;
				}

				let HelperOptions = {
					from: '"Saguaro Bloom Diagnostics"' + mail_id,
					to: toAddress,
					subject: subject,
					template: mailTemplate,
					context: {
						name: name,
						data: data
					},
					attachments: attachments
				};

				if (mailTemplate !== "") {
					if (template === "TEST_RESULT") {
						TestResultGmailTransport.sendMail(HelperOptions, (error, info) => {
							if (error) {
								resolve(null);
								console.log("Email not sent================>" + error);
							} else {
								resolve(info);
								console.log("=======================>email is send" + JSON.stringify(info));
							}
						});
					} else {
						AdminGmailTransport.sendMail(HelperOptions, (error, info) => {
							if (error) {
								resolve(null);
								console.log("Email not sent================>" + error);
							} else {
								resolve(info);
								console.log("=======================>email is send" + JSON.stringify(info));
							}
						});
					}
				}
			} catch (ex) {
				resolve(null);
				console.log("Email error=====================>" + ex);
			}
		});
	}
};