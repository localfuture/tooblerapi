var express = require('express');
var router = express.Router();

var mailSettingController = require('../controllers/mailSettings');

/**
 * Save Mail Settings
 * @param request
 * @returns array
 */
router.post('/save', mailSettingController.saveMailSettings);

/**
 * Update Mail Settings
 * @param request
 * @returns array
 */
router.post('/update', mailSettingController.updateMailSettings);

module.exports = router;
