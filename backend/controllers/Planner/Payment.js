const expressAsyncHandler = require("express-async-handler");
const Payment = require("../../models/Planner/Payment");
const User = require("../../models/userModel");
const stripe = require("stripe")('sk_test_51IooZnHWEZ1cnJFq20BzBR388XzFl9oKecMzbckq71EC4ZJl9MIfDCsMEIV8OPU0NT2z7jTkd4OPu8huDLpWAdQc00cr0kZe8Y')

const AddPayment = expressAsyncHandler(async (req, res) => {
    const { companyEmail, companyName, choosePlan, trialExpried, amount, Address, City, State, Zip, Country, id } = req.body;

    try {

        const money = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: companyEmail,
            payment_method: id,
            confirm: true
        });

        //find the payment with the same companyEmail
        const user = await User.findOne({ businessemail: req.user.businessemail });
        user.payment = amount;
        user.upgraded = true;
        user.TrialEnded = trialExpried;
        user.plan = choosePlan;
        await user.save();
        res.status(200).json({
            message: "Payment Successful",
        });

    } catch (error) {

        res.status(500).json({
            message: "Error adding payment",
            error: error
        });
    }
}
);

var today = new Date();
//check if the payment plan exists
const CheckPayment = expressAsyncHandler(async (req, res) => {
    console.log(req.headers.email);
    try {
        const payment = await Payment.findOne({ companyEmail: req.headers.email });
        console.log(payment)
        if (payment) {
            res.status(200).json({
                message: "Payment Plan Exists",
                payment
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error checking payment",
            error: error
        });
    }
}
);

//Export the function
module.exports = {
    AddPayment,
    CheckPayment
}