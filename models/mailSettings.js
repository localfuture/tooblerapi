const mongoose = require("mongoose");

const mailSchema = mongoose.Schema({
    totalMessageCount: {
        type: Number,
        required: true,
        default: 0
    },
    sentMessageCount: {
        type: Number,
        required: true,
        default: 0
    },
    recipientCount: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("MailSettings", mailSchema);
