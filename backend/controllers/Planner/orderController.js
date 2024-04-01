const express = require('express');
const OrderModel = require('../../models/OrderSchema.js');
const asyncHandler = require('express-async-handler');
const orderModel = require('../../models/dumymodel.js');
const OperationModel = require('../../models/Admin/Operations.js');

const addOrdr = asyncHandler(async (req, res) => {
    try {
        //find the operation by garment style
        const operation = await OperationModel.find({ garmentStyle: req.body.garmentStyle });
        console.log(operation[0].garmentStyleMulitplier);
        var garmentStyleMulitplier = operation[0].garmentStyleMulitplier;
        // console.log(operation);
        if (operation.length === 0) {
            res.status(400).json({
                message: 'No garment style found'
            });
        }

        if (garmentStyleMulitplier != undefined) {
            const order = new OrderModel({
                workOrderNumber: req.body.workOrderNumber,
                garmentStyle: req.body.garmentStyle,
                CustomerName: req.body.CustomerName,
                quantity: req.body.garmentQTY,
                garmentStyleMulitplier: garmentStyleMulitplier,
                companyEmail: req.user.businessemail,
                operation: operation
            });
            const response = await order.save();
            res.status(200).json({
                message: 'Oder Add Successfully'
            });

            // if bad request send 400
            if (!response) {
                res.status(400).send('Bad Request');
            }
        }


    } catch (err) {
        res.status(500).json(err.message);
        console.log(err);

    }


});

const showOrder = asyncHandler(async (req, res) => {

    try {
        const response = await OrderModel.find({
            companyEmail: req.user.businessemail
        });

        res.status(200).json({
            message: 'Order List',
            data: response
        });

    }
    catch (err) {
        res.status(500).json(err.message);
    }
});

//show single order
const showSingle = asyncHandler(async (req, res) => {

    try {
        const response = await OrderModel.findOne({ _id: req.params.id });
        res.status(200).json({
            message: 'Order List',
            data: response.operation,
            order: response
        });

    }
    catch (err) {
        res.status(500).json(err.message);
    }
}
);
const deleteOrder = asyncHandler(async (req, res) => {
    try {
        const uid = req.headers.uid;
        const id = req.body.id;
        //find the  order by uid
        const ordrbyId = await OrderModel.findOne({ UID: uid });
        console.log(ordrbyId)
        // find the operation by id
        const operation = ordrbyId.operation.id(id);
        //remove the operation from the array
        operation.remove();
        //save the  order 
        const response = await ordrbyId.save();
        // send the response back that order deleted
        res.status(200).send(response);
    } catch (err) {

        res.status(500).send(
            err.message
        )
    };


});
// adding new operation on the same order
const addSamOrderOperation = asyncHandler(async (req, res) => {
    try {

        const ordrbyId = await OrderModel.findOne({ companyEmail: req.user.businessemail });
        console.log(ordrbyId)
        //pick one element from the array of first index
        const OperationSubject = ordrbyId.operation[0];
        // add operation as sub array document
        const operation = ordrbyId.operation.push({
            Sequence_No: req.body.Sequence_No,
            Operation: req.body.Operation,
            Machine_type: req.body.Machine_type,
            Rate: req.body.Rate,
            Smv: req.body.Smv,
            uid: OperationSubject.uid,
            garmentStyleMulitplier: OperationSubject.garmentStyleMulitplier,
            garmentStyle: OperationSubject.garmentStyle
        });


        //save the  order 
        const response = await ordrbyId.save();
        // send the response back that order deleted
        res.status(200).send({
            message: 'Operation Added Successfully'
        });
    } catch (err) {

        res.status(500).send(
            err.message
        )
    };


});

//delte the sub operation from the order
const deleteSubOperation = asyncHandler(async (req, res) => {
    try {

        //find the  order by email
        const ordrbyId = await OrderModel.findOne({
            companyEmail: req.user.businessemail,
        });
        const operation = ordrbyId.operation.id(req.headers.id);
        operation.remove();
        const response = await ordrbyId.save();
        // send the response back that order deleted
        res.status(200).send(response);
    } catch (err) {

        res.status(500).send(
            err.message
        )
    };


}
);
//finding the sub document as one document to update
const findOneDocumentOfOrder = asyncHandler(async (req, res) => {
    try {

        const mainDoc = await OrderModel.findOne({ companyEmail: req.user.businessemail });
        const subDocument = mainDoc.operation.id(req.headers.id);
        res.status(200).send(subDocument);

    } catch (err) {
        res.status(500).send(err.message);
    }
});

//updap  the subdocument
const updateSubDoc = asyncHandler(async (req, res) => {

    try {
        const uid = req.user.businessemail;
        //find the  subdoc
        const maindoc = await OrderModel.findOne({
            companyEmail: uid
        });
        //find required subdoc
        const subDoc = maindoc.operation.id(req.headers.id);
        //add new values
        subDoc.Sequence_No = req.body.Sequence_No;
        subDoc.Operation = req.body.Operation;
        subDoc.Machine_type = req.body.Machine_type;
        subDoc.Rate = req.body.Rate;
        subDoc.Smv = req.body.Smv;
        subDoc.uid = subDoc.uid;
        subDoc.garmentStyleMulitplier = subDoc.garmentStyleMulitplier;
        subDoc.garmentStyle = subDoc.garmentStyle;
        //save the  main document
        // save the  doc
        const response = await maindoc.save();
        res.status(200).send({
            message: 'Operation Updated Successfully'
        });
        //second method update the  doc direct by the update method in the  mongodb

    } catch (error) {
        res.status(500).send(error.message);
    }
});
exports.example = { showSingle, addOrdr, showOrder, deleteOrder, addSamOrderOperation, findOneDocumentOfOrder, updateSubDoc, deleteSubOperation };