const nodemailer = require('nodemailer');
const sendEmail = async (req, res) => {
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
            to: 'Muhammadkami999@gmail.com',
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

module.exports = {
    sendEmail
}