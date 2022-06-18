var express = require('express');
var router = express.Router();
import countryCodes from '../../../controllers/countryCodes';

router.get('/', countryCodes.fetch_country_codes);
router.post('/', countryCodes.create_country_code);
router.put('/:id', countryCodes.update_country_code);

module.exports = router;
