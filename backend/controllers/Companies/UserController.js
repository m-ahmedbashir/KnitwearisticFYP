const express = require('express');
const User=require("../../models/Companies/Users");
const epxressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AddUser=epxressAsyncHandler(async(req,res)=>{
    try {
        const user=await User.findOne({$or:[{email:req.body.email},{companyDomain:req.body.companyDomain}]});
        if(user){
           return res.status(400).send("User already exists");
        }
        else{
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(req.body.password,salt);
            const user=new User({
                name:req.body.name,
                businessemail:req.body.businessemail,
                userRole:req.body.userRole,
                PhoneNumber:req.body.PhoneNumber,
                capacity:req.body.capacity,
                email:req.body.email,
                password:hashedPassword,
                companyDomain:req.body.companyDomain,
                TrialEnded:req.body.TrialEnded,
                upgraded:req.body.upgraded,
                plan:req.body.plan,
                customerCardName:req.body.customerCardName,
                payment:req.body.payment
            });
            await user.save();
            return res.status(201).send({
                message:"User Added Successfully",
                user:user
            });
        }
       
        
    } catch (error) {
       return res.status(400).send({message:error.message});
    }

})

const login=epxressAsyncHandler(async(req,res)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        if(!user){
            return res.status(400).send("User not found");
        }
        const isMatch=await bcrypt.compare(req.body.password,user.password);
        if(!isMatch){
            return res.status(400).send("Invalid Password");
        }
        const payload={
            id:user._id,
            name:user.name,
            businessemail:user.businessemail,
            userRole:user.userRole,
            PhoneNumber:user.PhoneNumber,
            capacity:user.capacity,
            email:user.email,
            companyDomain:user.companyDomain,
            TrialEnded:user.TrialEnded,
            upgraded:user.upgraded,
            plan:user.plan,
            customerCardName:user.customerCardName,
            payment:user.payment
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"1h"
        }
        );
        return res.status(200).send({
            message:"Login Successful",
            token:token
        });
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
});


module.exports={
    AddUser
}