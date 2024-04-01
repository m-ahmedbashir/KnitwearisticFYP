const express=require('express');
const asyncHandler=require('express-async-handler');
const OperationModel=require('../../models/Admin/Operations.js');

//making this available to our Node applications

//controller for the admin
const addOperation=asyncHandler(async(req,res)=>{
    try{
        const operation=new OperationModel({
            Sequence_No:req.body.Sequence_No,
            Operation:req.body.Operation,
            Machine_type:req.body.Machine_type,
            Rate:req.body.Rate,
            Smv:req.body.Smv,
            uid:req.body.uid,
            garmentStyleMulitplier:req.body.garmentStyleMulitplier,
            garmentStyle:req.body.garmentStyle
        });
        const response=await operation.save();
        res.status(200).json({
            message:'Operation Added Successfully'
        });
    }catch(err){
        res.status(500).json(err.message);
    }
});


//Delelte operation
const deleteOperation=asyncHandler(async(req,res)=>{  
    try{
        
        
        const response=await OperationModel.findByIdAndDelete(req.params.id);
        res.status(200).send(response);
    }catch(err){
        res.status(500).json(err.message);
    }
});

//Update operation
const updateOperation=asyncHandler(async(req,res)=>{
    try{
        console.log(req.body)
        const response=await OperationModel.findByIdAndUpdate({_id:req.params.id},{
            Sequence_No:req.body.Sequence_No,
            Operation:req.body.Operation,
            Machine_type:req.body.Machine_type,
            Rate:req.body.Rate,
            Smv:req.body.Smv,
            uid:req.body.uid,
            garmentStyleMulitplier:req.body.garmentStyleMulitplier,
            garmentStyle:req.body.garmentStyle
        });
        res.status(200).send(response);
        console.log(response);
    }catch(err){
        res.status(500).json(err.message);
    }
});

//Get all operations
const getAllOperations=asyncHandler(async(req,res)=>{
    console.log("get all operations");
    try{
        const response=await OperationModel.find();
        res.status(200).json(response);
    }catch(err){
        res.status(500).json(err.message);
    }
}
);
//Get operation by id
const getOperationById=asyncHandler(async(req,res)=>{
    try{
        
        const response=await OperationModel.findOne({_id:req.params.id});
        res.status(200).json(response);
    }catch(err){
        res.status(500).json(err.message);
    }
});
exports.controllerAdmin={
    addOperation,
    deleteOperation,
    updateOperation,
    getAllOperations,
    getOperationById
}