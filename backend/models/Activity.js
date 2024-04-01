const mongoose = require('mongoose');
var today = new Date();
const ActivitySchema = new mongoose.Schema({
    merchandizer: {
        type: String,
    },
    customer: {
        type: String,
    },
    leadingPerson: {
        type: String,
    },
    CustomerProductOrder: {
        type: String,
    },
    category: {
        type: String,
    },
    productStyle: {
        type: String,
    },
    Emblishment: {
        type: String,
    },
    garmentPicture: {
        type: String,
        defualt: "https://firebasestorage.googleapis.com/v0/b/knitwearistic.appspot.com/o/hero-1.png?alt=media&token=899de1f0-9d24-4b0f-972d-2c3d4f053dbd"
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    bulkTesting: {
        type: String,
        default: 'No'
    },
    ApprovalDate: {
        type: String,
        default: today
    },
    ApprovalStatus: {
        type: String,
        default: 'Pending'
    },
    cuttingStatus: {
        type: String,
        default: 'Pending'
    },
    cuttingQuantity: {
        type: Number,
        default: 0
    },
    cuttingLoad: {
        type: Number,
        default: 0
    },
    cuttingDate: {
        type: String,
        default: today
    },
    stichQuantity: {
        type: Number,
        default: 0
    },
    stichLoad: {
        type: Number,
        default: 0
    },
    StichStatus: {
        type: String,
        default: 'Pending'
    },
    StichDate: {
        type: String,
        default: today
    },
    printQuantity: {
        type: Number,
        default: 0
    },
    printLoad: {
        type: Number,
        default: 0
    },
    printStatus: {
        type: String,
        default: 'Pending'
    },

    emblimentQuantity: {
        type: Number,
        default: 0
    },
    emblimentLoad: {
        type: Number,
        default: 0
    },
    emblimentStatus: {
        type: String,
        default: 'Pending'
    },
    emblimentDate: {
        type: String,
        default: today
    },
    washingQuantity: {
        type: Number,
        default: 0
    },
    washingLoad: {
        type: Number,
        default: 0
    },
    washingStatus:
    {
        type: String,
        default: 'Pending'
    },
    washingDate: {
        type: String,
        default: today
    },
    packingQuantity: {
        type: Number,
        default: 0
    },
    packingLoad: {
        type: Number,
        default: 0
    },
    packingStatus: {
        type: String,
        default: 'Pending'
    },
    packingDate: {
        type: String,
        default: today
    },
    finishingQuantity: {
        type: Number,
        default: 0
    },
    finishingLoad: {
        type: Number,
        default: 0
    },
    finishingStatus: {
        type: String,
        default: 'Pending'
    },
    finishingDate: {
        type: String,
        default: today
    },
    orderStatus: {
        type: String,
        default: 'Pending'
    },
    remainingQuantity: {
        type: Number,
        default: 0
    },
    user: {
        type: String,
    }
}
    , {
        timestamps: true
    }
);
const Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;
