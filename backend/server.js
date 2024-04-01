const path = require('path');
const express = require('express');
const app = express();
const colors = require('colors');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const SamOderRouter = require('./routes/Planner/OrderRoutes.js');
const adminRouter = require('./routes/Admin/AdminRoutes.js');
const bomroutr = require('./routes/Planner/bomroutes.js');
const UserRouter = require('./routes/Company/UserRoutes.js');
const ManagerRouter = require('./routes/Manager/ManagerRoutes.js');
const AddRouter = require('./routes/Planner/activity.js');
const CapacityRouter = require('./routes/Planner/Capacity.js');
const bomorderModel = require('./models/Planner/BOM');
const { Paymentrouter } = require('./routes/Planner/Payment.js');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const { protect } = require('./middleware/authMiddleware.js');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
//Route related to the planner order and sam order
app.use(SamOderRouter);
//bom routes planner access
app.use(bomroutr);
app.use(AddRouter);
//admin routes changes in the sam sheets
app.use('/api/admin/', adminRouter);
app.use(ManagerRouter);
app.use(CapacityRouter);
//Database connection setup mongoDB
app.use(UserRouter);
app.use(Paymentrouter)

app.post('/upload/bom', protect, async (req, res) => {
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
        const newBOM = await bomorderModel.create({
            finishItemCode: fItemCode,
            finishItemDescription: fitemDesc,
            finishUOM: fUom,
            StandardMinutes: stMin,
            CustomerName: cusName,
            style,
            BomDate: bomDate,
            ExchangeRate: exRate,
            DateExchangeRate: dExrate,
            companyEmail: req.user.businessemail,
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
        })

        return res.json({
            success: true,
            newBOM
        })
    } catch (error) {
        console.log(error)
        return res.json({
            success: false
        })
    }
})

app.get('/bom-data/:id', async (req, res) => {

    const { id } = req.params;

    await bomorderModel.findOne({ _id: id }).then(data => {
        return res.json({
            success: true,
            data
        })
    }).catch(err => console.log(err))
})

app.put('/extras/:id/:eId', async (req, res) => {
    const { id } = req.params;
    const { eId } = req.params
    const { text } = req.body

    const data = await bomorderModel.findOne({ _id: id })
    if (data) {
        data.Extras.map(ext => ext.id === eId ? ext.extra = text : ext.extra)
        await data.save()

        return res.json({
            msg: "Ok updated"
        })
    }


})


app.post('/update/bom/:id', async (req, res) => {
    const data = req.body
    const { id } = req.params
    delete data._id

    const bom = await bomorderModel.findOne({ _id: id })
    bom.delete()

    const newBom = await bomorderModel.create(data)
    await newBOM.save()

    res.json({
        message: 'Deleted and created'
    })
})

app.delete('/del-extra/:id/:eId', async (req, res) => {
    const { id } = req.params;
    const { eId } = req.params



    const data = await bomorderModel.findOne({ _id: id })
    if (data) {
        const extra = data.Extras.filter(ext => ext.id !== eId)
        data.Extras = extra
        await data.save()

        return res.json({
            msg: "Ok Deleted"
        })
    }
})

const port = process.env.PORT || 5000;

connectDB();



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}
var today = new Date();
console.log(Date.now().toLocaleString());
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
