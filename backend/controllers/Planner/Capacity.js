const express=require('express');
const  expressAsyncHandler=require('express-async-handler');
const Capacity = require('../../models/capacity');
const AddCapacity=expressAsyncHandler(async(req,res,next)=>{
    try {
        const {companyName,companyDomain,companyEmail,companyCapacity,companyCapacityThreshold,companyEmployees}=req.body;
        //find if company already exists
        const companyExists=await Capacity.findOne({companyDomain});
        if(companyExists){
            return res.status(400).json({message:'Company already exists'});
        }
        const capacity=await Capacity.create({
            companyName,
            companyDomain,
            companyEmail,
            companyCapacity,
            companyCapacityThreshold,
            companyEmployees
});
res.status(201).json({
    message:'capacity added successfully',
    capacity
});

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'error adding capacity',
            error
        });
        
    }
 
 }
);

//Get capacity
const GetCapacity=expressAsyncHandler(async(req,res,next)=>{
    try {
        console.log(req.headers.email)
        const capacity=await Capacity.findOne({
            companyEmail:req.headers.email
        });
        console.log(capacity)
        res.status(200).json({
            message:'capacity retrieved successfully',
            capacity
        });

    } catch (error) {
        res.status(500).json({
            message:'error retrieving capacity',
            error
        });
        
    }
 
 }
);

module.exports={
    AddCapacity,
    GetCapacity
}