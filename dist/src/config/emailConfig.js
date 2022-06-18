'use strict';

var _constants = require('../helpers/constants');

let nodemailer = require('nodemailer');

// create reusable ViewOption for member email template
module.exports.ViewOption = (transport, hbs) => {
	transport.use('compile', hbs({
		viewEngine: {
			extName: '.html',
			partialsDir: 'src/views',
			layoutsDir: 'src/views',
			defaultLayout: false
		},
		viewPath: 'src/views',
		extName: '.html'
	}));
};

module.exports.AdminGmailTransport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: _constants.ADMIN_EMAIL,
		pass: _constants.ADMIN_EMAIL_PASSWORD
	}
});

module.exports.TestResultGmailTransport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: _constants.TEST_RESULT_EMAIL,
		pass: _constants.TEST_RESULT_EMAIL_PASSWORD
	}
});