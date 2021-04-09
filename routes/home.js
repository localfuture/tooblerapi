var express = require('express');
var router = express.Router();

var MailSetting = require('../models/mailSettings');
var mailSettingController = require('../controllers/mailSettings');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/settings', function(req, res, next) {
  MailSetting.findOne()
  .then(data => {
    res.render('settings', {data: data});
  })
  .catch(error => {
      res.status(500).json({
            message: "Fetching mail settings failed!!!"
      });
  });
});

router.post('/save', mailSettingController.updateMailSettings);

module.exports = router;
