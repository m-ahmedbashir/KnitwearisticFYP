const express = require('express');
const bomController = require('../../controllers/Planner/bomController');
const bomroutr = express.Router();
const { protect } = require('../../middleware/authMiddleware')
bomroutr.post('/api/bom/add', bomController.bomController.addBom);
bomroutr.get('/api/bom/show', protect, bomController.bomController.showBom);
bomroutr.post('/api/bom/delete', protect, bomController.bomController.deleteBom);
bomroutr.put('/api/bom/update/:id', bomController.bomController.updateBomComplete);
bomroutr.get('/api/bom/:id', bomController.bomController.showBomById);
bomroutr.get('/api/pdf/', bomController.bomController.generatePDF);
bomroutr.get('/api/bom/sub:id', bomController.bomController.showSubDocumentById);
bomroutr.post('/api/bom/sub/delete', bomController.bomController.deleteSubDocument);
bomroutr.put('/api/bom/sub/update:id', bomController.bomController.updateSubDocument);
bomroutr.post('/api/bom/sub/add', bomController.bomController.addSubDocument);
bomroutr.get('/api/bom/sub/show:id', bomController.bomController.showBomdetailOperations)

module.exports = bomroutr;