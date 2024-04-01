const mongoose = require('mongoose');
const oprationSchema = new mongoose.Schema({
    Sequence_No: {
        type: Number,
    },
    Operation: {
        type: String,
    },
    Machine_type: {
        type: String,
    }
    ,
    Rate: {
        type: Number,
    }
    ,
    Smv: {
        type: Number,
    }
    ,
    uid: {
        type: String,
    }
    ,
    garmentStyleMulitplier: {
        type: Number,
    }
    ,
    garmentStyle: {
        type: String,
    }


});
const OrderShcema = new mongoose.Schema({
    workOrderNumber: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
    },
    garmentStyle: {
        type: String,
        required: true
    },
    CustomerName: {
        type: String,
        rquired: true
    },

    companyEmail: {
        type: String
    },

    garmentStyleMulitplier: {
        type: Number,


    },
    operation: [
        oprationSchema
    ]
});

//making model of the orderSchema
const OrderModel = mongoose.model('PlannerOrder', OrderShcema);
//exporting the  model
module.exports = OrderModel;