var express = require('express');
var router = express.Router();

var MailSetting = require('../models/mailSettings');
var Recipients = require('../models/recipients');
var mailSettingController = require('../controllers/mailSettings');
var recipientsController = require('../controllers/recipients');

/* GET home page. */
router.get('/', function (req, res, next) {
  MailSetting.findOne()
    .then(mail => {
      Recipients.find()
        .then(recipients => {
          res.render('home', { mailSettings: mail, recipients: recipients });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching failed!!!",
        error: error
      });
    });

});

router.get('/settings', function (req, res, next) {
  MailSetting.findOne()
    .then(data => {
      res.render('settings', { data: data });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching mail settings failed!!!"
      });
    });
});

router.post('/settings/update', mailSettingController.updateMailSettings);

router.get('/save', (req, res) => {
  const recipientList = [
    {
      recipientName: 'Recipient A',
      actualPercentage: 30,
      currentPercentage: 0,
      percentageDifference: 0,
      receviedMessageCount: 0
    },
    {
      recipientName: 'Recipient B',
      actualPercentage: 15,
      currentPercentage: 0,
      percentageDifference: 0,
      receviedMessageCount: 0
    },
    {
      recipientName: 'Recipient C',
      actualPercentage: 5,
      currentPercentage: 0,
      percentageDifference: 0,
      receviedMessageCount: 0
    },
    {
      recipientName: 'Recipient D',
      actualPercentage: 40,
      currentPercentage: 0,
      percentageDifference: 0,
      receviedMessageCount: 0
    },
    {
      recipientName: 'Recipient E',
      actualPercentage: 10,
      currentPercentage: 0,
      percentageDifference: 0,
      receviedMessageCount: 0
    }
  ];

  recipientList.forEach((data, index) => {
    const newRecipient = new Recipients(data);
    newRecipient.save();
    if (index == recipientList.length - 1) {
      res.send('success');
    }
  });
});

router.get('/send', recipientsController.sendMessage);

module.exports = router;
