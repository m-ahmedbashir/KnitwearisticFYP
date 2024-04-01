const mongoose = require('mongoose');
const PaymentSchema = new mongoose.Schema({
    companyEmail: {
        type: String,
    },
    companyName: {
        type: String,
    },
    choosePlan: {
        type: String,
    },
    trialExpried: {
        type: String,
    },
    amount: {
        type: Number,
    },
    Address: {
        type: String,
    },
    City: {
        type: String,
    },
    State: {
        type: String,
    },
    Zip: {
        type: String,
    },
    Country: {
        type: String,
    }
});

// make model
const Payment = mongoose.model('Payment', PaymentSchema);
// export model
module.exports = Payment;
