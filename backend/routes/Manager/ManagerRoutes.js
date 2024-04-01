const express = require('express');
const { sendEmail } = require('../../controllers/Manager/AdminEmail');
const ManagerRouter = express.Router();


ManagerRouter.get('/sendEmail', sendEmail);
module.exports = ManagerRouter;