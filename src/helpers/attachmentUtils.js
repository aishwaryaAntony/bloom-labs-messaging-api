import path from "path";
const fs = require('fs');
var multer = require('multer');
/**
*  Upload user image to s3
*/

const storageLocal = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "" + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storageLocal });

module.exports = {
    upload: upload
}