const express=require('express');
const controllerAdmin  = require('../../controllers/Admin/AdminController');
const adminRouter=express.Router();

adminRouter.post("/addOperation",controllerAdmin.controllerAdmin.addOperation);
adminRouter.delete("/deleteOperation/:id",controllerAdmin.controllerAdmin.deleteOperation);
adminRouter.put("/updateOperation/:id",controllerAdmin.controllerAdmin.updateOperation);
adminRouter.get("/getAllOperations",controllerAdmin.controllerAdmin.getAllOperations);
adminRouter.get("/getOperation/:id",controllerAdmin.controllerAdmin.getOperationById);
module.exports=adminRouter;
