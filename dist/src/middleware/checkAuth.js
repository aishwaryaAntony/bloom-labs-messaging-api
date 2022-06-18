"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = require("../helpers/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = async (req, res, next) => {
    try {
        const headers = req.headers;
        if (headers.hasOwnProperty('authorization')) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = _jsonwebtoken2.default.verify(token, _constants.JWT_PRIVATE_KEY);
            req.userData = decoded;

            if (Object.keys(decoded).length > 0) {
                let account_token = decoded.account_token;
                if (account_token !== "12345") {
                    return res.status(401).json({
                        status: 'failed',
                        message: 'Auth failed'
                    });
                }
            } else {
                return res.status(401).json({
                    status: 'failed',
                    message: 'Auth failed'
                });
            }

            next();
        } else {
            return res.status(401).json({
                status: 'failed',
                message: 'Auth failed'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'failed',
            message: 'Auth failed'
        });
    }
};