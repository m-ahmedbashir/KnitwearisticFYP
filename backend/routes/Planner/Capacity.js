const express=require('express');
const { AddCapacity,GetCapacity} = require('../../controllers/Planner/Capacity');
const AddCapacityRouter=express.Router();
AddCapacityRouter.post('/addCapacity',AddCapacity);
AddCapacityRouter.get('/showCapacity',GetCapacity);
// AddCapacityRouter.get('/showAcitvity/:id',ShowActivityById);
// AddCapacityRouter.post('/updateAcitvity',UpdateActivityById);
// AddCapacityRouter.post('/deleteAcitvity/:id',DeleteActivityById);
module.exports=AddCapacityRouter;