const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({   
      //creating schema for order collection
        myName:{   //orderId is the primary key
        type:String,
       
        },
        email:{   //orderId is the primary key
            type:String,
            
        },
        designation:{   //orderId is the primary key
            type:String,
           
            },
        uid:{
            type:String,
        }

});


const orderModel=mongoose.model('order',orderSchema);
module.exports=orderModel;