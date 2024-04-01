const express = require('express');
const { AddPayment, CheckPayment } = require('../../controllers/Planner/Payment');
const { protect } = require('../../middleware/authMiddleware');
const Paymentrouter = express.Router();

Paymentrouter.get('/check', CheckPayment);
Paymentrouter.post('/addPayment', protect, AddPayment);
module.exports = { Paymentrouter };