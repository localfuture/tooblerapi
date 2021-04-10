const MailSetting = require('../models/mailSettings');

exports.saveMailSettings = (req,res) => {
    const newMailSetting = new MailSetting({
        totalMessageCount: req.body.totalMessageCount,
        sentMessageCount: req.body.sentMessageCount,
        recipientCount: 0
    });

    newMailSetting.save()
    .then(createdMessage => {
        res.status(201).json({
            message: "Mail Setting added successfully",
            menu: {
                ...createdMessage,
                id: createdMessage._id
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Creating a Mail Setting failed!"
        });
    });
}

exports.updateMailSettings = (req,res) => {
    const updateMail = new MailSetting({
        _id: req.body.id,
        totalMessageCount: req.body.totalMessageCount,
        sentMessageCount: req.body.sentMessageCount,
        recipientCount: 0
    });

    MailSetting.updateOne({_id: req.body.id}, updateMail)
    .then(createdMessage => {
        res.redirect('/');
    })
    .catch(error => {
        res.status(500).json({
            message: "Updating a Mail Setting failed!"
        });
    });
}
