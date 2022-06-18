'use strict';
const {
	Model
} = require('sequelize');
import MessageUtils from "../helpers/message";

/**
 * @swagger
 * definitions:
 *   IncomingMessage:
 *     type: object
 *     required:
 *       - id
 *       - member_token
 *       - name
 *       - type
 *       - status
 *     properties:
 *       id:
 *         type: integer
 *       member_token:
 *         type: string
 *       phone_number:
 *         type: string
 *       country_code:
 *         type: string
 *       email:
 *         type: string
 *       name:
 *         type: string
 *       type:
 *         type: string
 *       description:
 *         type: string
 *       message_purpose:
 *         type: string
 *       email_content:
 *         type: string
 *       created_by:
 *         type: integer
 *       status:
 *         type: string
 *     example:
 *        id: 1
 *        member_token: "hh5sd78fsd5fhh898"
 *        phone_number: "90123456789"
 *        country_code: "+91"
 *        email: "gopinathm@kenlasystems.com"
 *        name: "Gopinath M"
 *        type: "EMAIL / SMS"
 *        description: "Email sent to Gopinath for verification code"
 *        message_purpose: "OTP"
 *        email_content: "{'link':'hhhhh'}"
 *        created_by: 1
 *        status: "ACTIVE"
 */

module.exports = (sequelize, DataTypes) => {
	class IncomingMessage extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	IncomingMessage.init({
		member_token: {
			allowNull: true,
			type: DataTypes.STRING
		},
		phone_number: {
			allowNull: true,
			type: DataTypes.STRING
		},
		country_code: {
			allowNull: true,
			type: DataTypes.STRING
		},
		email: {
			allowNull: true,
			type: DataTypes.STRING
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		description: {
			allowNull: true,
			type: DataTypes.TEXT
		},
		type: {
			allowNull: false,
			type: DataTypes.STRING
		},
		message_purpose: {
			allowNull: true,
			type: DataTypes.STRING
		},
		email_content: {
			allowNull: true,
			type: DataTypes.TEXT
		},
		created_by: {
			allowNull: true,
			type: DataTypes.STRING
		},
		status: {
			allowNull: false,
			type: DataTypes.STRING
		},
	}, {
		sequelize,
		modelName: 'IncomingMessage',
		hooks: {
			afterCreate: (IncomingMessage, options) => {
				MessageUtils.sendSmsOrEmail(IncomingMessage, options, sequelize);
			}
		}
	});
	return IncomingMessage;
};