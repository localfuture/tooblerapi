const MailSettings = require('../models/mailSettings');
const Recipients = require('../models/recipients');

exports.sendMessage = (req, res) => {
    // total message to be send
    var total = req.query.total;
    console.log('total: ' + total);

    // percentage of one mail
    var oneMailPercentage = 100 / total;
    console.log('one mail: ' + oneMailPercentage);

    Recipients.find()
        .then(data => {
            var recipientList = [];
            if (data.length > 0) {
                data.forEach(recipient => {
                    recipient.currentPercentage = recipient.receviedMessageCount * oneMailPercentage;
                    recipient.percentageDifference = recipient.currentPercentage - recipient.actualPercentage;
                    recipientList.push({
                        _id: recipient._id,
                        recipientName: recipient.recipientName,
                        actualPercentage: recipient.actualPercentage,
                        currentPercentage: recipient.currentPercentage,
                        percentageDifference: recipient.percentageDifference,
                        receviedMessageCount: recipient.receviedMessageCount
                    });
                });
            }

            return recipientList;
        })
        .then(recipientList => {
            if (recipientList.length > 0) {
                recipientList.forEach((data, index) => {
                    const updateData = new Recipients(data);
                    Recipients.updateOne({ _id: data._id }, updateData)
                        .then(updatedData => {
                            console.log('updated');
                            if (index == recipientList.length - 1) {
                                console.log('update completed');
                                Recipients.findOne().sort({ percentageDifference: 1 })
                                    .then(recipient => {
                                        console.log(recipient, oneMailPercentage);
                                        // MailSettings.findOne()
                                        // .then(data => {
                                        //     data.sentMessageCount = data.sentMessageCount + 1;
                                        //     const updateMailSetting = new MailSettings(data);
                                        //     MailSettings.updateOne({_id: data._id}, data)
                                        //     .then(success => {
                                        //         console.log('mail settings updated');
                                        //     })
                                        //     .catch(err => {
                                        //         console.log('erorr in updating mail settings');
                                        //     });
                                        // })
                                        // .catch(err => {
                                        //     console.log('error in fetching mail settings');
                                        // });

                                        recipient.receviedMessageCount++;
                                        recipient.currentPercentage = recipient.receviedMessageCount * oneMailPercentage;
                                        recipient.percentageDifference = recipient.currentPercentage - recipient.actualPercentage;
                                        const updatedRecipient = new Recipients(recipient);

                                        Recipients.updateOne({ _id: recipient._id }, updatedRecipient)
                                            .then(updatedRecipient => {
                                                console.log('updated Recipient');
                                                MailSettings.findOne()
                                                    .then(data => {
                                                        data.sentMessageCount = data.sentMessageCount + 1;
                                                        const updateMailSetting = new MailSettings(data);
                                                        MailSettings.updateOne({ _id: data._id }, data)
                                                            .then(success => {
                                                                console.log('mail settings updated');
                                                                res.status(201).json({
                                                                    message: "Updated Recipient",
                                                                    success: true
                                                                });
                                                            })
                                                            .catch(err => {
                                                                console.log('erorr in updating mail settings');
                                                                res.status(500).json({
                                                                    message: "Failed to send",
                                                                    success: false
                                                                });
                                                            });
                                                    })
                                                    .catch(err => {
                                                        console.log('error in fetching mail settings');
                                                    });
                                            })
                                            .catch(error => {
                                                res.status(500).json({
                                                    message: "Failed to send",
                                                    success: false
                                                });
                                            });
                                    });
                            }
                        })
                        .catch(err => {
                            console.log('error during updation');
                        })
                });
            }
        });
}
