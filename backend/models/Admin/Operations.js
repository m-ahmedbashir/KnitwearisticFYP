const mongoose=require('mongoose');
const OperationSchema=new mongoose.Schema({
    Sequence_No:{
        type:Number,
    },
    Operation:{
        type:String,
    },
    Machine_type:{
        type:String,
    },
    Rate:{
        type:Number,
    },
    Smv:{
        type:Number,
    },
    garmentStyleMulitplier:{
        type:Number,

    },
    uid:{
        type:String,
    },
    garmentStyle:{
        type:String,
    }

});

//make this available to our Node applications
//make model of the schema
const OperationModel=mongoose.model('Operation',OperationSchema);
module.exports=OperationModel;