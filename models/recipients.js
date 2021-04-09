const mongoose = require("mongoose");

const recipientSchema = mongoose.Schema({
    recipientName: {
        type: String,
        required: true
    },
    actualPercentage: {
        type: Number,
        required: true,
        default: 0
    },
    currentPercentage: {
        type: Number,
        default: 0
    },
    percentageDifference: {
        type: Number,
        default: 0
    },
    receviedMessageCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Recipients", recipientSchema);
