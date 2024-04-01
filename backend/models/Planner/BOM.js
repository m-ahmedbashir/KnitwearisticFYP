const mongoose = require('mongoose');
const bomSchema = new mongoose.Schema({
    itemSequence: {
        type: Number,

    },
    operationSequence: {
        type: Number,

    },
    itemcode: {
        type: String,
    },
    itemDescription: {

    },
    UOM: {
        type: String,

    },
    itemQuantity: {
        type: Number,

    },
    size: {
        type: String,

    },
    Suplier: {
        type: String,

    },
    garmentCost: {
        type: Number,

    },
    Rate: {
        type: Number,
    },
    Comments: {
        type: String,
    }
});

const bomOrderSchema = new mongoose.Schema({
    finishItemCode: {
        type: String,
        required: true
    },
    finishItemDescription: {
        type: String,
    },
    finishUOM: {
        type: String,
    },
    StandardMinutes: {
        type: Number,
    },
    CustomerName: {
        type: String,
        required: true
    },
    style: {
        type: String,
    },
    BomDate: {
        type: String,
        required: true
    },
    ExchangeRate: {
        type: Number
    },
    DateExchangeRate: {
        type: String,
    },
    Customization: {
        type: String,
    },
    companyEmail: {
        type: String
    },
    UID: {
        type: String,
        required: true
    },
    BOM: [
        bomSchema
    ],
    Extras: [

    ]

});

const bomorderModel = mongoose.model('BOM', bomOrderSchema);
module.exports = bomorderModel;