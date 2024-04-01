const express = require('express');
const asyncHandler = require('express-async-handler');
const Activity = require('../../models/Activity');
const User = require('../../models/userModel');
const { sendEmail } = require('../Manager/AdminEmail');
const nodemailer = require('nodemailer');
const AddActivity = asyncHandler(async (req, res) => {
    try {



        const order = await Activity.findOne({ customer: req.body.customer }).sort({ createdAt: -1 });
        const user = await User.findOne({ businessemail: req.user.businessemail });
        var thirty = (0.3 * user.capacity);

        //check order quantity

        if (order) {
            if (order.remainingQuantity >= req.body.quantity) {
                const remaining = order.remainingQuantity - req.body.quantity;
                const activity = await Activity.create({
                    merchandizer: req.body.merchandizer,
                    customer: req.body.customer,
                    CustomerProductOrder: req.body.CustomerProductOrder,
                    category: req.body.category,
                    leadingPerson: req.body.leadingPerson,
                    productStyle: req.body.productStyle,
                    Emblishment: req.body.Emblishment,
                    garmentPicture: req.body.garmentPicture,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    bulkTesting: req.body.bulkTesting,
                    ApprovalDate: req.body.ApprovalDate,
                    ApprovalStatus: req.body.ApprovalStatus,
                    cuttingStatus: req.body.cuttingStatus,
                    cuttingQuantity: req.body.cuttingQuantity,
                    cuttingLoad: req.body.cuttingLoad,
                    cuttingDate: req.body.cuttingDate,
                    stichQuantity: req.body.stichQuantity,
                    stichLoad: req.body.stichLoad,
                    StichStatus: req.body.StichStatus,
                    StichDate: req.body.StichDate,
                    printQuantity: req.body.printQuantity,
                    printLoad: req.body.printLoad,
                    printStatus: req.body.printStatus,
                    emblimentQuantity: req.body.emblimentQuantity,
                    emblimentLoad: req.body.emblimentLoad,
                    emblimentStatus: req.body.emblimentStatus,
                    emblimentDate: req.body.emblimentDate,
                    washingQuantity: req.body.washingQuantity,
                    washingLoad: req.body.washingLoad,
                    washingStatus: req.body.washingStatus,
                    washingDate: req.body.washingDate,
                    packingQuantity: req.body.packingQuantity,
                    packingLoad: req.body.packingLoad,
                    packingStatus: req.body.packingStatus,
                    packingDate: req.body.packingDate,
                    finishingQuantity: req.body.finishingQuantity,
                    finishingLoad: req.body.finishingLoad,
                    finishingStatus: req.body.finishingStatus,
                    finishingDate: req.body.finishingDate,
                    remainingQuantity: remaining,
                    user: req.user.businessemail,
                    orderStatus: 'On-going',
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                });
                res.status(200).json(activity);
            }

            else {
                if (order.remainingQuantity <= req.body.quantity) {
                    const remaining = order.remainingQuantity - req.body.quantity;
                    const activity = await Activity.create({
                        merchandizer: req.body.merchandizer,
                        customer: req.body.customer,
                        CustomerProductOrder: req.body.CustomerProductOrder,
                        category: req.body.category,
                        leadingPerson: req.body.leadingPerson,
                        productStyle: req.body.productStyle,
                        Emblishment: req.body.Emblishment,
                        garmentPicture: req.body.garmentPicture,
                        price: req.body.price,
                        quantity: req.body.quantity,
                        bulkTesting: req.body.bulkTesting,
                        ApprovalDate: req.body.ApprovalDate,
                        ApprovalStatus: req.body.ApprovalStatus,
                        cuttingStatus: req.body.cuttingStatus,
                        cuttingQuantity: req.body.cuttingQuantity,
                        cuttingLoad: req.body.cuttingLoad,
                        cuttingDate: req.body.cuttingDate,
                        stichQuantity: req.body.stichQuantity,
                        stichLoad: req.body.stichLoad,
                        StichStatus: req.body.StichStatus,
                        StichDate: req.body.StichDate,
                        printQuantity: req.body.printQuantity,
                        printLoad: req.body.printLoad,
                        printStatus: req.body.printStatus,
                        emblimentQuantity: req.body.emblimentQuantity,
                        emblimentLoad: req.body.emblimentLoad,
                        emblimentStatus: req.body.emblimentStatus,
                        emblimentDate: req.body.emblimentDate,
                        washingQuantity: req.body.washingQuantity,
                        washingLoad: req.body.washingLoad,
                        washingStatus: req.body.washingStatus,
                        washingDate: req.body.washingDate,
                        packingQuantity: req.body.packingQuantity,
                        packingLoad: req.body.packingLoad,
                        packingStatus: req.body.packingStatus,
                        packingDate: req.body.packingDate,
                        finishingQuantity: req.body.finishingQuantity,
                        finishingLoad: req.body.finishingLoad,
                        finishingStatus: req.body.finishingStatus,
                        finishingDate: req.body.finishingDate,
                        remainingQuantity: remaining,
                        user: req.user.businessemail,
                        orderStatus: 'On Hold',
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    });
                    if (activity) {

                        const user = await User.findOne({ businessemail: req.user.businessemail });

                        const capacity = user.capacity - thirty;

                        const updateUser = await User.findByIdAndUpdate(user._id, { capacity: capacity });
                        if (updateUser) {
                            try {
                                const transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'Muhammadkamranntu@gmail.com',
                                        pass: 'nkhvxfwddegdjhlm'
                                    }
                                });
                                const mailOptions = {
                                    from: 'Muhammadkamranntu@gmail.com',
                                    to: user.businessemail,
                                    subject: 'Order Placed in Queue ',
                                    text: 'Order Quantity is greater than Your Company Capacity',
                                    html: '<h1>System Alert!!!</h1>'
                                };
                                await transporter.sendMail(mailOptions, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {

                                        console.log('email sent');
                                        res.status(200).json({
                                            message: 'Email sent successfully'
                                        });
                                    }
                                }
                                );

                            } catch (err) {
                                res.status(500).json({
                                    message: 'Error sending email',
                                    error: err
                                });
                            }
                        }
                    }

                }
            }
        }
        else {
            if (thirty > req.body.quantity) {
                const remaining = thirty - req.body.quantity;
                const activity = await Activity.create({
                    merchandizer: req.body.merchandizer,
                    customer: req.body.customer,
                    CustomerProductOrder: req.body.CustomerProductOrder,
                    category: req.body.category,
                    leadingPerson: req.body.leadingPerson,
                    productStyle: req.body.productStyle,
                    Emblishment: req.body.Emblishment,
                    garmentPicture: req.body.garmentPicture,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    bulkTesting: req.body.bulkTesting,
                    ApprovalDate: req.body.ApprovalDate,
                    ApprovalStatus: req.body.ApprovalStatus,
                    cuttingStatus: req.body.cuttingStatus,
                    cuttingQuantity: req.body.cuttingQuantity,
                    cuttingLoad: req.body.cuttingLoad,
                    cuttingDate: req.body.cuttingDate,
                    stichQuantity: req.body.stichQuantity,
                    stichLoad: req.body.stichLoad,
                    StichStatus: req.body.StichStatus,
                    StichDate: req.body.StichDate,
                    printQuantity: req.body.printQuantity,
                    printLoad: req.body.printLoad,
                    printStatus: req.body.printStatus,
                    emblimentQuantity: req.body.emblimentQuantity,
                    emblimentLoad: req.body.emblimentLoad,
                    emblimentStatus: req.body.emblimentStatus,
                    emblimentDate: req.body.emblimentDate,
                    washingQuantity: req.body.washingQuantity,
                    washingLoad: req.body.washingLoad,
                    washingStatus: req.body.washingStatus,
                    washingDate: req.body.washingDate,
                    packingQuantity: req.body.packingQuantity,
                    packingLoad: req.body.packingLoad,
                    packingStatus: req.body.packingStatus,
                    packingDate: req.body.packingDate,
                    finishingQuantity: req.body.finishingQuantity,
                    finishingLoad: req.body.finishingLoad,
                    finishingStatus: req.body.finishingStatus,
                    finishingDate: req.body.finishingDate,
                    remainingQuantity: remaining,
                    user: req.user.businessemail,
                    orderStatus: 'On-going',
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                });
                if (activity) {
                    res.status(200).json(activity);
                }

            }
            else {
                const remaining = thirty - req.body.quantity;
                const activity = await Activity.create({
                    merchandizer: req.body.merchandizer,
                    customer: req.body.customer,
                    CustomerProductOrder: req.body.CustomerProductOrder,
                    category: req.body.category,
                    leadingPerson: req.body.leadingPerson,
                    productStyle: req.body.productStyle,
                    Emblishment: req.body.Emblishment,
                    garmentPicture: req.body.garmentPicture,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    bulkTesting: req.body.bulkTesting,
                    ApprovalDate: req.body.ApprovalDate,
                    ApprovalStatus: req.body.ApprovalStatus,
                    cuttingStatus: req.body.cuttingStatus,
                    cuttingQuantity: req.body.cuttingQuantity,
                    cuttingLoad: req.body.cuttingLoad,
                    cuttingDate: req.body.cuttingDate,
                    stichQuantity: req.body.stichQuantity,
                    stichLoad: req.body.stichLoad,
                    StichStatus: req.body.StichStatus,
                    StichDate: req.body.StichDate,
                    printQuantity: req.body.printQuantity,
                    printLoad: req.body.printLoad,
                    printStatus: req.body.printStatus,
                    emblimentQuantity: req.body.emblimentQuantity,
                    emblimentLoad: req.body.emblimentLoad,
                    emblimentStatus: req.body.emblimentStatus,
                    emblimentDate: req.body.emblimentDate,
                    washingQuantity: req.body.washingQuantity,
                    washingLoad: req.body.washingLoad,
                    washingStatus: req.body.washingStatus,
                    washingDate: req.body.washingDate,
                    packingQuantity: req.body.packingQuantity,
                    packingLoad: req.body.packingLoad,
                    packingStatus: req.body.packingStatus,
                    packingDate: req.body.packingDate,
                    finishingQuantity: req.body.finishingQuantity,
                    finishingLoad: req.body.finishingLoad,
                    finishingStatus: req.body.finishingStatus,
                    finishingDate: req.body.finishingDate,
                    remainingQuantity: remaining,
                    user: req.user.businessemail,
                    orderStatus: 'On-going',
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                });
                if (activity) {

                    const user = await User.findOne({ businessemail: req.user.businessemail });

                    const capacity = user.capacity - thirty;

                    const updateUser = await User.findByIdAndUpdate(user._id, { capacity: capacity });
                    if (updateUser) {
                        try {
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'Muhammadkamranntu@gmail.com',
                                    pass: 'nkhvxfwddegdjhlm'
                                }
                            });
                            const mailOptions = {
                                from: 'Muhammadkamranntu@gmail.com',
                                to: user.businessemail,
                                subject: 'Order Placed in Queue ',
                                text: 'Order Quantity is greater than Your Company Capacity',
                                html: '<h1>System Alert!!!</h1>'
                            };
                            await transporter.sendMail(mailOptions, (err, data) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {

                                    console.log('email sent');
                                    res.status(200).json({
                                        message: 'Email sent successfully'
                                    });
                                }
                            }
                            );

                        } catch (err) {
                            res.status(500).json({
                                message: 'Error sending email',
                                error: err
                            });
                        }
                    }
                }
            }
        }

    }

    catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

//show all activities
const ShowAllActivities = asyncHandler(async (req, res) => {
    try {

        const response = await Activity.find();
        if (response) {
            res.status(200).json(response);
        }
        else {
            res.status(400).json({ message: "No data Found" })
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
}
);

//show activity by id
const ShowActivityById = asyncHandler(async (req, res) => {
    try {

        const response = await Activity.findOne({ businessemail: req.user.businessemail });
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(err.message);
    }
}
);
//update activity by id
const UpdateActivityById = asyncHandler(async (req, res) => {
    try {

        console.log(req.body)
        const response = await Activity.findByIdAndUpdate(req.headers.id, req.body, { new: true });

        res.status(200).send({
            message: 'Activity updated successfully',
            data: response
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

);

//delete activity by id
const DeleteActivityById = asyncHandler(async (req, res) => {
    try {
        console.log(req.params.id);
        const response = await Activity.findByIdAndDelete(req.params.id);
        res.status(200).json(response);
        console.log('Activity Deleted Successfully');
    } catch (err) {
        res.status(500).json(err.message);
    }
}
);

module.exports = {
    AddActivity,
    ShowAllActivities,
    ShowActivityById,
    UpdateActivityById,
    DeleteActivityById
};