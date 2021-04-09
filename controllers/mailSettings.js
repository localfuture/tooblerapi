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
    console.log(req.body);
    // const mailSettings = new MailSetting({
    //     _id: req.body.id,
    //     totalMessageCount: req.body.totalMessageCount,
    //     sentMessageCount: req.body.sentMessageCount,
    //     recipientCount: 0
    // });

    // MailSetting.updateOne({_id: req.body.id}, mailSettings)
    // .then(createdMessage => {
    //     res.status(201).json({
    //         message: "Mail Setting updated successfully",
    //         menu: {
    //             ...createdMessage,
    //             id: createdMessage._id
    //         }
    //     });
    // })
    // .catch(error => {
    //     res.status(500).json({
    //         message: "Updating a Mail Setting failed!"
    //     });
    // });
}
