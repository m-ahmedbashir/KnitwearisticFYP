const express=require('express');
const UserRouter=express.Router();
const {AddUser}=require('../../controllers/Companies/UserController');
UserRouter.post('/addUser',AddUser);
module.exports=UserRouter
