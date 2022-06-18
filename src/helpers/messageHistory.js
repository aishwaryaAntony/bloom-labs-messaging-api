
export default {
	createMessageHistory(body, sequelize) {
		return new Promise(async (resolve, reject) => {
			try {
				let {
					member_token, name, phone_number, country_code, email, type, message_purpose, description, email_content, created_by
				} = body;

				let newMessageHistory = await sequelize.models.MessageHistory.create({
					member_token: member_token,
					name: name,
					phone_number: (type === "SMS" && phone_number !== undefined) ? phone_number : null,
					country_code: (type === "SMS" && country_code !== undefined) ? country_code : null,
					email: (type === "EMAIL" && email !== undefined) ? email : null,
					type: type,
					message_purpose: message_purpose,
					description: description,
					email_content: email_content,
					created_by: created_by,
					status: 'INITIATED'
				});

				resolve(newMessageHistory);

			} catch (error) {
				resolve(null)
				console.log(error)
				console.log("Error While sending message error=====================>" + error)
			}
		});

	}
}