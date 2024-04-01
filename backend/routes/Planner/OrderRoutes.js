const express = require('express');
const orderModel = require('../../models/dumymodel');
const SamOderRouter = express.Router();

const example = require('../../controllers/Planner/OrderController');
const { protect } = require('../../middleware/authMiddleware');
//Adding order to the database
SamOderRouter.post('/addorder', protect, example.example.addOrdr);
SamOderRouter.get('/showorder', protect, example.example.showOrder);
SamOderRouter.get('/showorder/:id', protect, example.example.showSingle);
SamOderRouter.post('/delorder', example.example.deleteOrder);
SamOderRouter.delete('/deleteOperation', protect, example.example.deleteSubOperation);
SamOderRouter.post('/addsuboperation', protect, example.example.addSamOrderOperation);
SamOderRouter.get('/findsuborder', protect, example.example.findOneDocumentOfOrder);
SamOderRouter.post('/updatesub', protect, example.example.updateSubDoc);
module.exports = SamOderRouter;