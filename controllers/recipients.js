const Message = require('../models/message')
const Recipient = require('../models/recipient');

var algo = require('../alogrithm/logic');

exports.getRecipient = (req, res) => {
    //algo.logic();
    res.render('recipient');
}

exports.messageDetails = (req, res) => {
    Message.findOne()
    .then(message => {
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ message: "message not found!" });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching message failed!"
        });
    });
}

exports.storeRecipients = (req,res) => {
    const recipient = new Recipient({
        recipientName: req.body.recipientName,
        actualPercentage: req.body.actualPercentage,
        currentPercentage: req.body.actualPercentage,
        totalMessageCount: 0,
        receviedMessageCount: 0,
        balanceMessageCount: 0
    });

    recipient.save()
    .then(createdrecipient => {
        res.status(201).json({
            message: "Recipient added successfully",
            menu: {
                ...createdrecipient,
                id: createdrecipient._id
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Creating a recipient failed!"
        });
    });
}

exports.recipientDetails = (req,res) => {
    Recipient.find()
    .then(message => {
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ message: "message not found!" });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching message failed!"
        });
    });
}

exports.singleUpdate = (req,res) => {
   Recipient.findById(req.params.id).then(data => {
       res.render('recipientform', {data: data});
   })
}

exports.update = (req,res) => {
    const recipient = new Recipient({
        _id: req.body.id,
        recipientName: req.body.recipientName,
        actualPercentage: req.body.actualPercentage,
        currentPercentage: req.body.actualPercentage,
        totalMessageCount: 0,
        receviedMessageCount: 0,
        balanceMessageCount: 0
    });

    Recipient.updateOne({_id: req.body.id}, recipient)
    .then(data => {
        console.log(data);
        res.redirect('/recipient');
    })
}
