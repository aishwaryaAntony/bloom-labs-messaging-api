var express = require('express');
var router = express.Router();
import messageController from '../../../controllers/message';
import checkAuth from '../../../middleware/checkAuth';
import { upload } from "../../../helpers/attachmentUtils";

/**
 * @swagger
 *  /message:
 *    get:
 *     summary: Fetch all messages 
 *     description: "Fetch all message data Created_by: Gopinath"
 *     tags: [Message]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: offset
 *         in: query
 *         required: false
 *         type: number
 *     responses:
 *       200:
 *        description: "A successful response"
 *        application/json:
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: string
 *              example: "success"
 *            payload:
 *               type: array
 *               items:
 *                 $ref: "#/definitions/IncomingMessage"
 *            message:
 *              type: string
 *              example: "Messages fetched successfully"
 *       500:
 *        description: "Internal Server Error"
 *        application/json:
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: string
 *            payload:
 *              type: string
 *              nullable: true
 *            message:
 *              type: string
 *          example:
 *            status: "failed"
 *            payload: null
 *            message: "Error while fetching Messages"
 */
router.get('/', messageController.fetch_messages);

/**
 * @swagger
 *  /message:
 *    post:
 *     summary: send a new message 
 *     description: "Send a new message and store the message Created_by: Gopinath"
 *     tags: [Message]
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: member
 *         required: true
 *         description: Member details
 *         schema:
 *          type: object
 *          properties:
 *            member_token:
 *              type: string
 *            phone_number:
 *              type: string
 *            county_code:
 *              type: string
 *            email:
 *              type: string
 *            name:
 *              type: string
 *            type:
 *              type: string
 *            description:
 *              type: string
 *            message_purpose:
 *              type: string
 *            email_content:
 *              type: object
 *              properties:
 *                verification_code:
 *                  type:string
 *            created_by:
 *              type: integer
 *            status:
 *              type: string
 *          example:
 *            member_token: "mfg565hfg"
 *            name: "Gopinath M"
 *            phone_number: "9087654321"
 *            country_code: "+91"
 *            email: "gopinathm@kenlasystems.com"
 *            type: "SMS / EMAIL"
 *            description: "Email sent to Gopinath for verification code"
 *            message_purpose: "OTP"
 *            email_content:
 *               verification_code: "1234567"
 *            created_by: 1
 *            status: "ACTIVE"
 *     responses:
 *       200:
 *        description: "A successful response"
 *        application/json:
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: string
 *              example: "success"
 *            payload:
 *              $ref: "#/definitions/IncomingMessage"
 *            message:
 *              type: string
 *              example: "Messages fetched successfully"
 *       500:
 *        description: "Internal Server Error"
 *        application/json:
 *        schema:
 *          type: object
 *          properties:
 *            status:
 *              type: string
 *            payload:
 *              type: string
 *              nullable: true
 *            message:
 *              type: string
 *          example:
 *            status: "failed"
 *            payload: null
 *            message: "Error while sending message"
 */
router.post('/', checkAuth, messageController.new_send_messages);


/* 
    - Plivo will call this endpoint with the latest message details as and when the message status changes. 
    - The message attributes are passed to the status update url with every status change event.
    - Attributes passed as Form Data if the method configured is POST, and as Query Params if it’s GET.
*/
router.post('/update-sms-status', messageController.update_sms_status);

router.post('/send-prl-report', upload.single('file'), messageController.sendPRLReport);

module.exports = router;
