'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class MessageHistory extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	};
	MessageHistory.init({
		message_uuid: {
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4
		},
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
			allowNull: true,
			type: DataTypes.STRING
		},
	}, {
		sequelize,
		modelName: 'MessageHistory',
	});
	return MessageHistory;
};