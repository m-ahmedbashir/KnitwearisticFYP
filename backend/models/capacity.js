const mongooes=require('mongoose');
const CapacitSchema=new mongooes.Schema({
    companyName:{
        type:String,
        required:true
    },
    companyDomain:{
        type:String,
        required:true
    },
    companyEmail:{
        type:String,
        required:true
    },
    companyCapacity:{
        type:Number,
        required:true
    },
    companyCapacityThreshold:{
        type:Number,
        required:true
    }
    ,
    companyEmployees:{
        type:Number,
        required:true
    }
   
});

// make model
const Capacity=mongooes.model('companyCapacity',CapacitSchema);
module.exports=Capacity;
