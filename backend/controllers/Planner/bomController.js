const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const orderModel = require('../../models/dumymodel');
const bomorderModel = require('../../models/Planner/BOM');
// requires
const fs = require("fs");
const PDFDocument = require("pdfkit-table");

// init document
let doc = new PDFDocument({ margin: 30, size: 'A4' });
doc.pipe(fs.createWriteStream("./document.pdf"));
//add new bom
const addBom = expressAsyncHandler(async (req, res) => {
    try {
        const bom = new bomorderModel({
            finishItemCode: req.body.finishItemCode,
            finishItemDescription: req.body.finishItemDescription,
            finishUOM: req.body.finishUOM,
            StandardMinutes: req.body.StandardMinutes,
            CustomerName: req.body.CustomerName,
            style: req.body.style,
            BomDate: req.body.BomDate,
            ExchangeRate: req.body.ExchangeRate,
            DateExchangeRate: req.body.DateExchangeRate,
            Customization: req.body.Customization,
            UID: req.body.UID,
            BOM: req.body.BOM.map(bom => {
                return {
                    itemSequence: bom.itemSequence,
                    itemCode: bom.itemCode,
                    operationSequence: bom.operationSequence,
                    itemDescription: bom.itemDescription,
                    UOM: bom.UOM,
                    itemQuantity: bom.itemQuantity,
                    size: bom.size,
                    Suplier: bom.Suplier,
                    garmentCost: bom.garmentCost,
                    Rate: bom.Rate,
                    Comments: bom.Comments

                }

            })

        })
        const response = await bom.save();
        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});

//update bom
const updateBomComplete = expressAsyncHandler(async (req, res) => {
    const { bomOrder, formFields, bom } = req.body
    const {
        fItemCode,
        fitemDesc,
        fUom,
        stMin,
        cusName,
        style,
        bomDate,
        exRate,
        dExrate,
        cust,
        uid
    } = bomOrder;

    const {
        iSeq,
        opSeq,
        iCode,
        iDes,
        uom,
        iQuan,
        size,
        sup,
        gCost,
        rate,
        comments
    } = bom;
    try {

        const response = await bomorderModel.findOneAndUpdate({ _id: req.params.id }, {
            finishItemCode: fItemCode,
            finishItemDescription: fitemDesc,
            finishUOM: fUom,
            StandardMinutes: stMin,
            CustomerName: cusName,
            style,
            BomDate: bomDate,
            ExchangeRate: exRate,
            DateExchangeRate: dExrate,
            Customization: cust,
            UID: uid,
            BOM: {
                itemSequence: iSeq,
                operationSequence: opSeq,
                itemcode: iCode,
                itemDescription: iDes,
                UOM: uom,
                itemQuantity: iQuan,
                size,
                Suplier: sup,
                garmentCost: gCost,
                Rate: rate,
                Comments: comments
            },
            Extras: formFields
        }, { new: true });
        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
}
)
//show all bom
const showBom = expressAsyncHandler(async (req, res) => {
    try {
        const response = await bomorderModel.find({ companyEmail: req.user.businessemail });
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(err.message);
    }

});
//show bom by id
const showBomById = expressAsyncHandler(async (req, res) => {
    try {
        const response = await bomorderModel.findById(req.params.id);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(err.message);
    }
});
//show  bom 
const showSubDocumentById = expressAsyncHandler(async (req, res) => {
    try {
        const mainDoc = await bomorderModel.find({
            $and: [{
                UID: req.headers.uid,

            },
            {
                _id: req.header.id
            }
            ]

        });
        //finding sub document by id
        const subDoc = mainDoc.BOM.id(req.headers.subId);
        res.status(200).json(subDoc);

    } catch (err) {
        res.status(500).json(err.message);
    }
});

//add new sub document
const addSubDocument = expressAsyncHandler(async (req, res) => {
    try {
        //find the main document by id
        const mainDoc = await bomorderModel.find({ $and: [{ UID: req.headers.uid }, { _id: req.headers.id }] });
        //add sub document to the main document
        const subDoc = mainDoc.BOM.push({
            itemSequence: req.body.itemSequence,
            itemCode: req.body.itemCode,
            operationSequence: req.body.operationSequence,
            itemDescription: req.body.itemDescription,
            UOM: req.body.UOM,
            itemQuantity: req.body.itemQuantity,
            size: req.body.size,
            Suplier: req.body.Suplier,
            garmentCost: req.body.garmentCost,
            Rate: req.body.Rate,
            Comments: req.body.Comments

        });
        const response = await mainDoc.save();
        res.status(200).json(response);

    } catch (err) {
        res.status(500).json(err.message);
    }
});

//update sub document
const updateSubDocument = expressAsyncHandler(async (req, res) => {
    try {

        //find the main document by id
        const mainDoc = await bomorderModel.find({ $and: [{ UID: req.headers.uid }, { _id: req.headers.id }] });
        //find the sub document by id
        const subdoc = mainDoc.BOM.id(req.headers.subId);
        //update sub document
        subdoc.itemSequence = req.body.itemSequence;
        subdoc.itemCode = req.body.itemCode;
        subdoc.operationSequence = req.body.operationSequence;
        subdoc.itemDescription = req.body.itemDescription;
        subdoc.UOM = req.body.UOM;
        subdoc.itemQuantity = req.body.itemQuantity;
        subdoc.size = req.body.size;
        subdoc.Suplier = req.body.Suplier;
        subdoc.garmentCost = req.body.garmentCost;
        subdoc.Rate = req.body.Rate;
        subdoc.Comments = req.body.Comments;
        const response = await mainDoc.save();
        res.status(200).json(response);


    } catch (err) {
        res.status(500).json(err.message);
    }
});

//delete sub document by id
const deleteSubDocument = expressAsyncHandler(async (req, res) => {
    try {
        //find the main document by id
        const mainDoc = await bomorderModel.find({ $and: [{ UID: req.headers.uid }, { _id: req.headers.id }] });
        //find the sub document by id
        const subdoc = mainDoc.BOM.id(req.headers.subId);
        //delete sub document
        subdoc.remove();
        const response = await mainDoc.save();
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(err.message);
    }
});



//delete bom by id
const deleteBom = expressAsyncHandler(async (req, res) => {
    try {
        const response = await bomorderModel.findOneAndDelete({ companyEmail: req.user.businessemail });
        res.status(200).json(response);
    }
    catch (err) {
        res.status(500).json(err.message);
    }
});

// update bom by id
const updateBom = expressAsyncHandler(async (req, res) => {
    try {

        //find document
        const document = bomorderModel.find({ $and: [{ UID: req.headers.uid }, { _id: req.headers.id }] });
        //update document
        document.finishItemCode = req.body.finishItemCode;
        document.finishItemDescription = req.body.finishItemDescription;
        document.finishUOM = req.body.finishUOM;
        document.StandardMinutes = req.body.StandardMinutes;
        document.CustomerName = req.body.CustomerName;
        document.style = req.body.style;
        document.BomDate = req.body.BomDate;
        document.ExchangeRate = req.body.ExchangeRate;
        document.DateExchangeRate = req.body.DateExchangeRate;
        document.Customization = req.body.Customization;
        document.UID = req.body.UID;
        const response = await document.save();
        res.status(200).json(response);


    } catch (err) {
        res.status(500).json(err.message);
    }
});


// show the document for one bom order
const showBomdetailOperations = expressAsyncHandler(async (req, res) => {
    try {
        const mainDoc = await bomorderModel.find({ $and: [{ UID: req.headers.uid }, { _id: req.params.id }] });
        res.status(200).json(mainDoc);

    } catch (err) {
        res.status(500).json(err.message)
    }
});

const generatePDF = expressAsyncHandler(async (req, res) => {
    try {
        const mainDoc = await bomorderModel.find({ _id: req.headers.id });        // table 
        const table = {
            title: "Title",
            subtitle: "Subtitle",
            headers: ["Country", "Conversion rate", "Trend"],
            rows: [
                ["Switzerland", "12%", "+1.12%"],
                ["France", "67%", "-0.98%"],
                ["England", "33%", "+4.44%"],
            ],
        };
        // A4 595.28 x 841.89 (portrait) (about width sizes)
        // width
        await doc.table(table, {
            width: 300,
        });
        // or columnsSize
        await doc.table(table, {
            columnsSize: [200, 100, 100],
        });
        // done!
        doc.end();
        res.render('/download', {
            path: fs.readSync('./document.pdf')
        });
        console.log(fs.readSync('./document.pdf'))
    } catch (err) {
        res.status(500).json(err.message)
    }
}
);
exports.bomController = { addBom, addSubDocument, generatePDF, updateBom, updateSubDocument, deleteBom, deleteSubDocument, showBom, showBomById, showSubDocumentById, showBomdetailOperations, updateBomComplete }