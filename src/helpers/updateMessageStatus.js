// import db from "../models";

export default {
	updateSmsOrEmailStatus(messageUuid, status, sequelize) {
		return new Promise(async (resolve, reject) => {
			try {
				console.log(`Update message status for ${messageUuid}`);
				let updatedMessageHistory = await sequelize.models.MessageHistory.update({
					message_uuid: messageUuid
				}, {
					where: {
						status: status
					},
					returning: true
				});
				let fetchUpdatedMessageHistory = updatedMessageHistory[1].length > 0 ? updatedMessageHistory[1][0] : null;
				resolve(fetchUpdatedMessageHistory);
			} catch (error) {
				console.log(`Error while updating message status for ${messageUuid} - ${error}`);
				reject(error)
			}
		})
	},

	updateSmsOrEmailStatusFromPlivo(messageUuid, status, db) {
		return new Promise(async (resolve, reject) => {
			try {
				console.log(`Update message status for ${messageUuid}`);
				let updatedMessageHistory = await db.MessageHistory.update({
					message_uuid: messageUuid
				}, {
					where: {
						status: status
					},
					returning: true
				});
				let fetchUpdatedMessageHistory = updatedMessageHistory[1].length > 0 ? updatedMessageHistory[1][0] : null;
				resolve(fetchUpdatedMessageHistory);
			} catch (error) {
				console.log(`Error while updating message status for ${messageUuid} - ${error}`);
				reject(error)
			}
		})
	}
}